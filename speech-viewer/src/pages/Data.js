import React from 'react'
import MUIDataTable from 'mui-datatables'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { useDataContext } from '../store/context'
import { formatDate } from '../services/formatDate'

import Layout from '../components/Layout'
import Title from '../components/Title'
import Loading from '../components/Loading'

const Container = styled.div`
  margin-top: 30px;
`

const Data = () => {
  const history = useHistory()
  const { speeches, presidents, matches, loading } = useDataContext()

  if (loading) return <Loading />

  const columns = [
    { name: 'president', label: 'President' },
    {
      name: 'speech',
      label: 'Speech',
      options: {
        customBodyRender: (speechId) => speeches[speechId].title,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        customBodyRender: (date) => formatDate(date),
      },
    },
    {
      name: 'match',
      label: 'Match',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (matchId) => matches[matchId].text,
      },
    },
  ]

  const data = Object.values(matches || {}).map((match) => {
    const speech = speeches[match.speech_id]
    const president = presidents[speech.president_id]
    return [president.name, speech.id, speech.date, match.id]
  })

  const handleRowClick = (_, { dataIndex }) => {
    const row = data[dataIndex]
    const speechId = row[1]
    const matchId = row[3]
    history.push(`/speech?speech=${speechId}&match=${matchId}`)
  }

  const options = { onRowClick: handleRowClick }

  return (
    <Layout>
      <Title title="Data" />
      <Container>
        <MUIDataTable
          title="Presidents addressing environmental issues"
          data={data}
          columns={columns}
          options={options}
        />
      </Container>
    </Layout>
  )
}

export default Data
