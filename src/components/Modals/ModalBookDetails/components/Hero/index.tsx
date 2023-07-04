import { BookmarksSimple, BookOpen } from '@phosphor-icons/react';
import Image from 'next/image';

import { Box } from '@/components/Box';
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { IBaseCategories, IBookWithAverage } from '@/interface/IBooks';

import { theme } from '@/styles/stitches.config';

import { Escritor, HeroDetails, HeroFooter, HeroHeader, InfoContainer, Ratio, Title } from './styles';

export type ICategoryWithoutIds = Omit<IBaseCategories, 'book_id' | 'categoryId'>;

interface Props {
    book: IBookWithAverage;
    categories: ICategoryWithoutIds[];
}

export function Hero({ book, categories }: Props) {
    const { colors } = theme;

    const book_image = book?.cover_url?.replace('public', '');

    return (
        <Box direction={"column"} padding="md">
            <HeroHeader>
                <Image
                    src={book_image}
                    alt={book.name}
                    width={171}
                    height={242}
                />

                <HeroDetails>
                    <div>
                        <Title>{book.name}</Title>

                        <Escritor>{book.author}</Escritor>
                    </div>

                    <Ratio>
                        <AvaliationStars bookRating={book.average} size={20} />

                        <span>3 Avaliações</span>
                    </Ratio>
                </HeroDetails>
            </HeroHeader>

            <HeroFooter>
                <InfoContainer>
                    <BookmarksSimple size={40} color={colors.green100.value} />

                    <div>
                        <strong>Categoria</strong>

                        <div>
                            {categories.map(({ category }) => (
                                <span key={category?.id}>{category?.name}</span>
                            ))}
                        </div>
                    </div>
                </InfoContainer>

                <InfoContainer>
                    <BookOpen size={40} color={colors.green100.value} />

                    <div>
                        <strong>Páginas</strong>

                        <p>{book.total_pages}</p>
                    </div>
                </InfoContainer>
            </HeroFooter>
        </Box>
    )
}