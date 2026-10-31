"""Flood-fill opaque black AABB letterboxing on Eswap social composites."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

BASE = Path(r"C:\Ajay\New_Work\Theories\public\images\case-studies\eswap\social")

TARGETS = [
    "fan-hero-composite.png",
    "posts-row-composite.png",
    "weekend-composite.png",
    "stranger-composite.png",
    "halloween-composite.png",
    "feed-phones-composite.png",
    "reels-row-composite.png",
]


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


def process(src_name: str, thresh: int = 12) -> None:
    src = BASE / src_name
    if not src.exists():
        print(f"MISSING {src_name}")
        return
    dst = BASE / src_name.replace(".png", "-clean.png")
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
    out.save(dst, "PNG")
    corners = [out.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    print(f"{src_name} -> {dst.name}: flood={cleared} corners={corners}")


def main() -> None:
    for name in TARGETS:
        process(name)


if __name__ == "__main__":
    main()
