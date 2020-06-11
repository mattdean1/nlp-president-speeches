import React from 'react'
import styled from 'styled-components'

import { useDataContext } from '../store/context'

import Layout from '../components/Layout'
import Loading from '../components/Loading'
import PresidentChart from '../components/PresidentChart'
import YearChart from '../components/YearChart'

const Dashboard = () => {
  const { speeches, presidents, matches, loading } = useDataContext()

  if (loading || !presidents) return <Loading />

  return (
    <Layout>
      <PresidentChart
        speeches={speeches}
        presidents={presidents}
        matches={matches}
      />
      <YearChart speeches={speeches} matches={matches} />
    </Layout>
  )
}

export default Dashboard
