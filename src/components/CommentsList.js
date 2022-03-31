import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_SELECTED_COMMENT } from '../graqhql/mutations'
import { GET_COMMENTS_BY_POST_ID } from '../graqhql/queries'
import { manageSelectedCommentsVar } from '../apollo/reactive-vars'
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

  const {
    clearAllSelection,
    toggleSelectedItem,
    removeSelectedItem,
    getCurrentSelection
  } = manageSelectedCommentsVar()
  /**
   * clean up reactive var so selected comments do not persist
   * between pages
   */
  React.useEffect(() => clearAllSelection(), [])

  const handleToggle = (commentId, isSelected) => {
    toggleSelectedItem(commentId, isSelected)
  }
  /**
   * Because there is no mutation that would remove multiple
   * comments by array of id's, we have to call a new mutation
   * for each separate comment.
   * removeComment is a function that is provided by useMutation hook
   * this function accepts options object - https://www.apollographql.com/docs/react/api/react/hooks/#options-2
   * which has onCompleted callback that is used to remove item id from reactive
   * variable
   */
  const handleRemoveSelected = () => {
    getCurrentSelection().forEach((id) => {
      removeComment({
        variables: { id },
        onCompleted: () => removeSelectedItem(id)
      })
    })
  }

  if (loading) return <Alert severity="info">Loading comments..</Alert>

  if (error) return <Alert severity="error">Error loading comments...</Alert>

  if (commentsData)
    return (
      <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {commentsData.post.comments.data.map((comment) => {
            const labelId = `checkbox-list-label-${comment.id}`

            return (
              <ListItem key={comment.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggle(comment.id, comment.isSelected)}
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
