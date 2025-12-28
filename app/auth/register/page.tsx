
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
        <main className="bg-blue-300 h-screen flex flex-col items-center justify-center">
            {successMessage && (
                <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {errorMessage}
                </div>
            )}
            <RegisterForm />
        </main>
    )
}