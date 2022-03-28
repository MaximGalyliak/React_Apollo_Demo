import React from 'react'
// UI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
// Custom
import UserCard from '../components/UserCard'
import FriendsList from '../components/FriendsList'
import PostsList from '../components/PostsList'

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <UserCard />
      </Grid>

      <Grid item xs={6} md={6}>
        <Box sx={{ display: 'flex' }}>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">Recent Posts</Typography>
            <PostsList />
          </Box>
          <Divider orientation="vertical" flexItem />
        </Box>
      </Grid>

      <Grid item xs={6} md={3}>
        <Typography variant="h4">Your friends</Typography>
        <FriendsList />
      </Grid>
    </Grid>
  )
}

export default Home
