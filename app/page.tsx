const { data } = await supabase
  .from('profiles')
  .select('id, club_id')
  .eq('id', user.id)
  .single()

if (!data) {
  router.replace('/profile/create')
  return
}

if (!data.club_id) {
  router.replace('/club/select')
  return
}
