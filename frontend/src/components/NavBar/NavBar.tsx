import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const links = [
  { to: "/roster", label: "Roster" }
];

export default function NavBar() {
  return (
    <nav className="top-nav" aria-label="Main">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
