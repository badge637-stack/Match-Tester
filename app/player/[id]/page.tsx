import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function PlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, display_name, position")
    .eq("id", params.id)
    .single();

  if (error || !profile) {
    return <p>Player not found</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{profile.display_name}</h1>
      <p>Position: {profile.position}</p>
      <p>Player ID: {profile.id}</p>
    </main>
  );
}
