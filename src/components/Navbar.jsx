import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  // const token = localStorage.getItem("token");
  // function handleLogout() {
  //   localStorage.removeItem("token");
  // }

  const { token, logout } = useAuth();

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
                to="todos"
                className={({ isActive }) =>
                  (isActive ? "text-gray-600 underline" : "") +
                  " hover:text-gray-400"
                }
              >
                Todo List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  (isActive ? "text-gray-600 underline" : "") +
                  " hover:text-gray-400"
                }
              >
                Profile
              </NavLink>
            </li>
            {!token && (
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
            )}
            {token && (
              <li>
                <NavLink
                  onClick={logout}
                  className={({ isActive }) =>
                    (isActive ? "text-gray-600 underline" : "") +
                    " hover:text-gray-400"
                  }
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
