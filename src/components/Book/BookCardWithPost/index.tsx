import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '@/components/Avatar';
import { Box } from '@/components/Box';
import { Star } from '@/components/Start';

import { theme } from "@/styles/stitches.config";

import { IBook, IBookRating } from '@/interface/IBooks';
import { IUser } from '@/interface/IUser';

import { publishedDateFormat } from '@/utils/published-date-format';

import { About, Author, Content, Description, Header, Profile, PublishedAt, Rate, Title } from './styles';

interface Props {
  book: IBook;
  user: IUser;
  rating: IBookRating;
}

export function BookCardWithPost({ book, rating, user }: Props) {
  const { colors } = theme;

  const formated_date = publishedDateFormat(rating.created_at);

  return (
    <Box direction="column" padding={'md'}>
      <Header>
        <Profile>
          <Avatar
            src={user.avatar_url}
            alt={user.name}
            width={40}
            height={40}
          />

          <div>
            <Link href={`/profile/${user.id}`}>
              <Title>{user.name}</Title>
            </Link>

            <PublishedAt>{formated_date}</PublishedAt>
          </div>
        </Profile>
      </Header>

      <Content>
        <Image
          src={book.cover_url.replace('public', '')}
          alt={book.author}
          width={108}
          height={152}
          loading="lazy"
        />

        <Description>
          <Title>{book.name}</Title>

          <Author>{book.author}</Author>

          <About>{book.summary}</About>
        </Description>
      </Content>

      <Rate>
        {[...Array(5)].map((_, index) => {
          return (
            <Star
              key={index}
              color={index + 1 <= rating.rate && colors.purple100.value}
            />
          )
        })}
      </Rate>
    </Box>
  )
}