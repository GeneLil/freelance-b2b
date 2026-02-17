import { Tables } from "@/app/types/supabase"

export type Currency = "USD" | "EUR"
export type Client = Tables<"clients">
export type Project = Tables<"projects">
export type Invoice = Tables<"invoices">
export type ClientEvent = Tables<"client_history">

type Financials = {
  totalBilled: number
  paid: number
  outstanding: number
}

export type ClientFullProfile = {
  client: Client
  projects: Project[]
  invoices: Invoice[]
  history: ClientEvent[]
  financials: Financials
}

export type ClientStatus = "active" | "archived"
