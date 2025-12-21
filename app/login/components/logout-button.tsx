"use client"

import { logoutAction } from "@/app/login/actions"
import { useActionState } from "react"

export function LogoutButton() {
  const [state, formAction, isPending] = useActionState(logoutAction, null)
  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 cursor-pointer text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition"
      >
        {isPending ? "Logging out..." : "Log Out"}
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  )
}
