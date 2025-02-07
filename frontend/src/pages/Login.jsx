import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/auth/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await login(email, password);
  };

  return (
    <div className="max-w-[400px] w-full mx-auto p-5 mt-10 md:mt-24">
      <h1 className="text-2xl font-semibold mb-5">
        Log in to your Notionz account
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="block text-neutral-600 text-sm">Email</label>
        <input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          type="email"
          className="border border-neutral-200 rounded-md w-full block p-1 mb-3"
        />

        <label className="block text-neutral-600 text-sm">Password</label>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
          type="password"
          className="border border-neutral-200 rounded-md w-full block p-1 mb-3"
        />

        <button disabled={loading} className="bg-blue-500 hover:bg-blue-400 duration-200 w-full rounded-md p-2 text-white text-sm">
          {!loading && <span>Continue</span>}
          {loading && <span className="light-loader"></span>}
        </button>
      </form>
      <p className="opacity-70 text-sm mt-5">
        New to Notionz?{" "}
        <Link to={"/sign-up"} className="font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
