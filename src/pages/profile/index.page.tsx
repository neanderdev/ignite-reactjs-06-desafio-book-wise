import { User } from '@phosphor-icons/react';
import Head from 'next/head';
import { useState } from 'react';

import { BookCardReduce } from '@/components/Book/BookCardReduce';
import Layout from "@/components/Layout";
import { SearchInput } from '@/components/SearchInput';

import { theme } from '@/styles/stitches.config';

import { User as UserComponent } from './components/User';

import { recentReviews } from '../home/utils/book';

import { Aside, Container, Content, ExplorerBooks, Header, Search } from './styles';


export default function Profile() {
    const [filterSelected, setFilterSelected] = useState('Tudo')

    const { colors } = theme

    return (
        <>
            <Head>
                <title>Profile | Book Wise</title>

                <meta name="description" content="Generated by create next app" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                {/* Header */}
                <Header>
                    <User size={32} color={colors.green100.value} />

                    <h1>Profile</h1>
                </Header>

                {/* Cards */}
                <Container>

                    <Content>
                        <Search>
                            <SearchInput placeholder='Buscar livro ou autor' />
                        </Search>

                        <ExplorerBooks>
                            {recentReviews.map(pub => (
                                <BookCardReduce key={pub.id} book={pub.book} />
                            ))}
                        </ExplorerBooks>
                    </Content>

                    <Aside>
                        <UserComponent />
                    </Aside>
                </Container>
            </Layout>

        </>
    )
}