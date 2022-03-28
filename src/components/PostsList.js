import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// gql
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../graqhql/queries'
// UI

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Alert from '@mui/material/Alert'

const PostsList = () => {
  const { error, data, loading } = useQuery(GET_POSTS)
  if (error)
    return (
      <Alert severity="error">
        Could not get posts, please try again later
      </Alert>
    )
  if (loading) return <Alert severity="info">Loading Posts...</Alert>
  if (data)
    return (
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper'
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {data.posts.data.map((post) => (
          <ListItem
            button
            component={RouterLink}
            to={`post/${post.id}`}
            key={post.id}
          >
            <ListItemText
              primary={post.title}
              secondary={post.body.substring(0, 30).concat('...')}
            />
          </ListItem>
        ))}
      </List>
    )
}

export default PostsList
