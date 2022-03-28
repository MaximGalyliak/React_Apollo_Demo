import React from 'react'

import { useReactiveVar } from '@apollo/client'
import { currentUserVar } from '../apollo/reactive-vars'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const EditUserDialog = ({ open, handleClose }) => {
  // this hook reads reactive variable and automatically calls rerender on update
  const currentUser = useReactiveVar(currentUserVar)

  const handleChange = (event) => {
    const { id, value } = event.target
    currentUserVar({ ...currentUser, [id]: value })
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here you can edit your profile information.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          fullWidth
          variant="standard"
          value={currentUser.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          value={currentUser.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={currentUser.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserDialog
