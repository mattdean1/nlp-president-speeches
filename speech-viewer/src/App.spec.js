import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'

import App from './App'
import { mockPath } from './test/mockPath'

describe('App', () => {
  it('renders the dashboard page', async () => {
    mockPath('/speeches', [])
    mockPath('/presidents', [])
    mockPath('/matches', [])

    render(<App />)

    expect(screen.getByTestId('loading-spinner')).not.toBeNull()
    await waitFor(() => expect(screen.getByText('Dashboard')).not.toBeNull())
  })
})
