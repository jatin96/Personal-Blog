/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import Footer from './Footer'
import Header from "./header"
import '../styles/index.scss'
import Sidebar from "./Sidebar";
import {Row, Col} from 'reactstrap'


const Layout = ({authorImageFluid, children, pageTitle, postAuthor }) => (
  <StaticQuery
    query={graphql`query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `}
  render={data => (
   <>
    {/* <script src="https://kit.fontawesome.com/ed90065285.js" crossOrigin="anonymous"></script> */}
   <link
      rel="stylesheet"
      src="https://kit.fontawesome.com/ed90065285.js"
      crossOrigin="anonymous"
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container" id="content">
        <h1>{pageTitle}</h1>
        <Row>
          <Col md = "8">{children}</Col>
          <Col md = "4"><Sidebar author={postAuthor} authorFluid={authorImageFluid}/></Col>
        </Row>
      </div>
       <Footer/>
    </>
  )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
