import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/welcome");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, club_id")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/welcome");
  }

  if (profile.role === "player" && !profile.club_id) {
    redirect("/club/select");
  }

  if (profile.role === "player") {
    redirect("/player/dashboard");
  }

  // fallback
  return <p>Redirecting...</p>;
}
