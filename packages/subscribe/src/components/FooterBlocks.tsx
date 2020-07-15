/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC } from 'react';
import { FooterBlock, SocialItem, ContactItem } from '../types';

const styles = css({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 24,
    width: 300,
    zIndex: 2,
    '& .header': {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 90,
        '&__icon': {
            maxWidth: 170,
        },
        '&__label': {
            color: '#782FEF',
            fontSize: 25,
            fontWeight: 700,
            lineHeight: '45px',
        },
    },
    '& .text': {
        color: '#333333',
        fontSize: '14px',
        lineHeight: '141.5%',
        marginTop: 8,
    },
    '& .social': {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 12,
        width: '100%',
        '&__link': {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            textDecoration: 'none',
            '&:visited': {
                color: 'black',
            },
        },
        '&__icon': {
            height: 16,
        },
        '&__text': {
            color: '#828282',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '24px',
        },
    },
});

export const ContactBlock: FC<FooterBlock<ContactItem>> = ({
    items,
    primary,
}) => (
    <div css={styles}>
        <div className="header">
            <img
                className="header__icon"
                src={primary.icon?.url}
                alt={primary.icon?.alt || ''}
            />
            <div className="header__label">{primary.label}</div>
        </div>
        <div className="contact">
            {items.map(({ text }) => (
                <div className="text">{text}</div>
            ))}
        </div>
    </div>
);

export const SocialBlock: FC<FooterBlock<SocialItem>> = ({
    items,
    primary,
}) => (
    <div css={styles}>
        <div className="header">
            <img
                className="header__icon"
                src={primary.icon?.url}
                alt={primary.icon?.alt || ''}
            />
            <div className="header__label">{primary.label}</div>
        </div>
        <div className="social">
            {items.map(({ icon, link }) => (
                <a
                    className="social__link"
                    href={link.url || ''}
                    target={link.target}
                >
                    <img className="social__icon" src={icon.url} alt="icon" />
                    <span className="social__text">{icon.alt}</span>
                </a>
            ))}
        </div>
    </div>
);
