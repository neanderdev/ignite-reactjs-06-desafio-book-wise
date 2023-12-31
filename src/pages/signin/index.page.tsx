import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

import { SignInButton } from '@/components/SignInButton'

import { providerSchema } from './utils/providers-schema'

import { Banner, Container, Content } from './styles'

import logoSVG from '../../assets/logo.svg'

export default function SignIn() {
    async function handleSignIn(provider: string) {
        try {
            await signIn(provider, { callbackUrl: '/home' });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>Book Wise | SignIn</title>

                <meta name="description" content="Generated by create next app" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Body */}
            <Container>
                <Banner>
                    <Image
                        src={logoSVG}
                        alt="Image de um livro e ao lado o título: Book Wise"
                    />
                </Banner>

                {/* Login Options */}
                <Content>
                    <div className='group'>
                        <div className="header">
                            <h1>Boas vindas!</h1>

                            <p>Faça seu login ou acesse como visitante.</p>
                        </div>

                        {providerSchema.map(provider => (
                            <SignInButton
                                key={provider.id}
                                text={provider.text}
                                imgsrc={provider.icone}
                                onClick={() => handleSignIn(provider.name)}
                            />
                        ))}
                    </div>
                </Content>
            </Container>
        </>
    )
}
