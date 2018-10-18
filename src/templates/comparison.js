/**
 * @Author: Shaked Lokits <slokits>
 * @Date:   2018-09-16T10:45:52+03:00
 * @Email:  shaked.lokits@gmail.com
 * @Filename: comparison.js
 * @Last modified by:   slokits
 * @Last modified time: 2018-10-16T16:02:35+03:00
 */



import React from "react";
import * as JsSearch from 'js-search';
import Img from "gatsby-image";
import Masonry from 'react-masonry-component'

const masonryOptions = {
  itemSelector: '.grid-item',
  percentPosition: true
}

const compareBy = (key) => {
  return function (a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  }
};

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
    {data.markdownRemark && (
          <div css={{
            background: 'rgb(233, 243, 214)',
            padding: '2rem',
            filter: 'invert(1000%)'
          }} dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
        )
    }
    {
      searchAssets.search('/styles/').sort(compareBy('name')).map((style, index) => {
        return (
          <section id={style.name} key={style.name}>
            <h1 css={{
              margin: '1rem 0'
            }}>{`${index}: ${style.name}`}</h1>
            <Masonry options={masonryOptions} elementType={'div'}>
              <div
                style={{
                  width: "50%",
                }}
                className='grid-item'
                key={style.name}>
                <img css={{
                  outline: '5px solid rgba(255, 255, 255, 1)',
                  outlineOffset: '-10px',
                  width: "100%",
                  marginBottom: 0,
                }} src={style.childImageSharp.resize.src}></img>
              </div>
              {
                searchAssets.search('/contents/').map((content) => {
                  let result = searchAssets.search(`results/${style.name}~${content.name}`)[0]
                  if (result) {
                    return (
                      <div
                        style={{
                          width: "50%"
                        }}
                        className='grid-item'
                        key={result.name}>
                        <img
                          css={{
                            marginBottom: 0,
                            'content' : 'url(' + result.childImageSharp.resize.src + ')',
                            ':hover' : {
                              'content': 'url(' + content.childImageSharp.resize.src + ')'
                            }
                          }}></img>
                      </div>
                    )
                  }
                })
              }
            </Masonry>
          </section>
        )
      })
    }</div>;
};

export const query = graphql `
  query ComparisonQuery($slug: String!, $directoryRegex: String!) {
      directory(fields: { slug: { eq: $slug } }) {
        relativePath
        fields {
          slug
        }
    }
    markdownRemark(fileAbsolutePath: {regex: $slug}) {
    html
  }
    	allFile(filter:{relativePath: {regex: $directoryRegex}, extension: {regex: "/png|jpg/i"}}) {
      edges {
        node {
          relativePath
          name
          extension
          childImageSharp {
            resize(width:600, height:600, grayscale:true) {
              src
            }
          }
        }
      }
    }
  }
`;

// childImageSharp {
//   resize(width:600, height:600, grayscale:true) {
//     aspectRatio
//     src
//     srcSet
//     srcWebp
//     srcSetWebp
//     originalName
//   }
// }

//
// <Img key={result.name} outerWrapperClassName='grid-item' imgStyle={{
// width:100,   height:100 }} resolutions={result.childImageSharp.resolutions}
// />
