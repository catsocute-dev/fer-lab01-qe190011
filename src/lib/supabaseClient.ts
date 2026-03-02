import { createClient } from "@supabase/supabase-js"
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "@/constants/supabase"
import { MESSAGE_SUPABASE_CONFIG_MISSING } from "@/constants/messages"

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail fast in development if Supabase env is not configured
  // eslint-disable-next-line no-console
  console.error(MESSAGE_SUPABASE_CONFIG_MISSING)
  throw new Error(MESSAGE_SUPABASE_CONFIG_MISSING)
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

