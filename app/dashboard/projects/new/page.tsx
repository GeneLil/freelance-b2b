import NewProjectForm from "./new-project-form"
import { getAllActiveClients } from "@/app/dashboard/clients/queries"

export default async function NewProjectPage() {
  const clients = await getAllActiveClients()

  return (
    <div className="max-w-2xl mx-auto py-8">
      <NewProjectForm clients={clients} />
    </div>
  )
}
