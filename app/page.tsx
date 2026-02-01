"use client";

import { useAuth } from "../lib/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading auth…</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Home (debug mode)</h1>

      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <p>You should NOT be redirected anywhere.</p>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </main>
  );
}
