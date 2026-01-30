import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlayerProfile({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/welcome");
  }

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
      <p>Position: {profile.position || "Not specified"}</p>
      <p>Club ID: {profile.club_id || "No club"}</p>
    </main>
  );
}
