import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@supabase/supabase-js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const cleanScript = (script: string) => {
  const cleanedScript = script
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[^\w\s.,!?'"\-:()]/g, "") // Remove unwanted symbols except common punctuation
  return cleanedScript
}
