import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading = () => (
  <Container>
    <CircularProgress data-testid="loading-spinner" />
  </Container>
)

export default Loading
