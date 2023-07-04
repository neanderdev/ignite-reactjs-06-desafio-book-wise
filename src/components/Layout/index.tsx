import { ReactNode } from "react";

import { Navbar } from "../Navbar";

import { LayoutContainer } from "./styles";

interface Props {
    children: ReactNode
}
export default function Layout({ children }: Props) {

    return (
        <LayoutContainer>
            <Navbar />

            <div>
                {children}
            </div>

        </LayoutContainer>
    )
}