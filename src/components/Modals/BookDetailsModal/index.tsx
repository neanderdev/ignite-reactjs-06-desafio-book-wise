import { BookmarkSimple, BookOpen } from "@phosphor-icons/react";
import Image from "next/image";

import { Star } from "@/components/Start";

import { theme } from "@/styles/stitches.config";

import {
    BookContainer,
    BookContent,
    Details,
    Escritor,
    Footer,
    Header,
    InfoContainer,
    Rate,
    Title,
} from "./styles";

export function BookDetailsModal() {
    const { colors } = theme

    return (
        <BookContainer>
            <BookContent>
                <Header>
                    <Image
                        src={'/images/books/Book.png'}
                        alt="Book"
                        width={171}
                        height={242}
                    />

                    <Details>
                        <div>
                            <Title>14 Hábitos de Desenvolvedores Altamente Produtivos</Title>

                            <Escritor>Zeno Rocha</Escritor>
                        </div>

                        <div className="ratio-container">
                            <Rate>
                                {[...Array(5)].map((_, index) => {
                                    return (
                                        <Star
                                            key={index}
                                            color={index + 1 <= 4 && colors.purple100.value}
                                        />
                                    )
                                })}
                            </Rate>

                            <span>3 Avaliações</span>
                        </div>
                    </Details>
                </Header>

                <Footer>
                    <InfoContainer>
                        <BookmarkSimple size={40} color={colors.green100.value} />

                        <div>
                            <strong>Categoria</strong>

                            <p>Computação, educação</p>
                        </div>
                    </InfoContainer>

                    <InfoContainer>
                        <BookOpen size={40} color={colors.green100.value} />

                        <div>
                            <strong>Páginas</strong>

                            <p>160</p>
                        </div>
                    </InfoContainer>
                </Footer>
            </BookContent>
        </BookContainer>
    )
}