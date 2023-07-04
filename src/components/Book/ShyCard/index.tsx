import Image from 'next/image';

import { theme } from "@/styles/stitches.config";

import { Container, Content, ContentHeader } from './styles';

import bookCoverImg from '../../../assets/images/books/Book.png';

export function ShyCard() {
    const { colors } = theme;

    return (
        <Container>
            <Content>
                <Image
                    src={bookCoverImg}
                    alt=""
                    width={64}
                    height={94}
                />

                <div>
                    <ContentHeader>
                        <h3>A revolução dos bichos</h3>

                        <span>George Orwell</span>
                    </ContentHeader>
                </div>
            </Content>

        </Container>
    )
}