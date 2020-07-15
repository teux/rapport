/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, useEffect, useState } from 'react';
import { useRouteData } from 'react-static';
import { Subscription } from '../types';
import { primaryButton, gradientBackground } from '../utils/css-helpers';

type YesNo = 'yes' | 'no';

const LS_KEY = '18-approve-date';
const IS_NODE = typeof document === 'undefined';

const styles = css({
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 5,
    '& .hidden, &.hidden': {
        display: 'none!important',
    },
    '& .background': {
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    '& .popup': {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow:
            '0px 7px 11px rgba(50, 50, 71, 0.06), 0px 6px 11px rgba(50, 50, 71, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 422,
        padding: '39px 36px',
        width: 794,
        zIndex: 5,
        '&__logo': {
            width: '100%',
        },
        '&__disclaimer': {
            color: '#333333',
            fontSize: '18px',
        },
        '&__buttons': {
            display: 'flex',
            justifyContent: 'space-around',
            padding: 34,
            width: '100%',
            '& button': {
                width: 185,
            },
        },
    },
});

export const Popup: FC = () => {
    const {
        data: {
            button_no: buttonNo,
            button_yes: buttonYes,
            disclamer,
            logo,
            popup_background: background,
            popup_image: image,
            gradient_left_color: leftColor,
            gradient_right_color: rightColor,
        },
    } = useRouteData<Subscription>();

    // Previous YES answer causes one hour past
    let defaulAnswer: YesNo | undefined;
    try {
        const prevDate = window.localStorage.getItem(LS_KEY);
        if (!defaulAnswer && prevDate) {
            const delta = Date.now() - new Date(prevDate).getTime();
            if (delta < 3600e3) {
                defaulAnswer = 'yes';
            }
        }
    } catch (err) {}

    const [answer, setAnswer] = useState<YesNo | undefined>(defaulAnswer);

    useEffect(() => {
        if (defaulAnswer !== 'yes') {
            window.scroll(0, 0);
            const html = document.getElementsByTagName('html')[0];
            html.classList.add('no-scroll');
        }
    }, [defaulAnswer]);

    const onClickYes = () => {
        setAnswer('yes');
        const html = document.getElementsByTagName('html')[0];
        html.classList.remove('no-scroll');
        try {
            window.localStorage.setItem(LS_KEY, new Date().toISOString());
        } catch (err) {}
    };

    const onClickNo = () => {
        setAnswer('no');
    };

    return (
        <div
            css={styles}
            className={IS_NODE || answer === 'yes' ? 'hidden' : ''}
        >
            <img className="background" src={background.url} alt="" />
            <div className={`popup${answer === 'no' ? ' hidden' : ''}`}>
                <div className="popup__logo">
                    <img
                        src={logo?.url}
                        alt={logo ? logo.alt || '' : ''}
                        width="152"
                    />
                </div>
                <img src={image.url} alt={image ? image.alt || '' : ''} />
                <div className="popup__disclaimer">{disclamer}</div>
                <div className="popup__buttons">
                    <button
                        css={[
                            primaryButton(),
                            gradientBackground(leftColor, rightColor),
                        ]}
                        onClick={onClickYes}
                        type="button"
                    >
                        {buttonYes}
                    </button>
                    <button
                        css={[
                            primaryButton(),
                            gradientBackground(leftColor, rightColor),
                        ]}
                        onClick={onClickNo}
                        type="button"
                    >
                        {buttonNo}
                    </button>
                </div>
            </div>
        </div>
    );
};
