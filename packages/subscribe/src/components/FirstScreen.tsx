/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, useState } from 'react';
import { useRouteData } from 'react-static';

import { Subscription } from 'types/index';
import { Locale } from './Locale';
import { gradientText } from '../utils/css-helpers';
import { Email } from './Email';

const styles = css({
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: '57%!important',
    '& .content': {
        alignItems: 'start',
        bottom: 154,
        display: 'flex',
        flexDirection: 'column',
        fontSize: 18,
        fontWeight: 300,
        justifyContent: 'space-between',
        left: 134,
        lineHeight: '25px',
        overflowX: 'visible',
        position: 'absolute',
        top: 54,
    },
    '& .locale': {
        left: 288,
        position: 'absolute',
        top: 40,
    },
    '& .slogan': {
        color: '#BDBDBD',
        fontSize: 21,
        fontWeight: 500,
    },
    '& .title': {
        fontSize: 45,
        fontWeight: 700,
        lineHeight: '55px',
        maxWidth: 540,
        padding: '16px 0',
    },
    '& .description': {
        width: 500,
    },
    '& .application': {
        bottom: -130,
        height: 875,
        position: 'absolute',
        right: -20,
        width: 671,
    },
    '& .invisible-images': {
        height: 1,
        left: -1,
        overflow: 'hidden',
        position: 'fixed',
        top: -1,
        width: 1,
    },
});

export const FirstScreen: FC = () => {
    const {
        data: {
            logo,
            background,
            application,
            slogan,
            title,
            description,
            gradient_left_color: leftColor,
            gradient_right_color: rightColor,
        },
    } = useRouteData<Subscription>();

    const [backgroundUrl, setBackgroundUrl] = useState(
        background ? background.small.url : '',
    );
    const [applicationUrl, setApplicationUrl] = useState(
        application ? application.small.url : '',
    );
    const onBackgroundLoad = () => {
        setBackgroundUrl(background ? background.url : '');
    };
    const onApplicationLoad = () => {
        setApplicationUrl(application ? application.url : '');
    };

    return (
        <div
            css={styles}
            style={{
                background: `url("${backgroundUrl}") no-repeat top right`,
            }}
        >
            <img
                className="application"
                src={applicationUrl}
                alt={application ? application.alt || '' : ''}
            />
            <div className="content">
                <div css={{ position: 'relative' }}>
                    {logo && (
                        <img
                            src={logo.url}
                            alt={logo.alt || ''}
                            height={logo.dimensions.height}
                            width={logo.dimensions.width}
                        />
                    )}
                    <div className="locale">
                        <Locale />
                    </div>
                </div>
                <div>
                    <div className="slogan">{slogan}</div>
                    <div
                        className="title"
                        css={gradientText(leftColor, rightColor)}
                    >
                        {title[0] && title[0].text}
                    </div>
                    <div className="description">{description}</div>
                </div>
                <Email />
            </div>
            <div className="invisible-images">
                {background && (
                    <img
                        src={background.url}
                        onLoad={onBackgroundLoad}
                        alt={background.alt || ''}
                    />
                )}
                {application && (
                    <img
                        src={application.url}
                        onLoad={onApplicationLoad}
                        alt={application.alt || ''}
                    />
                )}
            </div>
        </div>
    );
};
