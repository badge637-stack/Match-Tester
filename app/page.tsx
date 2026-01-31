"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/welcome");
      return;
    }

    // TEMP: send logged-in users somewhere safe
    router.replace("/player/dashboard");
  }, [user, loading, router]);

  return <p>Loading...</p>;
}
