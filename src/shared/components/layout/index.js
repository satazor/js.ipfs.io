import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import Header from '../header';
import styles from './index.module.css';

class Layout extends Component {
    render() {
        const { data, children, intl } = this.props;

        return (
            <IntlProvider locale={ intl.locale } messages={ intl.messages }>
                <div>
                    <Helmet
                        title={ data.site.siteMetadata.title }
                        meta={ [
                            { name: 'description', content: 'JS IPFS website' },
                            { name: 'keywords', content: 'gatsby, ipfs' },
                        ] } />
                    <Header siteTitle={ data.site.siteMetadata.title } />
                    <div className={ styles.container }>
                        { children() }
                    </div>
                </div>
            </IntlProvider>
        );
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        children: PropTypes.func,
        intl: PropTypes.object.isRequired,
    };
}

export default Layout;
