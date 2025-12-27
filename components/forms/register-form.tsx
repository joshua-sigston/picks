"use client"

import { useForm } from "@tanstack/react-form";
import z from "zod";
import { FieldGroup } from "../ui/field";
import FormContainer from "./form-container";
import { FormField } from "./form-field";


interface RegisterformValues {
    email: string;
    teamName: string;
    password: string;
    confirmPassword: string;
}

const RegisterSchema = z.object({
    email: z.email(),
    teamName: z.string().min(3, "Team name must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormValues = z.infer<typeof RegisterSchema>

export default function RegisterForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            teamName: "",
            password: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: RegisterSchema
        },
        onSubmit: async ({value}: {value: FormValues}) => {
            console.log(value)
        }
    })

    return (
        <FormContainer
            title="Register To Play"
            description="Sign up to play"
            footer="Already have an account? Login"
            onReset={() => form.reset()}
        >
            <form
                id="register-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                <FieldGroup>
                    <FormField
                        form={form}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <FormField
                        form={form}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <FormField
                        form={form}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        type="password"
                    />
                    <FormField
                        form={form}
                        name="teamName"
                        label="Team Name"
                        placeholder="Enter your team name"
                    />
                </FieldGroup>
            </form>
        </FormContainer>
    )

}