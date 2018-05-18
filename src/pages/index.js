import React from 'react';
import Link from '../shared/components/link';
import { FormattedMessage } from 'react-intl';

const IndexPage = () => (
    <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great <FormattedMessage id="foo" />.</p>
        <Link to="/page-2/">Go to page 2</Link>
    </div>
);

export default IndexPage;
