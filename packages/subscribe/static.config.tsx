import path from 'path';
import React from 'react';
import { ReactStaticConfig } from 'react-static';
import Prismic from 'prismic-javascript';

const config: ReactStaticConfig = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    async getRoutes() {
        const api = await Prismic.getApi(
            'https://rapport.cdn.prismic.io/api/v2',
        );
        return [
            {
                path: '/',
                getData: () =>
                    api.queryFirst(
                        Prismic.Predicates.at('document.type', 'subscription'),
                        {
                            lang: 'ru',
                        },
                    ),
            },
            {
                path: 'en',
                getData: () =>
                    api.queryFirst(
                        Prismic.Predicates.at('document.type', 'subscription'),
                        {
                            lang: 'en-us',
                        },
                    ),
            },
        ];
    },
    Document: ({
        Html, Head, Body, children,
    }) => (
        <Html lang="en-US">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"
                    integrity="sha512-SUJujhtUWZUlwsABaZNnTFRlvCu7XGBZBL1VF33qRvvgNk3pBS9E353kcag4JAv05/nsB9sanSXFbdHAUW9+lg=="
                    crossOrigin="anonymous"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"
                    integrity="sha512-SYsXmAblZhruCNUVmTp5/v2a1Fnoia06iJh3+L9B9wUaqpRVjcNBQsqAglQG9b5+IaVCfLDH5+vW923JL5epZA=="
                    crossOrigin="anonymous"
                />
                {/* <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                    rel="stylesheet"
                /> */}
                <link rel="stylesheet" href="https://use.typekit.net/trh1usv.css" />
            </Head>
            <Body>{children}</Body>
        </Html>
    ),
    plugins: [
        [
            'react-static-plugin-typescript',
            {
                typeCheck: false,
            },
        ],
        [
            'react-static-plugin-source-filesystem',
            {
                location: path.resolve('./src/pages'),
            },
        ],
        'react-static-plugin-reach-router',
        'react-static-plugin-emotion',
        'alter-webpack-config',
    ],
    maxThreads: 1,
    prefetchRate: 2,
};

export default config;
