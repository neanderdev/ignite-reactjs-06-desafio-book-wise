import { X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

import { Hero, ICategoryWithoutIds } from "./components/Hero";
import { Ratings } from "./components/Ratings";

import { useModal } from "@/hooks/useModal";

import { api } from "@/services/http";

import { IBaseRating, IBaseUser, IRatingWithUser } from "@/interface/IBooks";


import { Card, Close, ModalContainer } from "./styles";

interface IRequest {
    ratings: (IBaseRating & {
        user: IBaseUser
    })[];
}

export function ModalBookDetails() {
    const { selectedBook, detailsModal, setDetailsModal } = useModal();

    const [categories, setCategories] = useState<ICategoryWithoutIds[]>([]);
    const [ratings, setRatings] = useState<IRatingWithUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAvailableForRating, setIsAvailableForRating] = useState(false);

    const getBookDetails = useCallback(async () => {
        if (!selectedBook.id) return;

        try {
            setIsLoading(true);

            const resCategories = await api.get(`/categories/${selectedBook.id}`);
            const resRatings = await api.get<IRequest>(`/ratings/${selectedBook.id}`);

            const userRatings = resRatings.data.ratings.map((userRating) => {
                return {
                    rating: {
                        id: userRating.id,
                        rate: userRating.rate,
                        book_id: userRating.book_id,
                        user_id: userRating.user_id,
                        created_at: userRating.created_at,
                        description: userRating.description,
                    },
                    user: {
                        id: userRating.user.id,
                        name: userRating.user.name,
                        email: userRating.user.email,
                        avatar_url: userRating.user.avatar_url,
                        created_at: userRating.user.created_at,
                    }
                }
            })

            setRatings(userRatings);
            setCategories(resCategories.data.categories);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedBook.id,]);

    async function submitRating(description: string) {
        if (description.length <= 8) return;

        try {
            await api.post('ratings/create', {
                book_id: selectedBook.id,
                description: description
            });

            await getBookDetails();
            setIsAvailableForRating(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookDetails();
    }, [getBookDetails]);

    // Pages
    if (!detailsModal) return null;

    return (
        <ModalContainer>
            <Card>
                <Close onClick={() => setDetailsModal(false)}><X size={24} /></Close>

                <>
                    <Hero book={selectedBook} categories={categories} />

                    <Ratings
                        ratings={ratings}
                        uploadRating={submitRating}
                        isAvailableForRating={isAvailableForRating}
                        setIsAvailableForRating={setIsAvailableForRating}
                    />
                </>
            </Card>
        </ModalContainer>
    )
}
