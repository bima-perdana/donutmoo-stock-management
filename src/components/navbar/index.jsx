import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow">
      <ul className="flex gap-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
            }
          >
            Daftar Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/opname"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-gray-300"
            }
          >
            Stock Opname
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
