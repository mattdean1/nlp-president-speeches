import React, { useState, useEffect, createContext } from 'react'

const defaults = {
  speeches: {},
  presidents: {},
  matches: {},
  loading: false,
}
const DataContext = createContext(defaults)

const getData = async (path) => {
  const response = await fetch(`http://localhost:8000${path}`)
  return response.json()
}

const keyWithId = (array) =>
  array.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})

export const DataProvider = ({ children }) => {
  const [contextState, setContextState] = useState(defaults)

  const fetchProducts = async () => {
    setContextState({ ...contextState, loading: true })

    const speeches = await getData('/speeches')
    const presidents = await getData('/presidents')
    const matches = await getData('/matches')

    setContextState({
      speeches: keyWithId(speeches),
      presidents: keyWithId(presidents),
      matches: keyWithId(matches),
      loading: false,
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <DataContext.Provider value={contextState}>{children}</DataContext.Provider>
  )
}

export const useDataContext = () => {
  const context = React.useContext(DataContext)
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}
