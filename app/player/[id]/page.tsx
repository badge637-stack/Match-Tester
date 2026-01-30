import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlayerProfile({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  // 1️⃣ Must be logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/welcome");
  }

  // 2️⃣ Fetch player profile (PUBLIC FIELDS ONLY)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, display_name, position, club_id")
    .eq("id", params.id)
    .single();

  if (error || !profile) {
    return <p>Player not found</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{profile.display_name}</h1>

      <p>
        <strong>Position:</strong>{" "}
        {profile.position || "Not specified"}
      </p>

      <p>
        <strong>Club ID:</strong>{" "}
        {profile.club_id || "No club"}
      </p>
    </main>
  );
}
