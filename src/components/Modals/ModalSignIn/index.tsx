import { X } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";

import { SignInButton } from "@/components/SignInButton";

import { useModal } from "@/hooks/useModal";

import { theme } from "@/styles/stitches.config";

import { providerSchema } from "./utils/providers-schema";

import { Close, Modal, ModalContainer } from "./styles";

export function ModalSignIn() {
    const { signInModal, setSignInModal } = useModal();

    const { colors } = theme;

    async function handleSignIn(provider: string) {
        try {
            await signIn(provider);

            setSignInModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (!signInModal) return null;

    return (
        <ModalContainer>
            <Modal>
                <Close onClick={() => setSignInModal(false)}>
                    <X size={24} color={colors.gray400.value} />
                </Close>

                <strong>Faça login para deixar sua avaliação</strong>

                {providerSchema.map(provider => (
                    <SignInButton
                        key={provider.id}
                        text={provider.text}
                        imgsrc={provider.icone}
                        onClick={() => handleSignIn(provider.name)}
                    />
                ))}
            </Modal>
        </ModalContainer>
    )
}