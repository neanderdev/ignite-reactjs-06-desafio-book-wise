import NextImage from "next/image";

import { Box } from "@/components/Box";
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { IBaseBook, IBaseRating } from "@/interface/IBooks";

import { publishedDateFormat } from '@/utils/published-date-format';

import {Content,Header,Rate,Rating,Row,Title}from './styles';

interface Props {
  rating: IBaseRating;
  book: IBaseBook;
}

export function RatingCard({ book, rating }: Props) {
    const book_image = book.cover_url.replace('public', '');

  const published_at = publishedDateFormat(rating.created_at);

  return (
    <>
      <Title>{published_at}</Title>

      <Box direction="column">
        <Row>
          <NextImage
            src={book_image}
            alt={book.name}
            width={98}
            height={138}
          />

          <Content>
            <Header>
              <h3>{book.name}</h3>

              <span>{book.author}</span>
            </Header>

            <AvaliationStars bookRating={rating.rate} />
          </Content>
        </Row>
        
        <Rating>{rating.description}</Rating>
      </Box>
    </>
  )
}