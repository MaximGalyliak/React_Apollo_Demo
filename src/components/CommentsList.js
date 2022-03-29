import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_SELECTED_COMMENT } from '../graqhql/mutations'
import { GET_COMMENTS_BY_POST_ID } from '../graqhql/queries'
import { selectedCommentsVar } from '../apollo/reactive-vars'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Button, ListItemText } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { Alert } from '@mui/material'

const CommentsList = ({ postId }) => {
  const {
    data: commentsData,
    error,
    loading
  } = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { id: postId }
  })

  const [removeComment] = useMutation(DELETE_SELECTED_COMMENT, {
    refetchQueries: [GET_COMMENTS_BY_POST_ID]
  })

  const handleToggle = (commentId) => () => {
    const isSelected = selectedCommentsVar().find((id) => id === commentId)
    if (isSelected) {
      selectedCommentsVar(
        selectedCommentsVar().filter((id) => id !== commentId)
      )
    } else {
      selectedCommentsVar(selectedCommentsVar().concat(commentId))
    }
  }

  const handleRemoveSelected = () => {
    selectedCommentsVar().forEach((commentId) => {
      removeComment({ variables: { id: commentId } })
    })
  }

  if (loading) return <Alert severity="info">Loading comments..</Alert>

  if (error) return <Alert severity="error">Error loading commnets...</Alert>

  if (commentsData)
    return (
      <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {commentsData.post.comments.data.map((comment) => {
            const labelId = `checkbox-list-label-${comment}`

            return (
              <ListItem key={comment.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(comment.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={comment.isSelected}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={comment.email}
                    secondary={comment.body}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Button onClick={handleRemoveSelected}>Remove Selected</Button>
      </>
    )
}

export default CommentsList
