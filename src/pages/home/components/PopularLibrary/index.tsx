import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

import { BookCardReduce } from "@/components/Book/BookCardReduce";

import { IBook } from "@/interface/IBooks";

import { Header, LibraryContainer } from "./styles";

type Props = {
    title: string
    urlReference?: string
    books: IBook[]
}

export function PopularLibrary({ title, urlReference, books }: Props) {
    return (
        <LibraryContainer>
            <Header>
                <strong>{title}</strong>

                {urlReference && <Link href={urlReference}>
                    Ver todos

                    <CaretRight size={16} weight="fill" />
                </Link>}
            </Header>

            {books && books.map(book => (
                <BookCardReduce
                    key={book.id}
                    book={book}
                />
            ))}
        </LibraryContainer>
    )
}