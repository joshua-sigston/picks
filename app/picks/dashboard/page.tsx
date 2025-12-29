import { createClient } from "@/lib/supabase/server"


export default async function Dashboard() {
    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    console.log(user)
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}