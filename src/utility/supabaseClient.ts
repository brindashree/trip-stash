import { createClient } from "@refinedev/supabase";

<<<<<<< HEAD
//read from .env file
const SUPABASE_URL = "https://xpxjwfqmxvqiyijdtkkt.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweGp3ZnFteHZxaXlpamR0a2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NjAzMjksImV4cCI6MjAwMzUzNjMyOX0.7JpI6AnXnPCR5NZyEKcfAILXkWDcUKkNfcZfza-hQH8"

=======
const SUPABASE_URL = "https://xpxjwfqmxvqiyijdtkkt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweGp3ZnFteHZxaXlpamR0a2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NjAzMjksImV4cCI6MjAwMzUzNjMyOX0.7JpI6AnXnPCR5NZyEKcfAILXkWDcUKkNfcZfza-hQH8";
>>>>>>> a5043ef (feat(story): added create form ui)

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
