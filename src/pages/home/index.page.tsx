import { ChartLine } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Layout from "@/Layout";

import { api } from '@/services/http';

import { IBook, IBookRating } from '@/interface/IBooks';
import { IUser } from '@/interface/IUser';

import { theme } from '@/styles/stitches.config';

import { LatestLibrary } from './components/LatestLibrary';
import { PopularLibrary } from './components/PopularLibrary';
import { ReadingList } from './components/ReadingList';

import { books, recentReviews } from './utils/book';

import { Aside, Center, Container, Header } from './styles';

interface IBooksByRecentReview {
  rating: IBookRating;
  book: IBook;
  user: IUser;
}

interface IRequestBooksByRecentReview {
  reviews: (IBookRating & {
    book: IBook
    user: IUser;
  })[]
}

export default function Home() {
    const { colors } = theme;

  const { data } = useSession();

  const [booksByRecentReview, setBooksByRecentReview] = useState<IBooksByRecentReview[]>([])

  useEffect(() => {
    const getBooks = async () => {
      const response = await api.get<IRequestBooksByRecentReview>(`/books/by-rating`)

      const filteredBooks = response.data.reviews.map((review) => {
        return {
          rating: {
            id: review.id,
            book_id: review.book_id,
            description: review.description,
            rate: review.rate,
            created_at: review.created_at
          },
          book: review.book,
          user: review.user
        }
      })

      setBooksByRecentReview(filteredBooks);
    }

    getBooks()
  }, [])

    return (
        <>
            <Head>
                <title>Home | Book Wise</title>

                <meta name="description" content="Generated by create next app" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Header>
                    <ChartLine size={32} color={colors.green100.value} />

                    <h1>Início</h1>
                </Header>

                <Container>
                    <Center>
                        {data?.user && (
                            <ReadingList
                                title="Sua última leitura"
                                urlReference="/"
                                books={[books[0]]}
                            />
                        )}

                        <LatestLibrary
                            title="Avaliações mais recentes"
                            reviews={booksByRecentReview}
                        />
                    </Center>

                    <Aside>
                        {/* <PopularLibrary
                            title="Livros populares"
                            urlReference="/"
                            books={books}
                        /> */}
                    </Aside>
                </Container>
            </Layout>
        </>
    )
}