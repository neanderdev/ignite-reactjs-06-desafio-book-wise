import { Binoculars, ChartLineUp, SignIn as SignInIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { theme } from '@/styles/stitches.config';

import { Container, Link as LinkCSS, SignIn } from "./styles";

import logoSvg from '../../aseets/logo.svg';

export function Navbar() {
    const router = useRouter()
    const { colors } = theme

    return (
        <Container>
            <Link href="/home" className="logo">
                <Image
                    src={logoSvg}
                    alt=""
                    width={128}
                />
            </Link>

            <LinkCSS
                href="/home"
                active={router.pathname.includes('/home')}
            >
                <ChartLineUp size={24} />

                Início
            </LinkCSS>

            <LinkCSS
                href="/explore"
                active={router.pathname.includes('/explore')}
            >
                <Binoculars size={24} />

                Explorar
            </LinkCSS>

            <SignIn>
                Fazer Login

                <SignInIcon size={20} color={colors.green100.value} />
            </SignIn>
        </Container>
    )
}