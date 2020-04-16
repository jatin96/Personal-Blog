import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {Button, Badge} from 'reactstrap'
import {slugify} from '../utility/utilityFunction'

const tagsPage = ({ pageContext }) => {
    const {tags, tagsPostCount} = pageContext
    return (
        <Layout pageTitle="App Tags">
            <SEO title="All tags" keywords={['tags','topics']}></SEO>
            <ul>
                {tags.map(tag => (
                    <li key={tag} style={{ marginBottom: '10px'}}><Button color="primary" href={`/tag/${slugify(tag)}`}>
                    {tag} <Badge color="light">{tagsPostCount[tag]}</Badge>
                </Button>
                </li>        
            ))}
            </ul>
        </Layout>
    )
}
export default tagsPage