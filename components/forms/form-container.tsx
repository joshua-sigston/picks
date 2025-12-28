import { Field } from "../ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface FormContainerProps {
    title: string;
    description: string;
    footer: string;
    children: React.ReactNode;
    onReset?: () => void;
}

export default function FormContainer({title, description, footer, children, onReset}: FormContainerProps) {
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
                    <Button type="submit" form="register-form" className="flex-1">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
            <div className="flex items-center justify-center space-x-3">
                <small>Already have an account?</small>
                <Link href="/auth/sign-in" className="text-blue-500">Go here</Link>
            </div>
        </Card>
    )
}
