import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 30px;
`

const Layout = ({ children }) => <Container>{children}</Container>

export default Layout
