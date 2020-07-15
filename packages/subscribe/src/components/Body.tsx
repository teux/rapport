/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC } from 'react';
import { useRouteData } from 'react-static';

import { Subscription } from 'types/index';
import { formatBlockTitle } from '../utils/formatBlockTitle';
import { gradientBackground, primaryButton } from '../utils/css-helpers';
import { Email } from './Email';

const styles = css({
    position: 'relative',
    '& .header': {
        height: 430,
        left: 0,
        right: 0,
        top: 0,
        '& .text': {
            color: 'white',
            fontSize: 37,
            height: 200,
            paddingTop: 46,
            textAlign: 'center',
        },
    },
    '& .tabs': {
        alignItems: 'flex-end',
        display: 'flex',
        justifyContent: 'center',
        height: 405,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        '& .tab': {
            alignItems: 'center',
            background: 'white',
            boxShadow:
                '0px 4px 8px rgba(50, 50, 71, 0.06), 0px 4px 4px rgba(50, 50, 71, 0.08)',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 263,
            margin: '0 30px',
            padding: 16,
            width: 300,

            '&__header': {
                fontSize: 21,
                fontWeight: 700,
                lineHeight: '115.1%',
                paddingTop: 12,
                textAlign: 'center',
            },
            '&__text': {
                color: '#333333',
                fontSize: 14,
                fontWeight: 300,
                lineHeight: '141.5%',
                paddingTop: 18,
                textAlign: 'center',
                width: '100%',
            },
        },
    },
    '& .block': {
        fontSize: '18px',
        fontWeight: 'normal',
        height: 751,
        lineHeight: '25px',
        paddingRight: 580,
        position: 'relative',
        width: '100%',
        '&__content': {
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding: 50,
            position: 'absolute',
            right: 0,
            top: 0,
            width: 580,
        },
        '&__title': {
            fontWeight: 700,
            fontSize: 32,
            lineHeight: '45px',
            width: '100%',
            '& .strong': {
                color: '#782FEF',
            },
        },
        '&__text': {
            fontSize: 18,
            fontWeight: 300,
            lineHeight: '25px',
            maxWidth: 380,
            paddingTop: 40,
            '&_em': {
                color: '#782FEF',
                fontSiz: 21,
                fontWeight: 700,
                paddingBottom: 8,
                paddingTop: 86,
                maxWidth: 470,
            },
        },
        '&__button': {
            marginTop: 40,
        },
        '&__photo': {
            height: 'auto',
            width: '116%',
            maxWidth: 1100,
        },
        '&.reverse': {
            paddingRight: 0,
            paddingLeft: 620,
            '.block__content': {
                left: 0,
                paddingLeft: 135,
                right: 'auto',
            },
            '.block__title': {
                maxWidth: 380,
            },
            '.block__text': {
                maxWidth: 470,
                width: 470,
            },
            '.block__photo': {
                width: '100%',
                maxWidth: 850,
            },
        },
    },
});

export const Body: FC = () => {
    const {
        data: {
            header,
            tab: tabs,
            slice: [block1, block2],
            gradient_left_color: leftColor,
            gradient_right_color: rightColor,
        },
    } = useRouteData<Subscription>();

    const onClick = () => {
        window.scroll(0, 0);
        const inputs = document.getElementsByName('email');
        if (inputs[0]) {
            const input = inputs[0];
            input.focus();
            input.classList.remove('effect-end');
            input.classList.add('effect-start');
            window.setTimeout(() => {
                input.classList.remove('effect-start');
                input.classList.add('effect-end');
            });
        }
    };

    return (
        <div css={styles}>
            <div className="header">
                <div
                    className="text"
                    css={{
                        background: [
                            rightColor || '#000',
                            `linear-gradient(120deg, ${leftColor} 0%, ${rightColor} 100%)`,
                        ],
                    }}
                >
                    {header[0]?.text || ''}
                </div>
            </div>
            <div className="tabs">
                {tabs.map((tab, i) => (
                    <div key={i} className="tab">
                        {tab.icon && (
                            <img
                                src={tab.icon.url}
                                alt={tab.icon.alt || ''}
                                height="68"
                            />
                        )}
                        <div className="tab__header">{tab.header[0].text}</div>
                        <div className="tab__text">{tab.text}</div>
                    </div>
                ))}
            </div>
            {block1 && (
                <div className="block">
                    {block1.primary.photo && (
                        <img
                            className="block__photo"
                            src={block1.primary.photo.url}
                            alt={block1.primary.photo.alt || ''}
                        />
                    )}
                    <div className="block__content">
                        <div className="block__title">
                            {formatBlockTitle(block1.primary.title1[0])}
                        </div>
                        <div className="block__text">{block1.primary.text}</div>
                        <button
                            className="block__button"
                            css={[
                                primaryButton(),
                                gradientBackground(leftColor, rightColor),
                            ]}
                            onClick={onClick}
                            type="button"
                        >
                            {block1.items[0] && block1.items[0].key_text}
                        </button>
                    </div>
                </div>
            )}
            {block2 && (
                <div className="block reverse">
                    {block2.primary.photo && (
                        <img
                            className="block__photo"
                            src={block2.primary.photo.url}
                            alt={block2.primary.photo.alt || ''}
                        />
                    )}
                    <div className="block__content">
                        <div className="block__title">
                            {formatBlockTitle(block2.primary.title1[0])}
                        </div>
                        <div className="block__text">{block2.primary.text}</div>
                        <div
                            className="block__text_em"
                            css={{
                                color: rightColor || '#000',
                            }}
                        >
                            {block2.items[0] && block2.items[0].key_text}
                        </div>
                        <Email />
                    </div>
                </div>
            )}
        </div>
    );
};
