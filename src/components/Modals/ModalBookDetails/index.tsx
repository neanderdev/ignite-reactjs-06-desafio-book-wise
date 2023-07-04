import { X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

import { Loading } from "@/components/Generics/Loading";

import { useModal } from "@/hooks/useModal";

import { api } from "@/services/http";

import { IBaseBook, IBaseCategories, IBaseRating, IBaseUser } from "@/interface/IBooks";

import { Hero } from "./components/Hero";
import { Ratings } from "./components/Ratings";

import { Card, Close, ModalContainer } from "./styles";

interface IRequest {
    book: IBaseBook;
    categories: IBaseCategories[];
    ratings: (IBaseRating & {
        user: IBaseUser;
    })[];
}

export function ModalBookDetails() {
    const { selectedBook, detailsModal, setDetailsModal } = useModal();

    const [data, setData] = useState<IRequest>({} as IRequest)
    const [isLoading, setIsLoading] = useState(true);
    const [isAvailableForRating, setIsAvailableForRating] = useState(false);

    // functions
    async function submitRating(description: string, rate: number) {
        try {
            await api.post('ratings/create', {
                book_id: selectedBook.id,
                description: description,
                rate: rate
            });

            await getBookDetails();

            setIsAvailableForRating(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getBookDetails = useCallback(async () => {
        if (!selectedBook.id) return;

        try {
            setIsLoading(true);

            const response = await api.get<IRequest>(`/books/${selectedBook.id}`);

            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedBook.id]);

    async function handleCloseModal() {
        setDetailsModal(false);
        setIsAvailableForRating(false);
    }

    useEffect(() => {
        getBookDetails();
    }, [getBookDetails]);

    // Pages
    if (!detailsModal) return null;

    return (
        <ModalContainer>
            <Card>
                <Close onClick={handleCloseModal}>
                    <X size={24} />
                </Close>

                {isLoading ? <Loading /> : (
                    <>
                        <Hero
                            book={data.book}
                            categories={data.categories}
                            ratings={data.ratings}
                        />

                        <Ratings
                            ratings={data.ratings}
                            uploadRating={submitRating}
                            isAvailableForRating={isAvailableForRating}
                            setIsAvailableForRating={setIsAvailableForRating}
                        />
                    </>
                )}
            </Card>
        </ModalContainer>
    )
}
