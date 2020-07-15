export const subscribe = (
    email: string,
    additional: string,
): Promise<unknown> =>
    fetch('https://apiv1.rapport.fun/subscriberLine', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mode: 0, // 0 - subscribe, 1 - install APK
            email,
            additional,
            localeBrowser: navigator.language,
            localeChoosed:
                window.location.pathname.indexOf('/en') === 0
                    ? 'en-US'
                    : 'ru-RU',
        }),
    });
