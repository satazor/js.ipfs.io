import React from 'react';
import Link from 'gatsby-link';
import { PropTypes } from 'prop-types';
import styles from './index.module.css';

console.log(styles);

const Header = ({ siteTitle }) => (
    <div
        className={ styles.header }>
        <div
            style={ {
                margin: '0 auto',
                maxWidth: 960,
                padding: '1.45rem 1.0875rem',
            } }>
            <h1 style={ { margin: 0 } }>
                <Link
                    to="/"
                    style={ {
                        color: 'white',
                        textDecoration: 'none',
                    } }>
                    { siteTitle }
                </Link>
            </h1>
        </div>
    </div>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
};

export default Header;
