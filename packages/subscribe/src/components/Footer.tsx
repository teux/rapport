/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { FC } from 'react';
import { useRouteData } from 'react-static';

import { Subscription } from '../types';
import { isSocialFooterBlock } from '../utils/type-guards';
import { SocialBlock, ContactBlock } from './FooterBlocks';
import { Locale } from './Locale';

const dividerCss = css({
    margin: '0 135px',
    height: 2,
    backgroundColor: '#782FEF',
    opacity: 0.06,
});

const footerCss = css({
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0 135px',
});

const copyrightCss = css({
    padding: '32px 135px',
    position: 'relative',
    textAlign: 'center',
    '& .copyright': {
        fontSize: 20,
        fontWeight: 700,
    },
    '& .rights': {
        fontSize: 14,
        paddingTop: 8,
    },
    '& .locale': {
        bottom: 32,
        position: 'absolute',
        right: 135,
    },
    '& .terms': {
        bottom: 32,
        fontSize: 14,
        left: 135,
        lineHeight: '141%',
        position: 'absolute',
        textAlign: 'left',
        '& a': {
            color: '#333',
            display: 'block',
            textDecoration: 'none',
            '&:visited': {
                color: '#333',
            },
        },
    },
});

export const Footer: FC = () => {
    const {
        data: { footer, copyright, rights },
    } = useRouteData<Subscription>();

    return (
        <React.Fragment>
            <div css={dividerCss} />
            <div css={footerCss}>
                {footer.map((block) =>
                    (isSocialFooterBlock(block) ? (
                        <SocialBlock {...block} />
                    ) : (
                        <ContactBlock {...block} />
                    )))}
            </div>
            <div css={copyrightCss}>
                <div className="copyright">{copyright}</div>
                <div className="rights">{rights}</div>
                <div className="locale">
                    <Locale />
                </div>
                <div className="terms">
                    <a href="/privacy/" target="_blank">
                        Privacy Policy
                    </a>
                    <a href="/terms/" target="_blank">
                        Terms &amp; Conditions
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
};
