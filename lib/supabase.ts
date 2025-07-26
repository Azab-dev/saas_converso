import { createClient } from "@supabase/supabase-js";  
import { auth } from "@clerk/nextjs/server";           

// Creates a Supabase client bound to the currently authenticated user
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,         // Supabase project URL
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,    // Public API (anon) key
        {
            async accessToken() {
                // Retrieves the user's auth token from Clerk
                return ((await auth()).getToken());
            }
        }
    )
}
