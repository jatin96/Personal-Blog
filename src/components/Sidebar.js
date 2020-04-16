import React from 'react'
import {Card, CardTitle, CardBody, FormGroup, Form, Input, CardText} from 'reactstrap'
import {graphql, StaticQuery, Link} from 'gatsby'
import Img from 'gatsby-image'
import {slugify} from '../utility/utilityFunction'

const Sidebar = ({author, authorFluid}) => (
    <div>
        {author && (
            <Card>
                <Img className="card-image-top" fluid={authorFluid}></Img>
                <CardBody>
                <CardTitle className="text-center text-uppercase mb-3">{author.name}</CardTitle>
                <CardText>{author.bio}</CardText>
                <div className="author-social-links text-center">
                    <ul>
                        <li><a href={author.facebook} target="_blank" rel="noopener norefferrer" className="facebook"><i className="fab fa-facebook-f fa-lg"></i></a></li>
                    </ul>
                </div>
                </CardBody>
            </Card>
        )}
        <Card>
            <CardBody>
                <CardTitle className="text-center text-upper-case md-3">
                    NewsLetter
                </CardTitle>
                <Form className="text-center">
                    <FormGroup><Input type="email" name="email" placeholder="Your email address here..."></Input> </FormGroup>
                    <button className="btn btn-outline-success text-uppercase">Subscribe</button>
                </Form>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase"> Advertisement </CardTitle>
                <img src="https://via.placeholder.com/320x320" alt="Advert" style={{width: "100%"}}></img>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase mb-3">Recent Posts</CardTitle>
                <StaticQuery query={sidebarQuery} render={(data) => (
                    <div>
                        {data.allMarkdownRemark.edges.map(({node}) => (
                            <Card key={node.id}>
                                <Link to={node.fields.slug}>
                                    <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid}></Img>
                                </Link>
                                <CardBody>  
                                    <CardTitle>
                                        <Link to={node.fields.slug}>
                                            {node.frontmatter.title}
                                        </Link>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}>

                </StaticQuery>
            </CardBody>
        </Card>
    </div>
)

const sidebarQuery = graphql`
query sidebarQuery {
    allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}
        limit: 3
    ) {
        edges{
            node{
                id
                frontmatter{
                    title
                    image{
                        childImageSharp{
                            fluid(maxWidth: 300){
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                fields{
                    slug
                }
            }
        }
    }
}`
export default Sidebar