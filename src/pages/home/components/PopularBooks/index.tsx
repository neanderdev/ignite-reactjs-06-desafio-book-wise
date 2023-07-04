import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BookCardReduce } from "@/components/Book/BookCardReduce";

import { IBook, IBookRating } from "@/interface/IBooks";

import { api } from "@/services/http";

import { Header, LibraryContainer } from "./styles";

type Props = {
    title: string
    urlReference?: string
}

interface IRequest {
    popularBooks: (IBookRating & {
        book: IBook
    })[]
}

interface IBookProps extends IBook {
    rate: number;
}

export function PopularBooks({ title, urlReference }: Props) {
    const [books, setBooks] = useState<IBookProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPopularBooks = async () => {
            try {
                setIsLoading(true);
                const response = await api.get<IRequest>(`/books/popular`);

                const filteredBooks = response.data.popularBooks.map((popularBook) => {
                    return {
                        ...popularBook.book,
                        rate: popularBook.rate
                    }
                });

                setBooks(filteredBooks);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        getPopularBooks()
    }, [])

    return (
        <LibraryContainer>
            <Header>
                <strong>{title}</strong>

                {urlReference && (
                    <Link href={urlReference}>
                        Ver todos

                        <CaretRight size={16} weight="fill" />
                    </Link>
                )}
            </Header>

            {!isLoading &&
                books.map(book => {
                    return (
                        <BookCardReduce
                            key={book.id}
                            book={book}
                        />
                    )
                })}
        </LibraryContainer>
    )
}