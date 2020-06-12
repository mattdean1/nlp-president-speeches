import { useLocation, useHistory } from 'react-router-dom'

export const useQueryParams = (mandatoryParams, redirectPath) => {
  const history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const returnParams = {}
  mandatoryParams.forEach((param) => {
    const value = params.get(param)
    if (!value) history.push(redirectPath)
    returnParams[param] = value
  })

  return returnParams
}
