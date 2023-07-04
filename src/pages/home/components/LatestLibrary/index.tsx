import { BookCardWithPost } from "@/components/Book/BookCardWithPost";

import { IPostPreview } from "@/interface/IPost";

import { Header, LatestContainer } from "./styles";

type Props = {
    title: string
    publication: IPostPreview[]
}

export function LatestLibrary({ title, publication }: Props) {
    return (
        <LatestContainer>
            <Header>
                <strong>{title}</strong>
            </Header>

            {publication && publication.map(post => (
                <BookCardWithPost
                    key={post.id}
                    publication={post}
                />
            ))}
        </LatestContainer>
    )
}