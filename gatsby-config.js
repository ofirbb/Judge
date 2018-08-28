module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rounds`,
        path: `${__dirname}/../../rounds/`
      }
    },
    'gatsby-plugin-react-helmet'
  ]
}
