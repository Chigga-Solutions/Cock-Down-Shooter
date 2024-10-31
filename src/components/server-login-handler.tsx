'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(e: FormData) {
  'use server';
  const supabase = createClient();

  const data = {
    email: e.get('email') as string,
    password: e.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  } else {
    revalidatePath('/', 'layout');
    redirect('/');
  }
}

export async function signup(e: FormData) {
  const supabase = createClient();

  const data = {
    email: e.get('email') as string,
    password: e.get('password') as string,
    options: {
      data: {
        username: e.get('username') as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  } else {
    revalidatePath('/', 'layout');
    redirect('/');
  }
}
