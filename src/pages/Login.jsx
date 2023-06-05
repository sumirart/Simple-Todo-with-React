import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Title from "../components/Title";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname ?? "/";

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("token", "randomtokenwords123131231293812093821");
    navigate(from, { replace: true });
  }

  // when logged in, redirect to home
  const token = localStorage.getItem("token");
  if (token) {
    // navigate("/", { replace: true });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <Title>Login</Title>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="submit"
          value="Login"
          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
    </>
  );
}
