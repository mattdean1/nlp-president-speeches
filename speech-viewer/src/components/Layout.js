import React from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'

const Container = styled.div`
  margin: 30px;
`

const Layout = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  return (
    <>
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          history.push(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Dashboard"
          value="/"
          icon={<EqualizerIcon />}
        />
        <BottomNavigationAction
          label="Data"
          value="/data"
          icon={<FormatAlignLeftIcon />}
        />
      </BottomNavigation>
      <Container>{children}</Container>
    </>
  )
}

export default Layout
