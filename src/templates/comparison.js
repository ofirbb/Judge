import React from "react";
import * as JsSearch from 'js-search';
import Img from "gatsby-image";
import Sidebar from '../components/sidebar'

export default ({
  data
}) => {
  let results = [],
    assets = {}
  const searchAssets = new JsSearch.Search('relativePath');
  searchAssets.indexStrategy = new JsSearch.ExactWordIndexStrategy();
  searchAssets.addIndex('relativePath')
  searchAssets.addIndex('name')
  searchAssets.addIndex('extension')
  searchAssets.addDocuments(data.allFile.edges.map((edge) => edge.node))

  return <div>
  {
    searchAssets.search('/styles/').map((style, index) => {
      return (
        <section key={style.name}>
        <h2>{style.name}</h2>
        {searchAssets.search('/contents/').map((content) => {
          let result = searchAssets.search(`results/${style.name}:${content.name}`)[0]
          return (
            <Img key={result.name} resolutions={result.childImageSharp.resolutions} />
          )
        })}
        </section>
      )
    })
  }</div>;
};

export const query = graphql `
  query ComparisonQuery($slug: String!) {
      directory(fields: { slug: { eq: $slug } }) {
        relativePath
        fields {
          slug
        }
    }
    	allFile(filter:{relativePath: {regex: $slug}, extension: {regex: "/png|jpg/i"}}) {
      edges {
        node {
          relativePath
          name
          extension
          childImageSharp {
            resolutions(width:600, height:600, grayscale:true) {
              base64
              tracedSVG
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
              originalName
            }
          }
        }
      }
    }
  }
`;