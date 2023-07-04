import { ComponentProps } from 'react'

import { Container, Image } from './styles'

type Props = ComponentProps<typeof Image> & {}

export function Avatar({ ...rest }: Props) {
    return (
        <Container>
            <Image
                {...rest}
            />
        </Container>
    )
}