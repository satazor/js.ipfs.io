import React from 'react';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/en';
import Layout from '../shared/components/layout';
import messages from '../../intl/messages/en/index.json';

addLocaleData(localeData);

const intl = { locale: 'en', messages };

export default (props) => <Layout { ...props } intl={ intl } />;

export const query = graphql`query LayoutQuery_en {
  site {
    siteMetadata {
      title
    }
  }
}
`;
