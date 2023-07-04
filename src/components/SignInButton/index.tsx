import Image from "next/image";
import { ComponentProps } from "react";

import { Container } from "./styles";

type Props = ComponentProps<typeof Container> & {
    text: string
    imgsrc: string
}

export function SignInButton({ text, imgsrc, ...rest }: Props) {
    return (
        <Container type="button" {...rest}>
            <Image
                src={imgsrc}
                alt="google"
                width={32}
                height={32}
            />

            Entrar com {text}
        </Container>
    )
}