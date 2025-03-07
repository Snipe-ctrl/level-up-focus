"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
