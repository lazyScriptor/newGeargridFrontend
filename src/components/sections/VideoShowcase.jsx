import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { ease, fadeUp, stagger } from "../../lib/motion";

// ── YouTube product demo (Sinhala walkthrough) ──────────────────────────
// Lite-embed pattern: render a static thumbnail until the user clicks Play,
// then swap to the real iframe. Keeps the LCP fast (the YT player bundle is
// ~500 KB), avoids loading youtube.com cookies for visitors who never play,
// and lets us tune the poster framing. ?start=56 skips the intro reel.
const DEMO_VIDEO = {
  id: "SvrlC_b1XMg",
  startSeconds: 56,
  posterMax: "https://i.ytimg.com/vi/SvrlC_b1XMg/maxresdefault.jpg",
  posterHq: "https://i.ytimg.com/vi/SvrlC_b1XMg/hqdefault.jpg",
};

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="demo-video"
      className="relative overflow-hidden py-20 sm:py-28 scroll-mt-24"
    >
      {/* Ambient backdrop — keeps the section visually anchored to the brand */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-50/40 to-transparent" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.16), rgba(255,255,255,0) 60%)",
          }}
        />
      </div>

      <Container className="relative">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* eyebrow pill */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-900 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Live product demo
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l6-4.5-6-4.5v9z" />
              </svg>
              සිංහල · Sinhala narration
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ~3 min walkthrough
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
          >
            See GearGrid in motion.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            A short Sinhala walkthrough covering equipment, customers, invoices,
            and the live dashboard — the same workflows your team will use on
            day one.
          </motion.p>
        </motion.div>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          {/* Aura behind the frame */}
          <div className="absolute -inset-x-8 -inset-y-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-amber-200/40 via-orange-200/30 to-rose-200/40 blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.45)]">
            {/* Faux browser chrome — keeps the "this is a real product" feel */}
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/95 px-4 py-2.5 backdrop-blur">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="ml-3 max-w-xs truncate rounded-md bg-slate-800 px-3 py-0.5 font-mono text-[10px] tracking-wide text-slate-400">
                geargrid.live / product-demo · si
              </div>
              <div className="ml-auto hidden font-mono text-[10px] text-slate-500 sm:block">
                HD · 1080p
              </div>
            </div>

            {/* 16:9 player */}
            <div className="relative aspect-video w-full bg-black">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 h-full w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
                  aria-label="Play GearGrid Sinhala product demo"
                >
                  <img
                    src={DEMO_VIDEO.posterMax}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEMO_VIDEO.posterHq;
                    }}
                    alt="GearGrid product demo — Sinhala walkthrough preview"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Vignette overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/65" />

                  {/* Apple-style glassy play disc */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 scale-150 rounded-full bg-amber-400/30 blur-2xl transition-transform duration-500 group-hover:scale-[1.8]" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur transition-transform duration-200 group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24">
                        <svg
                          className="ml-1 h-8 w-8 text-slate-900 md:h-10 md:w-10"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom overlay caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left md:p-7">
                    <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-amber-400">
                      Watch the demo
                    </div>
                    <div className="max-w-2xl text-lg font-semibold leading-tight text-white drop-shadow-lg md:text-2xl">
                      GearGrid — සම්පූර්ණ කුලී කළමනාකරණ පද්ධතිය
                    </div>
                    <div className="mt-1 max-w-2xl text-xs text-slate-300 md:text-sm">
                      A 3-minute Sinhala walkthrough of the equipment,
                      customers, invoicing, and dashboard workflows.
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO.id}?start=${DEMO_VIDEO.startSeconds}&autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="GearGrid Sinhala Product Demo"
                  loading="lazy"
                  allow="accelerated-2d-canvas; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-slate-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
              </svg>
              Hosted on YouTube
            </span>
            <span aria-hidden="true">·</span>
            <span>Captions · CC</span>
            <span aria-hidden="true">·</span>
            <span>No sign-up required to watch</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
