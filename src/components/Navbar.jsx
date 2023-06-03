import { Link, NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="mb-12">
        <nav className="flex items-center justify-between py-6">
          <div className="flex-1">
            <Link to="" className="font-semibold italic">
              Simple Todo
            </Link>
          </div>
          <ul className="flex gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive ? "text-gray-600 underline" : "") +
                  " hover:text-gray-400"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  (isActive ? "text-gray-600 underline" : "") +
                  " hover:text-gray-400"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="register"
                className={({ isActive }) =>
                  (isActive ? "text-gray-600 underline" : "") +
                  " hover:text-gray-400"
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
