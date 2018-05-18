/* eslint-disable prefer-import/prefer-import-over-require */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs');
const template = require('lodash/template');
const { availableLocales, defaultLocale } = require('./intl/config');

module.exports.modifyWebpackConfig = ({ config, program }) => {
    // Add `shared` alias so that it's easier to access it from anywhere
    config.merge({
        resolve: {
            alias: {
                shared: path.join(__dirname, 'src/shared'),
            },
        },
    });

    // Setup Babel & PostCSS
    config.merge((current) => {
        current.postcss = require('postcss-preset-moxy')({
            importPath: path.join(__dirname, 'src/shared/styles/imports'),
            mixinsPath: path.join(__dirname, 'src/shared/styles/mixins'),
            browsers: program.browserslist,
        }).plugins;

        config.loader('js', (current) => {
            current.query = {
                ...current.query,
                presets: [
                    [require.resolve('babel-preset-moxy'), {
                        react: true,
                        modules: 'commonjs',
                        targets: {
                            browsers: program.browserslist,
                        },
                    }],
                ],
                plugins: [
                    require.resolve('react-hot-loader/babel'),
                    require.resolve('gatsby/dist/utils/babel-plugin-extract-graphql'),
                ],
            };

            return current;
        });

        return current;
    });
};

exports.createLayouts = () => {
    // Create a layout for each locale, based on a template
    const layoutTemplate = fs.readFileSync(path.join(__dirname, 'src/layouts/index.js'));

    availableLocales.forEach((locale) => {
        const localeLayout = template(layoutTemplate)({ locale })
        .replace(/LayoutQuery/, `LayoutQuery_${locale}`);

        fs.writeFileSync(path.join(__dirname, `src/layouts/index-${locale}.js`), localeLayout);
    });
};

exports.onCreatePage = ({ page, boundActionCreators }) => {
    // Create a localized page for each locale
    const { createPage, deletePage } = boundActionCreators;

    deletePage(page);

    availableLocales.forEach((locale) => {
        createPage({
            ...page,
            layout: `index-${locale}`,
            path: locale === defaultLocale ? page.path : `/${locale}${page.path}`,
        });
    });
};
