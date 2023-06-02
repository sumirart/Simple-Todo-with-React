import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul className="mb-12 flex gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "text-gray-600" : "") + " hover:text-gray-400"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="login"
            className={({ isActive }) =>
              (isActive ? "text-gray-600" : "") + " hover:text-gray-400"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="register"
            className={({ isActive }) =>
              (isActive ? "text-gray-600" : "") + " hover:text-gray-400"
            }
          >
            Register
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
