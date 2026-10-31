"""Flood-fill opaque black AABB letterboxing to transparent for MOHA campaign assets."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

BASE = Path(r"C:\Ajay\New_Work\Theories\public\images\case-studies\moha")
PREVIEW = Path(r"C:\Ajay\New_Work\Theories\scripts\_preview")


def is_near_black(r: int, g: int, b: int, a: int, thresh: int) -> bool:
    if a < 8:
        return True
    return r <= thresh and g <= thresh and b <= thresh


def flood_clear(px, w: int, h: int, thresh: int) -> list[list[bool]]:
    seeds = [
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, 0),
        (w // 2, h - 1),
        (0, h // 2),
        (w - 1, h // 2),
    ]
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()
    for x, y in seeds:
        r, g, b, a = px[x, y]
        if is_near_black(r, g, b, a, thresh):
            visited[y][x] = True
            q.append((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r, g, b, a = px[nx, ny]
                if is_near_black(r, g, b, a, thresh):
                    visited[ny][nx] = True
                    q.append((nx, ny))
    return visited


def clean_outer_grey_fringe(opx, w: int, h: int, lum_cut: float = 170.0) -> int:
    """Remove opaque soft-shadow / AA grey sitting on the outer silhouette."""
    removed = 0
    changed = True
    # Iterate a few passes so 1–2px fringe peels cleanly
    for _ in range(3):
        if not changed:
            break
        changed = False
        to_clear: list[tuple[int, int]] = []
        for y in range(h):
            for x in range(w):
                r, g, b, a = opx[x, y]
                if a < 8:
                    continue
                lum = (r + g + b) / 3.0
                if lum >= lum_cut:
                    continue
                # Must touch transparent (outer fringe only — won't eat screen blacks)
                adj_t = False
                for nx, ny in (
                    (x + 1, y),
                    (x - 1, y),
                    (x, y + 1),
                    (x, y - 1),
                ):
                    if not (0 <= nx < w and 0 <= ny < h) or opx[nx, ny][3] < 8:
                        adj_t = True
                        break
                if adj_t:
                    to_clear.append((x, y))
        for x, y in to_clear:
            opx[x, y] = (0, 0, 0, 0)
            removed += 1
            changed = True
    return removed


def soften_remaining_aa(opx, w: int, h: int, lum_cut: float = 120.0) -> int:
    """Make remaining dark AA next to transparent semi-to-fully transparent."""
    soft = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = opx[x, y]
            if a < 8:
                continue
            lum = (r + g + b) / 3.0
            if lum > lum_cut:
                continue
            adj = False
            for nx, ny in (
                (x + 1, y),
                (x - 1, y),
                (x, y + 1),
                (x, y - 1),
                (x + 1, y + 1),
                (x - 1, y - 1),
                (x + 1, y - 1),
                (x - 1, y + 1),
            ):
                if 0 <= nx < w and 0 <= ny < h and opx[nx, ny][3] < 8:
                    adj = True
                    break
            if not adj:
                continue
            # Map lum 0..lum_cut -> alpha 0..~180
            new_a = int(max(0, min(a, (lum / lum_cut) * 180)))
            if new_a < a:
                opx[x, y] = (r, g, b, new_a)
                soft += 1
    return soft


def crop_to_opaque(im: Image.Image, pad: int = 0) -> Image.Image:
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def process(
    src_name: str,
    dst_name: str,
    thresh: int,
    fringe_lum: float,
    soft_lum: float,
    do_crop: bool,
) -> None:
    src = BASE / src_name
    dst = BASE / dst_name
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    visited = flood_clear(px, w, h, thresh)

    out = im.copy()
    opx = out.load()
    cleared = 0
    for y in range(h):
        for x in range(w):
            if visited[y][x]:
                opx[x, y] = (0, 0, 0, 0)
                cleared += 1

    fringe = clean_outer_grey_fringe(opx, w, h, lum_cut=fringe_lum)
    soft = soften_remaining_aa(opx, w, h, lum_cut=soft_lum)

    if do_crop:
        out = crop_to_opaque(out, pad=1)

    out.save(dst, "PNG")
    print(
        f"{src_name} -> {dst_name}: flood={cleared} fringe={fringe} soft={soft} "
        f"final={out.size} corner={out.getpixel((0, 0))}"
    )

    # white preview
    PREVIEW.mkdir(exist_ok=True)
    bg = Image.new("RGBA", out.size, (255, 255, 255, 255))
    Image.alpha_composite(bg, out).convert("RGB").save(
        PREVIEW / dst_name.replace(".png", "-on-white.png")
    )


def main() -> None:
    # Teasers: hard 4px black + 1px grey soft-shadow fringe on bottom/corners
    for i in range(1, 5):
        process(
            f"social-campaign-teaser-{i}.png",
            f"social-campaign-teaser-{i}-clean.png",
            thresh=20,
            fringe_lum=175,
            soft_lum=100,
            do_crop=True,
        )

    # Phone: thick black AABB outside white frame; keep screen blacks (inside)
    process(
        "social-campaign-phone.png",
        "social-campaign-phone-clean.png",
        thresh=40,
        fringe_lum=100,
        soft_lum=90,
        do_crop=True,
    )

    # Verify no outer rim black remains
    for name in [
        "social-campaign-teaser-1-clean.png",
        "social-campaign-phone-clean.png",
    ]:
        im = Image.open(BASE / name).convert("RGBA")
        w, h = im.size
        px = im.load()
        rim = 0
        for y in range(h):
            for x in range(w):
                if x >= 3 and x < w - 3 and y >= 3 and y < h - 3:
                    continue
                r, g, b, a = px[x, y]
                if a > 180 and (r + g + b) / 3 < 40:
                    rim += 1
        print(f"verify {name}: size={w}x{h} opaque-near-black outer3px={rim}")


if __name__ == "__main__":
    main()
