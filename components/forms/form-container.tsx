import { Field } from "../ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface FormContainerProps {
    title: string;
    description: string;
    footer: string;
    children: React.ReactNode;
    onReset?: () => void;
}

export default function FormContainer({title, description, footer, children, onReset}: FormContainerProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={onReset}>
                        Reset Field
                    </Button>
                    <Button type="submit" form="register-form">
                        Submit
                    </Button>
                </Field>
                <p>{footer}</p>
            </CardFooter>
        </Card>
    )
}
