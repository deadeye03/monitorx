import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookiesStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookiesStore).getAll()
        },
        async setAll(cookiesToSet) {
          try {
            const resolvedCookiesStore = await cookiesStore

            cookiesToSet.forEach(({ name, value, options }) =>
              resolvedCookiesStore.set(name, value, options),
            )
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
