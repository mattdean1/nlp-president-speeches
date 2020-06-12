import React from 'react'
import { render, getNodeText, screen, waitFor } from '@testing-library/react'

import { useDataContext, DataProvider } from './context'
import { mockPath } from '../test/mockPath'

const TestConsumer = () => {
  const { speeches, presidents, matches, loading } = useDataContext()

  if (loading) return <div data-testid="loading" />

  return (
    <>
      <div data-testid="speeches">{JSON.stringify(speeches)}</div>
      <div data-testid="presidents">{JSON.stringify(presidents)}</div>
      <div data-testid="matches">{JSON.stringify(matches)}</div>
    </>
  )
}

const getRenderedValue = (elem) => JSON.parse(getNodeText(elem))

describe('productContext', () => {
  it('returns product information', async () => {
    mockPath('/speeches', [{ id: 1, data: 'speeches' }])
    mockPath('/presidents', [{ id: 2, data: 'presidents' }])
    mockPath('/matches', [{ id: 3, data: 'matches' }])

    render(
      <DataProvider>
        <TestConsumer />
      </DataProvider>
    )

    expect(screen.getByTestId('loading')).not.toBeNull()
    await waitFor(() => {
      const elem = screen.getByTestId('speeches')
      const value = getRenderedValue(elem)
      expect(value).toEqual({ '1': { id: 1, data: 'speeches' } })
    })
    await waitFor(() => {
      const elem = screen.getByTestId('presidents')
      const value = getRenderedValue(elem)
      expect(value).toEqual({ '2': { id: 2, data: 'presidents' } })
    })
    await waitFor(() => {
      const elem = screen.getByTestId('matches')
      const value = getRenderedValue(elem)
      expect(value).toEqual({ '3': { id: 3, data: 'matches' } })
    })
  })
})
