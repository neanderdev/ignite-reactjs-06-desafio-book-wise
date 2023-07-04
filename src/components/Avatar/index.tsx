import { Container, Image } from './styles'

import avatarImg from '../../assets/temp/avatar.png'

export function AvatarPicture() {
    return (
        <Container>
            <Image
                src={avatarImg}
                alt="Nome do usuário"
            />
        </Container>
    )
}