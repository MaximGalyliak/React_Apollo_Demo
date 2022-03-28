import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import grey from '@mui/material/colors/grey'

import EditUserDialog from './EditUserDialog'

const PageWrapper = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          backgroundColor: grey[700],
          padding: '20px 10px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h4">TimeBurner.com</Typography>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          startIcon={<SettingsIcon />}
        >
          Edit Profile
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: 1280, margin: '20px auto' }}>
        {children}
      </Box>
      <EditUserDialog open={open} handleClose={handleClose} />
    </div>
  )
}

export default PageWrapper
