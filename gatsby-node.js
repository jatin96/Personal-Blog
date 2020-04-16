/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { slugify } = require('./src/utility/utilityFunction');
const path = require('path')
const authors = require('./src/templates/authors')
const  _ = require('lodash')
exports.onCreateNode = ({node, actions}) => {
    const {createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle,
        })
    }
}
exports.createPages = ({actions, graphql}) => {
    const {createPage } = actions;
    const singlePostTemplate = path.resolve('src/templates/single-post.js')
    const templates = {
        singlePost: path.resolve('src/templates/single-post.js'),
        tagsPage: path.resolve('src/templates/tags-page.js')
    }
    return graphql(`
        {
            allMarkdownRemark{
                edges{
                    node{
                        frontmatter{
                            author
                            tags
                        }
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `).then(res => {
        if(res.errors) return Promise.reject(res.errors)

        const posts = res.data.allMarkdownRemark.edges

        posts.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: templates.singlePost, 
                context: {
                    slug: node.fields.slug,
                    imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
                }
            })
        })
        let tags = []
        _.each(posts, edge => {
            if(_.get(edge, 'node.frontmatter.tags')) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        let tagsPostCount = {}
        tags.forEach(tag => {
            tagsPostCount[tag] = (tagsPostCount[tag] || 0) + 1;
        })
        tags = _.uniq(tags);
        console.log(tags)
        console.log(tagsPostCount)

        createPage({
            path: '/tags',
            component: templates.tagsPage,
            context: {
                tags,
                tagsPostCount
            }
        })
    })
}


