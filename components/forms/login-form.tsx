"use client"

import z from "zod";
import { useForm } from "@tanstack/react-form";
import { login } from "@/app/actions/auth";
import FormContainer from "./form-container";
import { FieldGroup } from "../ui/field";
import { FormField } from "./form-field";

const LoginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

type FormValues = z.infer<typeof LoginSchema>

export default function LoginForm() {
    const form = useForm({
            defaultValues: {
                email: "",
                password: "",
            },
            validators: {
                onSubmit: LoginSchema
            },
            onSubmit: async ({value}: {value: FormValues}) => {
                console.log(value)
                const formData = new FormData()
                formData.append("email", value.email)
                formData.append("password", value.password)
                await login(formData)
            }
        })

    return (
        <FormContainer
            type="login"
            title="Login To Play"
            description="log in to pick it and stick it"
            footer="Dont forget to lick it before you stick it"
            onReset={() => form.reset()}
        >
            <form
                id="login-form"
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
                </FieldGroup>
            </form>
        </FormContainer>
    )
}