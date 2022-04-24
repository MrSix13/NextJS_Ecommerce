import Head from 'next/head';
import {FC} from 'react';
import { Navbar, SideMenu } from '../ui';
import React from 'react';

interface Props{
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: React.ReactNode;
}


export const ShopLayout:FC<Props> = ({children,title,pageDescription,imageFullUrl}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={pageDescription} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={pageDescription} />
            {
                imageFullUrl && (
                    <meta name="og:image" content={imageFullUrl} />
                )
            }
        </Head>

        <nav>
            {/*NAVBAR */}
            <Navbar/>
        </nav>

         {/*SIDEBAR */}
         <SideMenu/>

         <main style={{
             margin: '80px auto',
             maxWidth: '1440px',
             padding: '0px 30px'
         }}>
             {children}
         </main>

         <footer>
              {/*FOOTER */}
         </footer>
    </>
  )
}

