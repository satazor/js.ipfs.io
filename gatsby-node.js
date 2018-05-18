/* eslint-disable prefer-import/prefer-import-over-require */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { availableLocales, defaultLocale } = require('./intl/config');

module.exports.modifyWebpackConfig = ({ config, program }) => {
    config.merge((current) => {
        current.postcss = require('postcss-preset-moxy')({
            importPath: path.join(__dirname, 'shared/styles/imports'),
            mixinsPath: path.join(__dirname, 'shared/styles/imports/mixins'),
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

exports.onCreatePage = ({ page, boundActionCreators }) => {
    const { createPage, deletePage } = boundActionCreators;

    deletePage(page);

    availableLocales.forEach((locale) => {
        createPage({
            ...page,
            layout: locale,
            path: locale === defaultLocale ? page.path : `/${locale}${page.path}`,
        });
    });
};
