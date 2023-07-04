import { Star } from '@phosphor-icons/react';
import Image from 'next/image';

import { theme } from "@/styles/stitches.config";

import { AvatarPicture } from '../Avatar';

import { Container, Content, ContentHeader, Header } from './styles';

import bookCoverImg from '../../assets/images/books/Book.png';

export function Card() {
    const { colors } = theme;

    return (
        <Container>
            <Header>
                <div className="author">
                    <AvatarPicture />

                    <div>
                        <h3>Jaxson Dias</h3>

                        <span>Hoje</span>
                    </div>
                </div>

                <div className="assessments">
                    <Star size={14} weight="fill" color={colors.purple100.value} />

                    <Star size={14} weight="fill" color={colors.purple100.value} />

                    <Star size={14} weight="fill" color={colors.purple100.value} />

                    <Star size={14} weight="fill" color={colors.purple100.value} />

                    <Star size={14} color={colors.purple100.value} />
                </div>
            </Header>

            <Content>
                <Image
                    src={bookCoverImg}
                    alt=""
                    width={108}
                    height={152}
                />

                <div>
                    <ContentHeader>
                        <h3>Jaxson Dias</h3>

                        <span>Hoje</span>
                    </ContentHeader>

                    <div className="description">
                        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget
                    </div>
                </div>
            </Content>

        </Container>
    )
}