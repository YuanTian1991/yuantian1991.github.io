import React from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Typography, Box, Paper } from '@material-ui/core';
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { classes, data } = this.props;

    return (
      < Layout >
        <SEO title="Note" />
        {
          data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <Link key={index} to={node.frontmatter.slug} style={{ textDecoration: "none", }}>
                <Paper key={index} elevation={0} className={classes.root}>
                  <Box my={1}>
                    {/* <Typography variant="h4" component="h1" style={{ fontWeight: "700" }} gutterBottom> */}
                    <h2>
                      {node.frontmatter.title} </h2>
                    {/* </Typography> */}

                    <Typography variant="body2" style={{ fontWeight: "100" }}>
                      {node.frontmatter.date}
                      {
                        node.frontmatter.tags.map((tag, tagIndex) => {
                          return (
                            <span key={tagIndex}>
                              {' | '}
                              <span
                              // className={classes.tag}
                              >{tag}</span>
                            </span>
                          )
                        })
                      }
                    </Typography>

                    <p>
                      {node.frontmatter.abstract}
                    </p>
                  </Box>
                </Paper>
              </Link>
            )
          })
        }
      </Layout >
    );
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    // minWidth: 275,
    padding: '2em',
    margin: '2em',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 0, 0, 0)',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      // backgroundColor: 'whitesmoke',
      "-webkit-transition": "background-color 500ms linear",
      "-ms-transition": "background-color 500ms linear",
      "transition": "background-color 500ms linear",
    }
  },
  tag: {
    fontFamily: "consolas",
    padding: '0.1em 0.5em',
    // border: '0.5px solid lightgrey',
    borderRadius: '0.1em',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: "lightgrey",
      // color: 'white',
      "-webkit-transition": "background-color 500ms linear",
      "-ms-transition": "background-color 500ms linear",
      "transition": "background-color 500ms linear",
    }
  }
});


export const pageQuery = graphql`
{
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
          tags
          abstract
        }
      }
    }
  }
}
`

export default (withStyles(styles)(IndexPage))
