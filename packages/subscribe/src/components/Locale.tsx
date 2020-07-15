/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
    FC, useState, useEffect, SyntheticEvent,
} from 'react';
import { Link, LinkGetProps } from '@reach/router';
import { useRouteData } from 'react-static';

import { Subscription } from '../types';

enum LANG {
    ru = 'RU',
    'en-us' = 'EN',
}
const IS_NODE = typeof document === 'undefined';

const getLinkProps = ({ isCurrent }: LinkGetProps) => ({
    className: `link ${isCurrent ? 'active' : ''}`,
});

const styles = css({
    alignItems: 'center',
    display: 'flex',
    fontSize: 13,
    '& .button': {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        overflow: 'hidden',
        padding: '4px 8px',
        userSelect: 'none',
    },
    '& .tick': {
        height: 18,
        paddingLeft: 8,
        width: 18,
    },
    '& .list': {
        paddingLeft: 8,
        position: 'absolute',
    },
    '& .link': {
        color: 'black',
        display: 'block',
        padding: '4px 0',
        textDecoration: 'none',
        '&.active': {
            display: 'none',
        },
    },
});

export const Locale: FC = () => {
    const {
        data: { locale },
        lang,
    } = useRouteData<Subscription>();

    const [isOpen, setOpen] = useState(false);
    const toggle = (e: SyntheticEvent) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };

    useEffect(() => {
        const setClose = () => setOpen(false);
        window.addEventListener('click', setClose);
        return () => {
            window.removeEventListener('click', setClose);
        };
    }, []);

    return (
        <div css={styles}>
            {locale && <img src={locale.url || ''} alt={locale.alt || ''} />}
            <div>
                <div
                    className="button"
                    onClick={toggle}
                    onKeyPress={toggle}
                    role="button"
                    tabIndex={0}
                >
                    <span>{LANG[lang]}</span>
                    <svg className="tick" viewBox="0 0 22 22">
                        <path d="M6 9l4 4 4-4z" />
                    </svg>
                </div>
                <nav
                    className="list"
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    <Link
                        to={`/${IS_NODE ? '' : window.location.search}`}
                        getProps={getLinkProps}
                        onClick={toggle}
                    >
                        {LANG.ru}
                    </Link>
                    <Link
                        to={`/en${IS_NODE ? '' : window.location.search}`}
                        getProps={getLinkProps}
                        onClick={toggle}
                    >
                        {LANG['en-us']}
                    </Link>
                </nav>
            </div>
        </div>
    );
};
