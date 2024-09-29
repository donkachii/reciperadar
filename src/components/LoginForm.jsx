import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block text-deep-blue font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-light-gray rounded focus:outline-none focus:border-orange"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-deep-blue font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-light-gray rounded focus:outline-none focus:border-orange"
          required
        />
      </div>
      {error && <p className="text-coral mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-orange text-white font-bold py-2 px-4 rounded hover:bg-orange-dark transition duration-300"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
