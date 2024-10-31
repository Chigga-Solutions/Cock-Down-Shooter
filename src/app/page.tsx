import { createClient } from '@/lib/supabase/server';
import Home from '@/app/homePage';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Home user={user} />;
}
