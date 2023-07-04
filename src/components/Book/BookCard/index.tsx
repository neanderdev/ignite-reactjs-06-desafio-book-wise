import Image from 'next/image';

import { Box } from "@/components/Box";
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { IBaseBook } from '@/interface/IBooks';

import { publishedDateFormat } from '@/utils/published-date-format';

import { About, Author, Avaliation, Description, PublishedAt, Title } from './styles';

interface Props {
    book: (IBaseBook & {
        rate: number;
    })
}

export function BookCard({ book }: Props) {
    const book_image = book?.cover_url?.replace('public', '');
    const formated_date = publishedDateFormat(book.created_at);

    console.log(book)

    if (!book.id) return null;

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
                <PublishedAt>{formated_date}</PublishedAt>

                <Title>{book.name}</Title>

                <Author>{book.author}</Author>

                <About>{book.summary}</About>
            </Description>
        </Box>
    )
}