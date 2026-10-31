"use client";

import { useState, useCallback, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FadeUp } from "@/components/motion/FadeUp";

interface MathCaptcha {
  num1: number;
  num2: number;
  answer: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

const OPEN_POSITIONS = [
  "Junior Graphic Designer",
] as const;

const EXPERIENCE_OPTIONS = [
  "Fresher / 0–1 Years",
  "1–2 Years",
  "2–4 Years",
  "4+ Years",
] as const;

export function CareersGeneralApplication() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState<string>("Junior Graphic Designer");
  const [experience, setExperience] = useState<string>("1–2 Years");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState("");
  const [goodDesignAnswer, setGoodDesignAnswer] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Anti-Spam Math CAPTCHA
  const [captcha, setCaptcha] = useState<MathCaptcha | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isRotating, setIsRotating] = useState(false);

  const generateCaptcha = useCallback(() => {
    setCaptcha((prev) => {
      let next: MathCaptcha;
      do {
        // Simple single-digit addition problems (e.g., 2+7, 9+4, 5+3)
        const n1 = Math.floor(Math.random() * 9) + 2; // 2 to 10
        const n2 = Math.floor(Math.random() * 8) + 1; // 1 to 8
        next = { num1: n1, num2: n2, answer: n1 + n2 };
      } while (prev && next.num1 === prev.num1 && next.num2 === prev.num2);
      return next;
    });
    setCaptchaAnswer("");
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleRefreshCaptcha = () => {
    setIsRotating(true);
    generateCaptcha();
    if (
      errorMessage &&
      (errorMessage.toLowerCase().includes("math") ||
        errorMessage.toLowerCase().includes("security") ||
        errorMessage.toLowerCase().includes("verification"))
    ) {
      setErrorMessage("");
    }
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleCaptchaChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "").slice(0, 3);
    setCaptchaAnswer(digitsOnly);
    if (
      errorMessage &&
      (errorMessage.toLowerCase().includes("math") ||
        errorMessage.toLowerCase().includes("security") ||
        errorMessage.toLowerCase().includes("verification"))
    ) {
      setErrorMessage("");
    }
  };

  const handlePhoneChange = (val: string) => {
    // Only allow numeric digits, max 10
    const digitsOnly = val.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
    if (errorMessage && digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
      setErrorMessage("");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(
          "File exceeds 10MB limit. Please upload a smaller PDF/DOC file."
        );
        e.target.value = "";
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    const cleanEmail = email.trim();
    if (!cleanEmail || !EMAIL_PATTERN.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorMessage("Please enter your 10-digit mobile number.");
      return;
    }
    if (!PHONE_PATTERN.test(cleanPhone)) {
      setErrorMessage("Phone number must be a 10-digit number starting with 6, 7, 8, or 9.");
      return;
    }
    if (!portfolio.trim()) {
      setErrorMessage("Please share a link to your portfolio, Behance, LinkedIn, or Drive.");
      return;
    }
    if (!resumeFile) {
      setErrorMessage("Please upload your resume (PDF/DOC, Max 10MB).");
      return;
    }
    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage("Attached resume exceeds the 10MB upload limit.");
      return;
    }

    // Verify Anti-Spam Math Question
    if (!captcha) {
      setErrorMessage("Security check is initializing. Please try again.");
      generateCaptcha();
      return;
    }
    if (!captchaAnswer.trim()) {
      setErrorMessage("Please answer the security math problem to verify you're human.");
      return;
    }
    const cleanCaptcha = parseInt(captchaAnswer.trim(), 10);
    if (isNaN(cleanCaptcha) || cleanCaptcha !== captcha.answer) {
      setErrorMessage(
        "Incorrect math answer. A new question has been generated, please try again."
      );
      generateCaptcha();
      return;
    }

    setErrorMessage("");
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", cleanEmail);
      formData.append("phone", cleanPhone);
      formData.append("position", position);
      formData.append("experience", experience);
      formData.append("portfolio", portfolio.trim());
      if (goodDesignAnswer.trim()) {
        formData.append("good_design", goodDesignAnswer.trim());
      }
      formData.append("resume", resumeFile);

      const res = await fetch("/api/careers.php", {
        method: "POST",
        body: formData,
      });

      let responseData: { success?: boolean; message?: string } | null = null;
      try {
        responseData = await res.json();
      } catch {
        // If testing on localhost dev server where PHP is not executed
        if (
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
        ) {
          responseData = { success: true, message: "Local testing" };
        }
      }

      if (!res.ok && !responseData?.success) {
        throw new Error(
          responseData?.message ||
            "Failed to submit application. Please check your connection and try again."
        );
      }

      setStatus("success");
      // Redirect to the thank-you page
      router.push("/thank-you");
      if (typeof window !== "undefined") {
        window.location.href = "/thank-you";
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="general-application"
      aria-label="Application Form"
      className="relative scroll-mt-28 border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(3.5rem,7vw,8rem)]">
        <div className="grid gap-[clamp(2.5rem,4.5vw,5.5rem)] lg:grid-cols-12 lg:items-start">
          {/* Left Column: Positive, Assertive & Welcoming Copy */}
          <div className="lg:col-span-5">
            <FadeUp>
              <h2 className="text-h2 leading-[1.1] text-white max-md:!text-[30px] md:max-lg:!text-[2.5rem]">
                Bring your ideas.
                <br />
                <span className="text-[#feba07]">Let&apos;s build what&apos;s next together.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={100} className="mt-6 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.95rem,1.15vw,1.3rem)] leading-relaxed text-white/85">
                At Theories, we celebrate high ownership, curious minds, and fresh perspectives.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[clamp(0.9rem,1.05vw,1.15rem)] leading-relaxed text-white/65">
                Whether you&apos;re a designer, strategist, writer, or technologist, we give you the runway to experiment, build, and create work you&apos;re genuinely proud of.
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <FadeUp
              delay={150}
              className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.05] to-transparent p-[clamp(1.5rem,3vw,3rem)] backdrop-blur-md"
            >
              {status === "success" ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
                    🎉
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.2vw,2.5rem)] text-white">
                    Application Received!
                  </h3>
                  <p className="font-[family-name:var(--font-body)] max-w-md mx-auto text-white/70">
                    Thank you for applying for the <span className="text-white font-semibold">{position}</span> role. Our team will review your portfolio and reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setName("");
                      setEmail("");
                      setPhone("");
                      setPortfolio("");
                      setResumeFile(null);
                      setGoodDesignAnswer("");
                      generateCaptcha();
                      setCaptchaAnswer("");
                    }}
                    className="mt-4 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs text-white hover:bg-white/10"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Open Position Dropdown */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        placeholder="10-digit number (starts with 6, 7, 8, 9)"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Open Position *
                      </label>
                      <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-[#fe4a01] focus:outline-none"
                      >
                        {OPEN_POSITIONS.map((pos) => (
                          <option key={pos} value={pos} className="bg-black text-white">
                            {pos}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Experience Dropdown & Portfolio Link */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Experience *
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-[#fe4a01] focus:outline-none"
                      >
                        {EXPERIENCE_OPTIONS.map((exp) => (
                          <option key={exp} value={exp} className="bg-black text-white">
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-label mb-1.5 block text-xs text-white/70">
                        Portfolio / Behance / LinkedIn / Drive Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://behance.net/yourprofile or Google Drive"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: Upload Resume */}
                  <div>
                    <label className="text-label mb-1.5 block text-xs text-white/70">
                      Upload Resume * (PDF/DOC, Max 10MB)
                    </label>
                    <label className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/25 bg-white/5 px-4 py-3.5 text-sm text-white/70 transition hover:border-[#fe4a01] hover:text-white">
                      <span>{resumeFile ? `✓ ${resumeFile.name}` : "Click to upload Resume (PDF / DOC, Max 10MB)"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Row 5: What makes a good design actually GOOD? (Optional) */}
                  <div>
                    <label className="text-label mb-1.5 block text-xs text-white/70">
                      What makes a good design actually GOOD? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us in 1–2 lines..."
                      value={goodDesignAnswer}
                      onChange={(e) => setGoodDesignAnswer(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                    />
                  </div>

                  {/* Anti-Spam Math CAPTCHA Section */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.03] p-4 sm:p-5">
                    <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                      <label
                        htmlFor="math-captcha-input"
                        className="text-label flex items-center gap-2 text-xs font-semibold text-white/85"
                      >
                        <svg
                          className="size-4 text-[#feba07]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Security Verification *
                      </label>

                      <button
                        type="button"
                        onClick={handleRefreshCaptcha}
                        title="Get a new math question"
                        aria-label="Change math question"
                        className="group inline-flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-[#feba07]"
                      >
                        <svg
                          className={`size-3.5 transition-transform duration-500 ${isRotating ? "rotate-180" : "group-hover:rotate-90"}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>Change question</span>
                      </button>
                    </div>

                    <p className="font-[family-name:var(--font-body)] mb-3 text-xs text-white/60">
                      Solve this simple addition problem to verify you&apos;re human:
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Math Challenge Expression */}
                      <div
                        aria-label={captcha ? `Math question: ${captcha.num1} plus ${captcha.num2} equals` : "Loading math question"}
                        className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/70 px-4 py-2.5 font-mono text-base font-bold tracking-wider text-[#feba07] select-none shadow-inner"
                      >
                        {captcha ? (
                          <>
                            <span className="text-white">{captcha.num1}</span>
                            <span className="text-[#fe4a01] font-black">+</span>
                            <span className="text-white">{captcha.num2}</span>
                            <span className="text-white/60">=</span>
                            <span className="text-white/30">?</span>
                          </>
                        ) : (
                          <span className="text-xs text-white/40">Loading problem...</span>
                        )}
                      </div>

                      {/* Captcha Answer Input */}
                      <div className="relative flex-1 min-w-[120px] max-w-[180px]">
                        <input
                          id="math-captcha-input"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          placeholder="Your answer"
                          value={captchaAnswer}
                          onChange={(e) => handleCaptchaChange(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-center sm:text-left text-sm font-semibold text-white placeholder:text-white/30 focus:border-[#fe4a01] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-[#ff6b4a]">{errorMessage}</p>
                  )}

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-brand-gradient text-cta group inline-flex h-[clamp(44px,3.07vw,59px)] w-full items-center justify-center gap-3 rounded-[clamp(28px,3.125vw,60px)] px-6 font-bold tracking-wider uppercase text-white shadow-[0_10px_30px_rgba(254,74,1,0.25)] transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
                  >
                    <span>{status === "sending" ? "SUBMITTING APPLICATION..." : "SUBMIT APPLICATION"}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
