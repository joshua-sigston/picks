
import RegisterForm from "@/components/forms/register-form"


export const metadata = {
    title: "Sign Up",
    desription: "Create a new account"
}

export default async function SignUp({searchParams}: {searchParams: Promise<{error?: string, success?: string}>}) {
    const params = await searchParams
    const errorMessage = params?.error ? decodeURIComponent(params.error) : null
    const successMessage = params?.success ? decodeURIComponent(params.success) : null
    return (
        <main className="bg-blue-300 h-screen flex items-center justify-center">
            <RegisterForm />
        </main>
    )
}