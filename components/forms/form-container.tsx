import { Field } from "../ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface FormContainerProps {
    type: "login" | "register";
    title: string;
    description: string;
    footer: string;
    children: React.ReactNode;
    onReset?: () => void;
}

export default function FormContainer({type, title, description, footer, children, onReset}: FormContainerProps) {

    let form = type === "login" ? "login-form" : "register-form"

    return (
        <Card className="w-[350px] md:w-[475px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Field className=" md:flex-row">
                    <Button type="button" variant="outline" className="flex-1" onClick={onReset}>
                        Reset Field
                    </Button>
                    <Button type="submit" form={form} className="flex-1">
                        {type === "login" ? "Login" : "Register"}
                    </Button>
                </Field>
            </CardFooter>
            <div className="flex items-center justify-center space-x-3">
                <small>{type === "login" ? "Don't have an account" : "Already have an account"}</small>
                <Link href={type === "login" ? "/auth/register" : "/auth/login"} className="text-blue-500">Go here</Link>
            </div>
        </Card>
    )
}
