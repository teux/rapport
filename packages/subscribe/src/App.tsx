import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { Router } from '@reach/router';
import React, { FC, Suspense } from 'react';
import { Root, Routes } from 'react-static';

import { Spinner } from 'components/Spinner';

export const App: FC = () => (
    <Root>
        <Global
            styles={css`
                ${emotionNormalize}
                html,
                body {
                    -webkit-font-smoothing: antialiased;
                    background: white;
                    font-family: 'noto-sans', 'Open Sans', 'Roboto', sans-serif;
                    letter-spacing: 0.01em;
                    margin: 0;
                    min-height: 100%;
                    min-width: 1280px;
                    padding: 0;
                    scroll-behavior: smooth;
                }
                * {
                    box-sizing: border-box;
                }
                .no-scroll {
                    overflow: hidden;
                }
            `}
        />
        <Suspense fallback={<Spinner />}>
            <Router>
                <Routes path="*" />
            </Router>
        </Suspense>
    </Root>
);
