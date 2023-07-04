import Image from 'next/image';

import { Box } from "@/components/Box";
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { IBook } from '@/interface/IBooks';

import { About, Author, Avaliation, Description, PublishedAt, Title } from './styles';

interface Props {
    book: (IBook & {
        rate: number;
    })
}

export function BookCard({ book }: Props) {
    const book_image = book?.cover_url?.replace('public', '');

    return (
        <Box>

            <Avaliation>
                <AvaliationStars bookRating={book.rate} />
            </Avaliation>

            <Image
                src={book_image}
                alt={book.name}
                width={108}
                height={152}
                loading="lazy"
            />

            <Description>
                <PublishedAt>Há {book.created_at} dias</PublishedAt>

                <Title>{book.name}</Title>

                <Author>{book.author}</Author>

                <About>{book.summary}</About>
            </Description>
        </Box>
    )
}