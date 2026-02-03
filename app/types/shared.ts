import { Tables } from "@/app/types/supabase"

export type Currency = "USD" | "EUR"
export type Client = Tables<"clients">
export type Project = Tables<"projects">
