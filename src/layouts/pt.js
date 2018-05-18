import React from 'react';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/pt';
import Layout from '../shared/components/layout';
import messages from '../../intl/messages/pt/index.json';

addLocaleData(localeData);

const intl = { locale: 'pt', messages };

export default (props) => <Layout { ...props } intl={ intl } />;

export const query = graphql`query LayoutQuery_pt {
  site {
    siteMetadata {
      title
    }
  }
}
`;
