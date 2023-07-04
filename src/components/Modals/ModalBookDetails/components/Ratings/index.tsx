import { useSession } from 'next-auth/react';

import { Avatar } from '@/components/Avatar';
import { Box } from '@/components/Box';
import { AvaliationStars } from '@/components/Generics/AvaliationStars';
import { SectionHeader } from '@/components/Generics/SectionHeader';

import { IRatingWithUser } from '@/interface/IBooks';

import { useModal } from '@/hooks/useModal';

import { Post } from '../Post';

import { Profile, PublishedAt, ReviewsWrapper, Title } from './styles';

interface Props {
    ratings: IRatingWithUser[];
    uploadRating: (description: string) => void;
    isAvailableForRating: boolean;
    setIsAvailableForRating: (status: boolean) => void;
}

export function Ratings({ ratings, isAvailableForRating, setIsAvailableForRating, uploadRating }: Props) {
    const { data } = useSession();

    const { setSignInModal } = useModal();

    const userPost = ratings ? ratings.find(rating => rating.user.email === data?.user?.email) : null;
    const otherPosts = ratings ? ratings.filter(rating => rating.user.email !== data?.user?.email) : null;

    async function handleReview() {
        if (!data?.user) {
            setSignInModal(true);
            return;
        }

        if (data?.user && userPost) {
            console.log('Você já fez uma crítica para esse livro');
            setIsAvailableForRating(false);
            return;
        }

        setIsAvailableForRating(true);
    }

    return (
        <ReviewsWrapper>
            <SectionHeader>
                <strong>Avaliações</strong>
                <button onClick={handleReview}>Avaliar</button>
            </SectionHeader>

            {isAvailableForRating && (
                <Post
                    avatar_url={data?.avatar_url!}
                    name={data?.name!}
                    uploadRating={uploadRating}
                />
            )}

            {userPost && (
                <Box key={userPost.rating.id} direction="column">
                    <SectionHeader>
                        <Profile>
                            <Avatar
                                src={userPost.user.avatar_url}
                                alt={userPost.user.name}
                                width={40}
                                height={40}
                            />

                            <div>
                                <Title>{userPost.user.name}</Title>

                                <PublishedAt>{userPost.rating.created_at}</PublishedAt>
                            </div>
                        </Profile>

                        <AvaliationStars bookRating={userPost.rating.rate} />
                    </SectionHeader>

                    <p>{userPost.rating.description}</p>
                </Box>
            )}

            {otherPosts
                && otherPosts.map(post =>
                (
                    <Box key={post.rating.id} direction="column">
                        <SectionHeader>
                            <Profile>
                                <Avatar
                                    src={post.user.avatar_url}
                                    alt={post.user.name}
                                    width={40}
                                    height={40}
                                />

                                <div>
                                    <Title>{post.user.name}</Title>

                                    <PublishedAt>{post.rating.created_at}</PublishedAt>
                                </div>
                            </Profile>

                            <AvaliationStars bookRating={post.rating.rate} />
                        </SectionHeader>

                        <p>{post.rating.description}</p>
                    </Box>
                ))
            }

        </ReviewsWrapper>
    )
}