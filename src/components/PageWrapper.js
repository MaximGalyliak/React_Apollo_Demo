import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import { changeThemeVar } from '../apollo/reactive-vars'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { DarkMode, LightMode } from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings'
import grey from '@mui/material/colors/grey'

import EditUserDialog from './EditUserDialog'

const PageWrapper = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  /**
   * useReactiveVar is a reusable hook that under the hood
   * combines useState and useEffect to track changes to reactive variable
   * and update the component.
   * returns current value of changeThemeVar
   */
  const useDarkTheme = useReactiveVar(changeThemeVar)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  /**
   * We set a new value of reactive var by calling changeThemeVar(newValue).
   */
  const changeTheme = () => {
    changeThemeVar(!useDarkTheme)
  }

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          backgroundColor: useDarkTheme ? grey[900] : grey[300],
          padding: '20px 10px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button component={RouterLink} to="/" variant="text">
          <Typography variant="h4">TimeBurner.com</Typography>
        </Button>
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            aria-label="change-theme"
            onClick={changeTheme}
            size="large"
            color="primary"
          >
            {useDarkTheme ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<SettingsIcon />}
          >
            Edit Profile
          </Button>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: 1280, margin: '20px auto' }}>
        {children}
      </Box>
      <EditUserDialog open={open} handleClose={handleClose} />
    </div>
  )
}

export default PageWrapper
