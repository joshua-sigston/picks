"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function register(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email")
    const password = formData.get("password")
    const team_name = formData.get("team_name")

    if (!email || !password || !team_name || team_name === "null") {
        redirect(`/auth/register?error=${encodeURIComponent("Email, password, and Team Name are required")}`)
    }

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            data: {
                team_name: team_name as string,
            },
        },
    })

    if (error) {
        redirect(`/auth/register?error=${encodeURIComponent(error.message)}`)
    }

    redirect(`/auth/register?success=${encodeURIComponent("Check your email for the confirmation link.")}`)
}

export async function login(formData: FormData) {
    console.log(formData)
    const supabase = await createClient()

    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        redirect(`/auth/login?error=${encodeURIComponent("Email and password are required")}`)
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
    })

    if (error) {
        redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)
    }

    redirect("/picks/dashboard")
}
    