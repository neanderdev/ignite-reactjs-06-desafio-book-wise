import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Avatar } from '@/components/Avatar';
import { Box } from '@/components/Box';
import { AvaliationStars } from '@/components/Generics/AvaliationStars';
import { SectionHeader } from '@/components/Generics/SectionHeader';

import { IBaseRating, IBaseUser } from '@/interface/IBooks';

import { useModal } from '@/hooks/useModal';

import { publishedDateFormat } from '@/utils/published-date-format';

import { Post } from '../Post';

import { Profile, PublishedAt, ReviewsWrapper, Title } from './styles';

interface Props {
    ratings: (IBaseRating & {
        user: IBaseUser;
    })[];
    isAvailableForRating: boolean;
    setIsAvailableForRating: (status: boolean) => void;
    uploadRating: (description: string, rate: number) => void;
}

export function Ratings({
    ratings,
    uploadRating,
    isAvailableForRating,
    setIsAvailableForRating,
}: Props) {
    const { data } = useSession();
    const { setSignInModal, setDetailsModal } = useModal();

    const userPost = ratings ? ratings.find(rating => rating.user_id === data?.id) : null;
    const otherPosts = ratings ? ratings.filter(rating => rating.user_id !== data?.id) : null;

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

    const router = useRouter();

    async function handleRedirect(userId: string) {
        setDetailsModal(false);
        router.push(`/profile/${userId}`);
    }

    console.log(data)

    return (
        <ReviewsWrapper>
            <SectionHeader>
                <strong>Avaliações</strong>
                <button onClick={handleReview}>Avaliar</button>
            </SectionHeader>

            {isAvailableForRating && (
                <Post
                    name={data?.name!}
                    uploadRating={uploadRating}
                    avatar_url={data?.avatar_url!}
                />
            )}

            {userPost && (
                <Box
                    key={userPost.rate}
                    direction="column"
                    onClick={() => handleRedirect(userPost.user_id)}
                >
                    <SectionHeader>
                        <Profile>
                            <Avatar
                                alt={userPost.user.name}
                                src={userPost.user.avatar_url}
                                width={40}
                                height={40}
                            />

                            <div>
                                <Title>{userPost.user.name}</Title>

                                <PublishedAt>{publishedDateFormat(userPost.created_at)}</PublishedAt>
                            </div>
                        </Profile>

                        <AvaliationStars bookRating={userPost.rate} />
                    </SectionHeader>

                    <p>{userPost.description}</p>
                </Box>
            )}

            {otherPosts && otherPosts.map(post =>
            (
                <Box
                    key={post.user.id}
                    direction="column"
                    onClick={() => handleRedirect(post.user_id)
                    }>
                    <SectionHeader>
                        <Profile>
                            <Avatar
                                alt={post.user.name}
                                src={post.user.avatar_url}
                                width={40}
                                height={40}
                            />

                            <div>
                                <Title>{post.user.name}</Title>

                                <PublishedAt>{publishedDateFormat(post.created_at)}</PublishedAt>
                            </div>
                        </Profile>

                        <AvaliationStars bookRating={post.rate} />
                    </SectionHeader>

                    <p>{post.description}</p>
                </Box>
            ))
            }
        </ReviewsWrapper>
    )
}