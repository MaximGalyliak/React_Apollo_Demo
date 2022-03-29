import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../graqhql/queries'
import Grid from '@mui/material/Grid'
import { Typography, Paper } from '@mui/material'
import CommentsList from '../components/CommentsList'

const Post = () => {
  const { id } = useParams()

  const { data: postData } = useQuery(GET_POST_BY_ID, {
    variables: { id }
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2} />
      <Grid item xs={6} md={8}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          {postData && (
            <>
              <Typography variant="h2">{postData.post.title}</Typography>
              <Typography variant="p">{postData.post.body}</Typography>
            </>
          )}
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5">Comments:</Typography>
          <CommentsList postId={id} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Post
