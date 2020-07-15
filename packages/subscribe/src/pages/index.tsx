import React from 'react';
import { useRouteData } from 'react-static';

import { Body } from 'components/Body';
import { Footer } from 'components/Footer';
import { FirstScreen } from 'components/FirstScreen';
import { Helmet } from 'components/Helmet';
import { Popup } from 'components/Popup';
import { Subscription } from 'types/index';

const IndexPage: React.FC = () => {
    const data = useRouteData<Subscription>();
    return (
        <div key={data.lang}>
            <Helmet />
            <FirstScreen />
            <Body />
            <Footer />
            <Popup />
            {/* <code>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </code> */}
        </div>
    );
};

export default IndexPage;
