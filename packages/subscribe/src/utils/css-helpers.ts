import { css, SerializedStyles } from '@emotion/core';

const defaultLeftColor = '#BBB';
const defaultRightColor = '#000';

/** */
export const gradientBackground = (
    leftColor: string | null,
    rightColor: string | null,
): SerializedStyles =>
    css({
        background: [
            rightColor || '#000',
            `linear-gradient(120deg, ${leftColor || defaultLeftColor} 0%, ${
                rightColor || defaultRightColor
            } 100%)`,
        ],
    });

/**  */
export const gradientText = (
    leftColor: string | null,
    rightColor: string | null,
): SerializedStyles =>
    css({
        color: 'rgba(120, 47, 239, 1)',
        background: `-webkit-linear-gradient(60deg, ${
            leftColor || defaultLeftColor
        } 0%, ${rightColor || defaultRightColor} 100%)`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
    });

/** */
export const primaryButton = (): SerializedStyles =>
    css({
        border: 'none',
        borderRadius: '8px',
        boxShadow:
            '0px 24px 32px rgba(186, 21, 146, 0.08), 0px 16px 16px rgba(186, 21, 146, 0.15)',
        color: 'white',
        cursor: 'pointer',
        padding: '14px 21px',
        '&:active': {
            border: 'none',
            outline: 'none',
        },
    });
