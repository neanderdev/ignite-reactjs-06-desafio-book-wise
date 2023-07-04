import Image from 'next/image';

import { Box } from "@/components/Box";
import { AvaliationStars } from '@/components/Generics/AvaliationStars';

import { useModal } from '@/hooks/useModal';

import { IBookWithAverage } from '@/interface/IBooks';

import {Content,Header,Rate} from "./styles";

interface Props {
  book: IBookWithAverage
}

export function ExplorerBookCard({book}: Props) {
  const { setSelectedBook, setDetailsModal } = useModal();

  const book_image = book.cover_url.replace('public', '');

  async function handleShowDetails() {
    setDetailsModal(true);
    setSelectedBook(book);
  }

  return (
    <Box onClick={handleShowDetails}>
      <Image
        src={book_image}
        alt={book.name}
        width={64}
        height={94}
        loading="lazy"
      />

      <Content>
        <Header>
          <h3>{book.name}</h3>
          
          <span>{book.author}</span>
        </Header>

        <AvaliationStars bookRating={book.average} />
      </Content>
    </Box>
  )
}