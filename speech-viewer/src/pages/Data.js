import React from 'react'
import MUIDataTable from 'mui-datatables'
import styled from 'styled-components'

import { useDataContext } from '../store/context'
import { formatDate } from '../services/formatDate'

import Layout from '../components/Layout'
import Title from '../components/Title'
import Loading from '../components/Loading'

const Container = styled.div`
  margin-top: 30px;
`

const Data = () => {
  const { speeches, presidents, matches, loading } = useDataContext()

  if (loading) return <Loading />

  const columns = [
    { name: 'president', label: 'President' },
    { name: 'speech', label: 'Speech' },
    {
      name: 'date',
      label: 'Date',
      options: {
        customBodyRender: (date) => formatDate(date),
      },
    },
    { name: 'match', label: 'Match', options: { sort: false, filter: false } },
  ]
  const data = Object.values(matches || {}).map((match) => {
    const speech = speeches[match.speech_id]
    const president = presidents[speech.president_id]
    return [president.name, speech.title, speech.date, match.text]
  })

  return (
    <Layout>
      <Title title="Data" />
      <Container>
        <MUIDataTable
          title="Presidents addressing environmental issues"
          data={data}
          columns={columns}
        />
      </Container>
    </Layout>
  )
}

export default Data
