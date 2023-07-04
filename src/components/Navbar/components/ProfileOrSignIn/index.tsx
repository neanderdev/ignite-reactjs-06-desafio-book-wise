import { SignIn, SignOut } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";

import { Avatar } from "@/components/Avatar";

import { theme } from "@/styles/stitches.config";

import { Login, Logout, ProfileContainer } from "./styles";

type Props = {
    setIsActive: (status: boolean) => void
}

export function ProfileOrSignIn({ setIsActive }: Props) {
    const { colors } = theme;

    const { data } = useSession();

    if (!data?.user) return (
        <Login onClick={() => setIsActive(true)}>
            Fazer Login

            <SignIn size={20} color={colors.green100.value} />
        </Login>
    )

    return (
        <ProfileContainer>
            <Avatar
                src={data?.user?.image ?? '/images/avatar/avatar.png'}
                alt={data.user?.name!}
                width={32}
                height={32}
            />

            <strong>{data.user?.name}</strong>

            <Logout onClick={() => signOut()}>
                <SignOut size={20} color={colors.danger.value} />
            </Logout>
        </ProfileContainer>
    )
}