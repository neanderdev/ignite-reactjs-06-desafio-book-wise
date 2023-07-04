import { BookCardWithPost } from "@/components/Book/BookCardWithPost";

import { IBook, IBookRating } from "@/interface/IBooks";
import { IUser } from "@/interface/IUser";

import { Header, LatestContainer } from "./styles";

interface Props {
    title: string;
    reviews: {
        rating: IBookRating;
        book: IBook;
        user: IUser;
    }[]
}

export function LatestLibrary({ title, reviews }: Props) {
    return (
        <LatestContainer>
            <Header>
                <strong>{title}</strong>
            </Header>

            {reviews && reviews.map(post => (
                <BookCardWithPost
                    key={post.rating.id}
                    book={post.book}
                    user={post.user}
                    rating={post.rating}
                />
            ))}
        </LatestContainer>
    )
}