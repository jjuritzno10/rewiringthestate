"use client";

import { useMemo, useState } from "react";
import type { Role, TeamId, Category } from "@/lib/roles";
import { TEAMS } from "@/lib/roles";
import { DocumentHeader } from "@/components/DocumentHeader";

const CATEGORIES: Category[] = [
  "Engineering",
  "Product",
  "Platform",
  "Research",
  "Security",
  "Design",
];

const TEAM_IDS = Object.keys(TEAMS) as TeamId[];

export function JobsBoard({ roles }: { roles: Role[] }) {
  const [teams, setTeams] = useState<Set<TeamId>>(new Set());
  const [cats, setCats] = useState<Set<Category>>(new Set());
  const [query, setQuery] = useState("");
  const [openTeam, setOpenTeam] = useState(true);
  const [openCat, setOpenCat] = useState(true);

  const filtered = useMemo(
    () =>
      roles.filter((r) => {
        if (teams.size && !teams.has(r.teamId)) return false;
        if (cats.size && !cats.has(r.category)) return false;
        if (query) {
          const q = query.toLowerCase();
          if (
            !r.title.toLowerCase().includes(q) &&
            !r.team.toLowerCase().includes(q) &&
            !r.category.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [roles, teams, cats, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<TeamId, Role[]>();
    filtered.forEach((r) => {
      const arr = map.get(r.teamId) ?? [];
      arr.push(r);
      map.set(r.teamId, arr);
    });
    return TEAM_IDS.filter((id) => map.has(id)).map(
      (id) => [id, map.get(id)!] as const
    );
  }, [filtered]);

  const toggle =
    <T,>(set: Set<T>, setter: (s: Set<T>) => void) =>
    (v: T) => {
      const next = new Set(set);
      next.has(v) ? next.delete(v) : next.add(v);
      setter(next);
    };

  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      <DocumentHeader
        breadcrumb="Open roles"
        right={
          <span className="tag tag-sm text-faded hidden sm:flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-accent" />
            <span className="text-ink">{filtered.length}</span> roles
          </span>
        }
      />

      <section className="relative flex flex-1 min-h-0 lg:divide-x divide-line">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[260px] shrink-0 flex-col divide-y divide-line">
          <FilterSection
            label="Team"
            open={openTeam}
            onToggle={() => setOpenTeam(!openTeam)}
          >
            <CheckRow
              label="Any"
              checked={teams.size === 0}
              onChange={() => setTeams(new Set())}
            />
            {TEAM_IDS.map((id) => (
              <CheckRow
                key={id}
                label={TEAMS[id].name}
                checked={teams.has(id)}
                onChange={() => toggle(teams, setTeams)(id)}
              />
            ))}
          </FilterSection>

          <FilterSection
            label="Discipline"
            open={openCat}
            onToggle={() => setOpenCat(!openCat)}
          >
            <CheckRow
              label="Any"
              checked={cats.size === 0}
              onChange={() => setCats(new Set())}
            />
            {CATEGORIES.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={cats.has(c)}
                onChange={() => toggle(cats, setCats)(c)}
              />
            ))}
          </FilterSection>

          <div className="grow" />
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="relative h-12 shrink-0 border-b border-line">
            <div className="absolute inset-y-0 left-5 sm:left-6 flex items-center pointer-events-none text-faded">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a role"
              className="absolute inset-0 border-none bg-transparent pl-12 sm:pl-14 pr-6 text-sm focus:outline-none text-ink placeholder:text-faded"
            />
          </div>

          <div className="flex-1 overflow-y-auto minimal-scrollbar">
            {grouped.length === 0 ? (
              <div className="p-16 text-center text-faded text-base">
                No roles match these filters.
              </div>
            ) : (
              grouped.map(([teamId, items]) => (
                <div key={teamId}>
                  <div className="sticky top-0 z-10 bg-paper-2 border-b border-line px-5 sm:px-6 h-10 flex items-center">
                    <span className="tag text-ink">
                      {TEAMS[teamId].name}
                    </span>
                  </div>
                  <ul>
                    {items.map((r) => (
                      <li key={r.id} className="border-b border-line">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener"
                          className="group flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-paper-2/60 transition-colors"
                        >
                          <span className="flex-1 font-display font-medium text-[15px] sm:text-base text-ink group-hover:text-accent transition-colors tracking-tight truncate">
                            {r.title}
                          </span>
                          <span className="text-sm text-faded shrink-0">
                            {r.location}
                          </span>
                          <span className="text-accent shrink-0 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

function FilterSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 h-10 hover:text-accent transition-colors"
      >
        <span className="tag tag-sm text-ink">{label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform text-faded ${open ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && <div className="px-6 pb-5 space-y-2.5">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="rts-check"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`text-sm transition-colors ${
          checked ? "text-ink" : "text-faded group-hover:text-ink"
        }`}
      >
        {label}
      </span>
    </label>
  );
}
