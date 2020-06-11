import React from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import { useDataContext } from '../store/context'
import { useFetch } from '../store/useFetch'
import { formatDate } from '../services/formatDate'

import Layout from '../components/Layout'
import Title from '../components/Title'
import Loading from '../components/Loading'

const Container = styled.div`
  margin-top: 30px;
  white-space: pre-line;

  & > * {
    margin-bottom: 20px;
  }
`
const Highlight = styled(Typography)`
  background-color: yellow;
`

function useQuery() {
  const history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  if (!params.get('speech') || !params.get('match')) {
    history.push('/data')
  }

  return params
}

const Data = () => {
  const { presidents, matches, loading } = useDataContext()
  const query = useQuery()
  const speechId = query.get('speech')
  const matchId = query.get('match')
  const speech = useFetch(`/speeches/${speechId}`)

  if (loading || !speech || !presidents) return <Loading />

  const president = presidents[speech.president_id]
  const match = matches[matchId]

  const split = speech.text.split(match.text)

  return (
    <Layout>
      <Title title="Speech" />
      <Container>
        <Typography variant="h4">{speech.title}</Typography>
        <Typography variant="h5">
          {president.name} - {formatDate(speech.date)}
        </Typography>
        <Typography>{split[0]}</Typography>
        <Highlight>{match.text}</Highlight>
        <Typography>{split[1]}</Typography>
      </Container>
    </Layout>
  )
}

export default Data
