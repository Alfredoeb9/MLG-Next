import React from "react";
import {Card, CardBody} from "@nextui-org/react";

interface ErrorComponentProps {
    message?: string
}

export default function ErrorComponent({ message }: ErrorComponentProps) {
    return (
        <Card className="absolute bottom-0 right-0 text-red-600 max-w-xs">
            <CardBody>
                <p>{ message.length > 0 ? message : 'There has been an error with service please, refresh'}</p>
            </CardBody>
        </Card>
    )
}