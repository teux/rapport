import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App';

if (typeof document !== 'undefined') {
    const target = document.getElementById('root');

    if (target) {
        const renderMethod = target.hasChildNodes()
            ? ReactDOM.hydrate
            : ReactDOM.render;

        const render = (Comp: React.ComponentType) => {
            renderMethod(
                <AppContainer>
                    <Comp />
                </AppContainer>,
                target,
            );
        };
        render(App);

        if (module && module.hot) {
            module.hot.accept('./App', () => {
                render(App);
            });
        }
    }
}

export default App;
