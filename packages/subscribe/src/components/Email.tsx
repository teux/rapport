/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRouteData } from 'react-static';
import {
    FC, useState, ChangeEventHandler, MouseEventHandler,
} from 'react';

import { Subscription } from '../types';
import { gradientBackground } from '../utils/css-helpers';
import { subscribe } from '../utils/subscribe';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const styles = css({
    fontSize: 16,
    whiteSpace: 'nowrap',
    '& input': {
        border: '1px solid #E3E3E3',
        borderBottomLeftRadius: 8,
        borderRight: 'none',
        borderTopLeftRadius: 8,
        fontSize: 16,
        fontWeight: 300,
        height: 80,
        outline: 'none',
        padding: 30,
        width: 390,
        '&.effect-start': {
            backgroundColor: '#D0007B',
        },
        '&.effect-end': {
            transition: 'all 1s ease-in',
            backgroundColor: 'transparent',
        },
    },
    '& input:focus': {
        borderColor: '#D3D3D3',
    },
    '& .button': {
        border: 'none',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        background: 'linear-gradient(95.36deg, #D0007B -25.06%, #8949F1 100%)',
        boxShadow:
            '0px 16px 24px rgba(174, 35, 173, 0.08), 0px 12px 12px rgba(174, 35, 173, 0.08)',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: 16,
        fontWeight: 300,
        height: 80,
        margin: '0',
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'top',
        width: 150,
    },
    '& .complete': {
        color: '#30D05D',
        fontSize: '13px',
        marginTop: 8,
        textAlign: 'right',
        '&_hidden': {
            display: 'none',
        },
    },
});

export const Email: FC = () => {
    const {
        data: {
            email_placeholder: placeholder,
            gradient_left_color: leftColor,
            gradient_right_color: rightColor,
            subscribe_button: subscribeButton,
            subscribe_complete: subscribeComplete,
        },
    } = useRouteData<Subscription>();

    const [isSubscribe, setSubscribe] = useState(false);
    const [email, setEmail] = useState<string | undefined>();

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSubscribe(false);
        setEmail(e.target.value);
    };
    const onSubscribe: MouseEventHandler = (e) => {
        if (isSubscribe || !email) {
            return;
        }
        if (emailRegex.test(email)) {
            e.preventDefault();
            subscribe(email, window.location.search)
                .then(() => {
                    setSubscribe(true);
                })
                .catch(() => {});
        }
    };

    return (
        <form css={styles}>
            <div>
                <input
                    name="email"
                    onChange={onChange}
                    pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                    placeholder={placeholder || 'email...'}
                    required
                    type="email"
                    value={email}
                />
                <button
                    className="button"
                    css={gradientBackground(leftColor, rightColor)}
                    onClick={onSubscribe}
                    type="submit"
                >
                    {subscribeButton}
                </button>
            </div>
            <div className={`complete${isSubscribe ? '' : ' complete_hidden'}`}>
                {subscribeComplete}
            </div>
        </form>
    );
};
