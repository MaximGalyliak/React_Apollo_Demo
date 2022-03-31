import React from 'react'
// gql
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graqhql/queries'
// UI
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const UserCard = () => {
  /**
   * since reactive variable is a part of cache local field currentUser
   * on Query type we can read it with useQuery hook by passing
   * graph query that utilize @client directive
   * see src/graphql/queries/GET_CURRENT_USER
   * any changes to reactive var will cause subscribed components to rerun
   */
  const { data, loading, error } = useQuery(GET_CURRENT_USER)

  if (error) return <Alert severity="error">Could not get user</Alert>

  if (loading) return <Alert severity="info">Loading User...</Alert>

  if (data) {
    const { currentUser } = data
    return (
      <Card sx={{ width: '100%' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="160"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/160px-Anonymous_emblem.svg.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentUser.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">New Post</Button>
        </CardActions>
      </Card>
    )
  }
}

export default UserCard
