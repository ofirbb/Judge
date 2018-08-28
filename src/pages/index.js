import React from 'react'
import Link from 'gatsby-link'
import styles from './index.module.css'

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

const IndexPage = ({
  data
}) => {

  let rounds = data.allDirectory.edges.filter(
    (edge) => !edge.node.relativeDirectory
  ).map((edge) => {
    return {
      name: edge.node.relativePath.replace('_', ' ').replace(
        /\b\w/g,
        l => l.toUpperCase()
      ),
      path: edge.node.relativePath
    }
  })

  return (
    <div>
      <h1>Rounds:</h1>
      <ul>
        {
          rounds.map(
            (round, index) => (<li key={index}>
              <Link to={round.path}>{round.name}</Link>
            </li>)
          )
        }
      </ul>
    </div>
  )
}

export const query = graphql `
  query RoundsQuery {
    allDirectory{
        edges {
          node {
            relativePath
            relativeDirectory
          }
        }
      }
  }
`

export default IndexPage