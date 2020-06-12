import { useState, useEffect } from 'react'

export const useFetch = (path) => {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const doFetch = async () => {
      const res = await fetch(`http://localhost:5000${path}`)
      const json = await res.json()
      setResponse(json)
    }
    doFetch()
  }, [path])
  return response
}
