import Image from 'next/image';

import { Box } from "@/components/Box";
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { IBook } from '@/interface/IBooks';

import { Content, Header } from "./styles";

type Props = {
    book: (IBook & {
        rate: number;
    })
}

export function BookCardReduce({ book }: Props) {
    const book_image = book.cover_url.replace('public', '');

    return (
        <Box>
            <Image
                src={book_image}
                alt={book.name}
                width={64}
                height={94}
                loading="lazy"
            />

            <Content>
                <Header>
                    <h3>{book.name}</h3>

                    <span>{book.author}</span>
                </Header>

                <AvaliationStars bookRating={book.rate} />
            </Content>
        </Box>
    )
}