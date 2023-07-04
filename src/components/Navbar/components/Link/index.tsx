import { useRouter } from "next/router";
import { ReactNode } from "react";

import { LinkContainer } from "./styles";

type Props = {
    href: string
    text: string
    icon: ReactNode
}

export function Link({ text, href, icon }: Props) {
    const { pathname } = useRouter();

    const isActive = href.includes('/profile') 
    ? pathname.includes('/profile') 
    : pathname === href;

    return (
        <LinkContainer
            href={href}
            active={isActive}
        >
            {icon}
            {text}
        </LinkContainer>
    )
}