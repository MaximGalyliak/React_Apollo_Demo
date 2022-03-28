import React from 'react'
// gql
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../graqhql/queries'

// UI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

const FriendsList = () => {
  const { error, data, loading } = useQuery(GET_USERS)

  if (error)
    return (
      <Alert severity="error">
        Could not get posts, please try again later
      </Alert>
    )
  if (loading) return <Alert severity="info">Loading Friends List...</Alert>
  if (data)
    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data.users.data.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://via.placeholder.com/150/92c952"
                />
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={user.email} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    )
}

export default FriendsList
