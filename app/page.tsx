"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/welcome");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role, club_id")
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        router.replace("/welcome");
        return;
      }

      if (profile.role === "player" && !profile.club_id) {
        router.replace("/club/select");
        return;
      }

      if (profile.role === "player") {
        router.replace("/player/dashboard");
        return;
      }
    };

    run();
  }, [router]);

  return <p>Loading...</p>;
}
