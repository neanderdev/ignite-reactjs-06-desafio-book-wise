import Head from 'next/head'

import { Navbar } from '@/components/Navbar'

import { Container, Content } from './styles'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home | Book Wise</title>

                <meta name="description" content="Generated by create next app" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <Navbar />

                <Content>
                    content
                </Content>
            </Container>
        </>
    )
}