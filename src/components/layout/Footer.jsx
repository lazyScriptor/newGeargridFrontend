import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { URLS } from "../../lib/urls";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Modules", href: "/#modules" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Security", href: "/#security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Request a demo", to: "/contact?type=demo" },
      { label: "Partners", to: "/contact?type=partnership" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "Tenant sign in", href: URLS.login, external: true },
      { label: "Super admin", href: URLS.superAdminLogin, external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-slate-900">
              <Logo size={32} />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              GearGrid is the operating system for modern equipment rental
              businesses — inventory, contracts, maintenance, and accounting in
              one secure, multi-tenant platform.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
              All systems operational
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          rel={l.external ? "noopener noreferrer" : undefined}
                          className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} GearGrid. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="/contact" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/contact" className="hover:text-slate-900">
              Terms
            </a>
            <span className="opacity-60">Built in 🇱🇰 Sri Lanka</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
