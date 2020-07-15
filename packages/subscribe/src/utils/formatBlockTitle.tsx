import React, { ReactNode } from 'react';

import { Span, RichText } from 'types/index';

interface SpanType {
    position: number;
    startType: Set<string>;
    endType: Set<string>;
}

interface CssClasses {
    position: number;
    classes: string[];
}

const getSpanTypes = (spans: Span[]) => {
    const spanTypes: SpanType[] = [];

    for (let i = 0; i < spans.length; i += 1) {
        const { start, end, type } = spans[i];

        let span = spanTypes.find(({ position }) => position === start);
        if (!span) {
            span = {
                position: start,
                startType: new Set([type]),
                endType: new Set(),
            };
            spanTypes.push(span);
        } else {
            span.startType.add(type);
        }

        span = spanTypes.find(({ position }) => position === end);
        if (!span) {
            span = {
                endType: new Set([type]),
                position: end,
                startType: new Set(),
            };
            spanTypes.push(span);
        } else {
            span.endType.add(type);
        }
    }
    spanTypes.sort((a, b) => (a.position > b.position ? 1 : -1));

    if (spanTypes.length && spanTypes[0].position > 0) {
        spanTypes.unshift({
            endType: new Set(),
            position: 0,
            startType: new Set(),
        });
    }
    return spanTypes;
};

const getCssClasses = (spanTypes: SpanType[]) =>
    spanTypes.reduce<CssClasses[]>((res, next) => {
        if (res.length === 0) {
            res.push({
                position: next.position,
                classes: [...next.startType],
            });
        } else {
            const prev = res[res.length - 1];

            const startType = new Set([...prev.classes, ...next.startType]);
            const classes = {
                position: next.position,
                classes: [...startType].filter(
                    (type) => !next.endType.has(type),
                ),
            };
            if (prev.position === classes.position) {
                res.pop();
            }
            res.push(classes);
        }
        return res;
    }, []);

export const formatBlockTitle = ({ text, spans }: RichText): ReactNode => {
    if (!text || !text.length) {
        return '';
    }
    if (!spans.length) {
        return text as string;
    }

    const spanTypes: SpanType[] = getSpanTypes(spans);
    const cssClasses: CssClasses[] = getCssClasses(spanTypes);

    return cssClasses.map<JSX.Element>((item, idx) => {
        const nextPos = idx === cssClasses.length - 1
            ? text.length
            : cssClasses[idx + 1].position;
        return (
            <span className={item.classes.join(' ')}>
                {text.slice(item.position, nextPos)}
            </span>
        );
    });
};
