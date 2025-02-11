import { createClient } from "@supabase/supabase-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
