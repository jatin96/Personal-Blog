import React from 'react'
import {Link} from 'gatsby'
import {} from 'reactstrap'
import {Card, CardText, CardTitle, CardSubtitle, CardBody, Badge} from 'reactstrap'
import Img from 'gatsby-image'
import {slugify} from '../utility/utilityFunction'

const Post = ({ title, author, path, date, body, fluid, tags }) => {
    return (
        <Card>
            <Link to={path}><Img className="card-image-top" fluid={fluid}></Img></Link>
            <CardBody>
                <CardTitle>
                    <Link to={path}>{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by{' '}
                    <span className="text-info">{author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <ul className="post-tags">
                    {tags.map(tag => (
                        <li>
                            <Link to={`/tag/${slugify(tag)}`}>
                                <Badge color="primary" className="text-uppercase">{tag}</Badge>
                            </Link>
                        </li>    
                    ))}
                </ul>
                <Link to={path} className="btn btn-outline-primary float-right">
                    Read more
                </Link>
            </CardBody>
        </Card>
    )
}
export default Post;
