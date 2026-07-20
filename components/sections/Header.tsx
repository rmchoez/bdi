"use client";

import {
  Building2,
  ChevronDown,
  ChevronUp,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getMessages } from "../../lib/i18n/messages";
import { getPlansPath, plansSegment, type Locale } from "../../lib/i18n/config";
import { Logo } from "../ui/Logo";

type Dropdown = "language" | "portal" | "about" | "support" | null;

export function Header({ locale = "en", solid = false }: { locale?: Locale; solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown>(null);
  const pathname = usePathname();
  const router = useRouter();
  const messages = getMessages(locale);
  const toggle = (name: Exclude<Dropdown, null>) =>
    setOpenDropdown((current) => current === name ? null : name);
  const changeLocale = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    if (Object.values(plansSegment).includes(segments[2])) segments[2] = plansSegment[nextLocale];
    router.push(segments.join("/") || `/${nextLocale}`);
    setOpenDropdown(null);
  };

  return (
    <>
      <div className="utility">
        <div className="container utility-inner">
          <div className="emergency-info">
            <span className="venezuela-flag" aria-label="Bandera de Venezuela">
              <i /><i /><i /><b>•••••••</b>
            </span>
            <strong>¿Necesitas ayuda tras el reciente<br />terremoto en Venezuela?</strong>
            <a href="tel:+582127202102" className="utility-contact">
              <span><Phone size={20} /></span>
              <small>Llama al<strong>+58 212 720 2102</strong></small>
            </a>
            <a href="#contact" className="utility-contact">
              <span><Building2 size={20} /></span>
              <small>o visita nuestro<strong>Centro de Atención</strong></small>
            </a>
          </div>
          <div className="utility-selectors">
            <div className="dropdown">
              <button className="language-trigger" onClick={() => toggle("language")} aria-expanded={openDropdown === "language"}>
                {locale.toUpperCase()} {openDropdown === "language" ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </button>
              {openDropdown === "language" && (
                <div className="dropdown-menu language-menu">
                  {(["en", "es", "pt"] as Locale[]).filter((item) => item !== locale).map((item) => (
                    <button key={item} onClick={() => changeLocale(item)}>{item.toUpperCase()}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="dropdown">
              <button className="portal-trigger" onClick={() => toggle("portal")} aria-expanded={openDropdown === "portal"}>
                Portal login {openDropdown === "portal" ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </button>
              {openDropdown === "portal" && (
                <div className="dropdown-menu portal-menu">
                  <a href="#contact">Members</a><a href="#contact">Distributors</a><a href="#contact">Providers</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className={`header ${solid ? "header-solid" : ""}`}>
        <div className="container nav">
          <Logo />
          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
            <a className="active" href={`/${locale}`}>{messages.nav.home}</a>
            <a href={getPlansPath(locale)}>{messages.nav.plans}</a>
            <div className="dropdown nav-dropdown">
              <button onClick={() => toggle("about")}>{messages.nav.about} {openDropdown === "about" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
              {openDropdown === "about" && <div className="dropdown-menu nav-menu"><a href="#about">Who we are</a><a href="#about">Why Best Doctors</a><a href="#stories">Member stories</a></div>}
            </div>
            <a href={`/${locale}#stories`}>{messages.nav.stories}</a>
            <div className="dropdown nav-dropdown">
              <button onClick={() => toggle("support")}>{messages.nav.support} {openDropdown === "support" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
              {openDropdown === "support" && <div className="dropdown-menu nav-menu"><a href="#contact">Contact us</a><a href="#contact">FAQs</a><a href="#contact">Emergency help</a></div>}
            </div>
            <button className="nav-search" aria-label="Search"><Search size={21} /></button>
          </nav>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
    </>
  );
}
