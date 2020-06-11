import React from 'react'
import styled from 'styled-components'

import { useDataContext } from '../store/context'

import Layout from '../components/Layout'
import Title from '../components/Title'
import Loading from '../components/Loading'

const Dashboard = () => {
  const { speeches, presidents, matches, loading } = useDataContext()

  if (loading) return <Loading />

  return (
    <Layout>
      <Title title="Dashboard" />
    </Layout>
  )
}

export default Dashboard
