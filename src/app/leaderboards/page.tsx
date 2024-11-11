import { createClient } from '@/lib/supabase/server';
import { LbClient } from './lb-client';

export default async function LeaderboardPage() {
  const supabase = createClient();

  const entries = await supabase
    .from('leadeboard')
    .select(
      `*
    , profiles (
      id,
      username
    )
    `,
    )
    .order('score', { ascending: false });

  if (entries.data) {
    return (
      <LbClient
        entries={entries.data.map((entry) => {
          return { name: entry.profiles.username, score: entry.score };
        })}
      />
    );
  } else {
    console.error(entries.error);
  }

  return <LbClient />;
}
