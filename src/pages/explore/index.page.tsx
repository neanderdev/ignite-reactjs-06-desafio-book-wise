import { Binoculars } from '@phosphor-icons/react';
import Head from 'next/head';
import { useState } from 'react';

import { BookCardReduce } from '@/components/Book/BookCardReduce';
import Layout from "@/components/Layout";
import { SearchInput } from '@/components/SearchInput';

import { theme } from '@/styles/stitches.config';

import { bookFilters } from './utils/books-filters';

import { recentReviews } from '../home/utils/book';

import { ExplorerBooks, Filter, FiltersContainer, Header, Search } from './styles';


export default function Explore() {
    const [filterSelected, setFilterSelected] = useState('Tudo')

    const { colors } = theme

    return (
        <>
            <Head>
                <title>Explorar | Book Wise</title>

                <meta name="description" content="Generated by create next app" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                {/* Header */}
                <Header>
                    <Binoculars size={32} color={colors.green100.value} />

                    <h1>Explorar</h1>
                </Header>

                <Search >
                    <SearchInput placeholder='Buscar livro ou autor' />
                </Search>

                {/* Filters */}
                <FiltersContainer>
                    {bookFilters.map(filter => (
                        <Filter
                            key={filter}
                            isSelected={filterSelected === filter}
                            onClick={() => setFilterSelected(filter)}
                        >
                            {filter}
                        </Filter>
                    ))}
                </FiltersContainer>

                {/* Cards */}
                <ExplorerBooks>
                    {recentReviews.map(pub => (
                        <BookCardReduce key={pub.id} book={pub.book} />
                    ))}
                </ExplorerBooks>
            </Layout>

        </>
    )
}