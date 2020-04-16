import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql,StaticQuery} from 'gatsby';
import Post from '../components/Post'

const IndexPage = () => {
 return ( <Layout pageTitle="Code Blog">
    <SEO title="Home"  keywords={[`gatsby`, `application`, `react`]}/>
      <StaticQuery 
    query={indexQuery} 
    render={data => {
      return (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Post
            key={node.id} 
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            slug={node.fields.slug}
            body={node.frontmatter.body}
            fluid={node.frontmatter.image.childImageSharp.fluid}
            tags={node.frontmatter.tags}
          />
            
          ))}
        </div>
      )
    }} 
    />
  </Layout>
)
}

const indexQuery = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "MMM Do YYYY")
          author
          tags
          image{
            childImageSharp{
              fluid(maxWidth: 600){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields{
          slug
        }
        excerpt
      }
    }
  }
}
`

export default IndexPage
