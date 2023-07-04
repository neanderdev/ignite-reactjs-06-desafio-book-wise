import { CaretRight } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BookCard } from "@/components/Book/BookCard";
import { Loading } from "@/components/Generics/Loading";

import { IBaseBook, IBaseRating, IBook } from "@/interface/IBooks";

import { api } from "@/services/http";

import { Header, ReadingContainer } from "./styles";

type Props = {
    title: string
    urlReference: string
}

interface IBookRead extends IBook {
    rate: number;
}

interface IRequest {
    book: IBaseBook;
    rating: IBaseRating;
}

export function LatestRead({ title, urlReference }: Props) {
    const session = useSession()

    const [latestReading, setLatestReading] = useState<IBookRead>({} as IBookRead);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session?.data?.user) {
            const getLatestRead = async () => {
                try {
                    setIsLoading(true);
                    const response = await api.get<IRequest>(`/ratings/user-latest`);

                    if (response.data) {
                        const filteredReading = {
                            ...response.data.book,
                            rate: response.data.rating.rate,
                        }

                        setLatestReading(filteredReading);
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false);
                }
            }
            getLatestRead()
        }
    }, [session?.data?.user]);


    if (!session?.data) return null;

    return (
        <ReadingContainer>
            <Header>
                <strong>{title}</strong>

                <Link href={urlReference}>
                    Ver todos
                    <CaretRight size={16} weight="fill" />
                </Link>
            </Header>

            {isLoading ? (<Loading />) : <BookCard book={latestReading} />}
        </ReadingContainer>
    )
}