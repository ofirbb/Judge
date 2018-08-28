/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const {
  createFilePath
} = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators
}) => {
  const {
    createNodeField
  } = boundActionCreators

  if (node.sourceInstanceName == 'rounds' && !node.relativeDirectory &&
    node.relativePath && node.internal.type === 'Directory') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages"
    });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
};

exports.createPages = ({
  graphql,
  boundActionCreators
}) => {
  const {
    createPage
  } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(
      `
      {
      allDirectory{
          edges {
            node {
              relativePath
              relativeDirectory
              fields {
                slug
              }
            }
          }
        }
    }
    `
    ).then(result => {
      result.data.allDirectory.edges.filter((edge) =>
        edge.node.fields).forEach(({
        node
      }) => {
        // console.log(node);
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            `./src/templates/comparison.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      // console.log(JSON.stringify(result, null, 4))
      resolve()
    })
  })
};