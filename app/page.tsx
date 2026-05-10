import Link from "next/link";
import Image from "next/image";
import { ROLES, TEAMS } from "@/lib/roles";
import { MetalButton } from "@/components/MetalButton";

export default function Home() {
  const featured = ROLES.slice(0, 6);

  return (
    <div className="relative">
      <Hero />
      <main>
        <About />
        <Roles featured={featured} />
        <Teams />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="force-dark relative h-[100svh] min-h-[640px] flex flex-col bg-paper text-ink overflow-hidden">
      {/* Full-bleed background image */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dim only where the title sits — let the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      </div>

      {/* Accent vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 100% 100%, hsl(var(--accent) / 0.12), transparent 70%)",
        }}
      />

      {/* Masthead — crest + wordmark, with hairline rule below */}
      <div className="relative z-10 border-b border-line">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 flex items-center h-14">
          <Link
            href="/"
            aria-label="Rewire the State — home"
            className="flex items-center gap-3 min-w-0 group"
          >
            <Image
              src="/crest.svg"
              alt=""
              width={22}
              height={22}
              priority
              className="h-[22px] w-auto crest shrink-0"
            />
            <span className="font-display font-semibold uppercase text-[13px] tracking-[0.14em] leading-none text-ink group-hover:text-accent transition-colors">
              Rewire the State
            </span>
          </Link>
        </div>
      </div>

      {/* Title block — sits low, like a film title card */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 pb-12 sm:pb-16">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-9">
              <h1 className="font-display font-semibold uppercase text-ink leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,5.5vw,4.25rem)] max-w-4xl">
                <span
                  className="settle"
                  style={{ animationDelay: "0.1s" }}
                >
                  Ship code that{" "}
                </span>
                <span
                  className="text-accent settle"
                  style={{ animationDelay: "0.3s" }}
                >
                  runs the country.
                </span>
              </h1>
              <div
                className="mt-6 sm:mt-8 h-px bg-ink/30 typebar w-32 sm:w-48"
                style={{ animationDelay: "0.55s" }}
              />
              <p
                className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-snug settle"
                style={{ animationDelay: "0.7s" }}
              >
                <span className="text-ink">
                  The hardest problems in government need engineers.
                </span>{" "}
                <span className="text-faded">Read once, then read in.</span>
              </p>
              <div
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 settle"
                style={{ animationDelay: "0.9s" }}
              >
                <MetalButton href="/jobs">See open roles</MetalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="tag tag-sm text-faded">02 · About</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-display text-2xl sm:text-[1.875rem] font-medium leading-tight tracking-tight text-ink max-w-3xl">
              Government still runs on software written by people who would
              never be hired by it.{" "}
              <span className="text-accent">We're changing that.</span>
            </p>
            <p className="text-base sm:text-lg text-faded mt-8 leading-relaxed max-w-2xl">
              The teams in this index exist to prove that public-sector
              engineering can be as sharp as any frontier lab — same instincts,
              longer time horizon, users in the tens of millions. Each team
              runs its own bar but the posture is shared: bias to ship,
              allergy to theatre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roles({ featured }: { featured: typeof ROLES }) {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-8 mb-12 sm:mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="tag tag-sm text-faded">03 · Open roles</span>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-baseline justify-between gap-4">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-ink">
              Selected positions.
            </h2>
            <Link
              href="/jobs"
              className="tag tag-sm text-ink hover:text-accent transition-colors"
            >
              All {ROLES.length} →
            </Link>
          </div>
        </div>

        <ul className="border-t border-line">
          {featured.map((r) => (
            <li key={r.id} className="border-b border-line group">
              <a
                href={r.url}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 py-5 sm:py-6 hover:bg-paper-2/60 transition-colors px-2"
              >
                <span className="flex-1 font-display font-medium text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors tracking-tight truncate">
                  {r.title}
                </span>
                <span className="tag tag-sm text-faded shrink-0 hidden sm:inline">
                  {r.team}
                </span>
                <span className="text-sm text-faded shrink-0">
                  {r.location.split(",")[0]}
                </span>
                <span className="text-accent shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Teams() {
  const teams = Object.entries(TEAMS);
  return (
    <section id="teams" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-8 mb-12 sm:mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="tag tag-sm text-faded">04 · Teams</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-ink">
              Where you might land.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-line">
          {teams.map(([id, t], i) => (
            <div
              key={id}
              className={`p-8 sm:p-10 border-b border-line ${
                i % 2 !== 0 ? "sm:border-l sm:border-l-line" : ""
              } ${
                i % 3 !== 0 ? "lg:border-l lg:border-l-line" : ""
              } ${
                i % 2 !== 0 && i % 3 === 0 ? "sm:border-l-0 lg:border-l-0" : ""
              }`}
            >
              <h3 className="font-display font-medium text-2xl text-ink tracking-tight">
                {t.name}
              </h3>
              <p className="text-faded mt-4 leading-relaxed">{t.blurb}</p>
              {t.site !== "#" && (
                <a
                  href={t.site}
                  target="_blank"
                  rel="noopener"
                  className="tag tag-sm text-ink hover:text-accent inline-block mt-6 draw-rule"
                >
                  {t.site.replace(/^https?:\/\//, "")} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Apply", d: "Send a CV, a GitHub, or something you shipped." },
    { n: "02", t: "Conversation", d: "A short call with the team that owns the work." },
    { n: "03", t: "Build", d: "Take-home or paired session. Real problems, not puzzles." },
    { n: "04", t: "Decide", d: "Final round, offer. Clearance runs in parallel." },
  ];

  return (
    <section id="process" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-8 mb-12 sm:mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="tag tag-sm text-faded">05 · Process</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-ink">
              How hiring works.
            </h2>
            <p className="text-faded mt-4 max-w-xl leading-relaxed">
              Each team runs its own funnel. The shape is shared.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`p-8 sm:p-10 border-b border-line lg:border-b-0 ${
                i > 0 ? "lg:border-l lg:border-l-line" : ""
              }`}
            >
              <span className="tag tag-sm text-accent">{s.n}</span>
              <h3 className="font-display font-medium text-2xl text-ink tracking-tight mt-4">
                {s.t}
              </h3>
              <p className="text-faded mt-3 leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="tag tag-sm text-faded">06 · Contact</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-display font-semibold text-3xl sm:text-4xl leading-tight tracking-tight text-ink max-w-2xl">
              Know a builder?{" "}
              <span className="text-accent">Send their work, not their CV.</span>
            </p>
            <a
              href="mailto:hello@rewirethestate.gov.uk"
              className="font-display font-medium text-xl sm:text-2xl mt-8 inline-block text-accent draw-rule"
            >
              hello@rewirethestate.gov.uk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
        <span className="tag tag-sm text-faded">rewirethestate · unofficial</span>
        <span className="tag tag-sm text-faded">
          Curated by builders inside UK Gov
        </span>
      </div>
    </footer>
  );
}
