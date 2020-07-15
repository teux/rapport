import React from 'react';
import { Helmet as ProtoHelmet } from 'react-helmet';
import { useRouteData } from 'react-static';
import { Subscription } from 'types/index';

export const Helmet: React.FC = () => {
    const { data: { head_title: title } } = useRouteData<Subscription>();
    return (
        <ProtoHelmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap"
                rel="stylesheet"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </ProtoHelmet>
    );
};
