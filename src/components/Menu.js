"use client";

import { useState } from "react";

const menuItems = [
  { label: "01-Problem-Validation-Report", href: "/01-problem-validation-report.html" },
  { label: "02-Market-Validation-Report", href: "/02-market-validation-report.html" },
  { label: "03-Investment-Thesis", href: "/03-investment-thesis-report.html" },
  { label: "04-PitchDeck", href: "/04-pitchdeck.html" },
  { label: "05-Executive-Summary", href: "/05-executive-summary.html" },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="menu-button-text">MENU</span>
        <svg className="menu-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1" />
          <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "menu-overlay--open" : ""}`}
        onClick={closeMenu}
      />

      {/* Slide-out Menu */}
      <nav className={`slide-menu ${isOpen ? "slide-menu--open" : ""}`}>
        <div className="slide-menu-header">
          <span className="slide-menu-title">NAVIGATION</span>
          <button className="slide-menu-close" onClick={closeMenu} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <ul className="slide-menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="slide-menu-item">
              <a
                href={item.href}
                className="slide-menu-link"
                onClick={closeMenu}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="slide-menu-link-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="slide-menu-link-label">{item.label.split("-").slice(1).join(" ")}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="slide-menu-footer">
          <span className="slide-menu-footer-text">MILSIM.AI</span>
        </div>
      </nav>
    </>
  );
}
