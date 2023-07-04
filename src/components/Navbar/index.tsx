import { Binoculars, ChartLineUp, User } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

import { Link } from "./components/Link";
import { ProfileOrSignIn } from "./components/ProfileOrSignIn";

import { ModalSignIn } from "../ModalSignIn";

import { Container, Navigation } from "./styles";

import logoSvg from '../../assets/logo.svg';


const publicLinks = [
    {
        id: 1,
        text: 'Início',
        href: "/home",
        icon: <ChartLineUp size={24} />
    },
    {
        id: 2,
        text: 'Explorar',
        href: "/explore",
        icon: <Binoculars size={24} />
    }
]

const protectedLinks = [
    {
        id: 1,
        text: 'Perfil',
        href: "/profile",
        icon: <User size={24} />
    },
]

export function Navbar() {
    const [isActiveModal, setIsModalActive] = useState(false);

    const session = useSession();

    return (
        <Container>
            {/* Logo */}
            <NextLink href="/home" className="logo">
                <Image
                    src={logoSvg}
                    alt="Book Wise"
                    width={128}
                />
            </NextLink>

            <Navigation>
                {publicLinks.map(link => (
                    <Link
                        key={link.id}
                        text={link.text}
                        href={link.href}
                        icon={link.icon}
                    />
                ))}

                {session?.data?.user
                    && protectedLinks.map(link => (
                        <Link
                            key={link.id}
                            text={link.text}
                            href={link.href}
                            icon={link.icon}
                        />
                    ))}
            </Navigation>

            <ProfileOrSignIn
                setIsActive={setIsModalActive}
            />

            <ModalSignIn
                isActive={isActiveModal}
                setIsActive={setIsModalActive}
            />
        </Container>
    )
}