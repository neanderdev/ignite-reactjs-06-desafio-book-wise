import { ReactNode } from "react";

import { ModalBookDetails } from "@/components/Modals/ModalBookDetails";
import { ModalSignIn } from "@/components/Modals/ModalSignIn";

import { Navbar } from "../components/Navbar";

import { Container, Content, Header } from "./styles";

interface Props {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export default function DefaultLayout({ title, icon, children }: Props) {
    return (
        <Container>
            <Navbar />

            <Content>
                <Header>
                    {icon}

                    <h1>{title}</h1>
                </Header>

                {children}
            </Content>

            <ModalSignIn />

            <ModalBookDetails />
        </Container>
    )
}