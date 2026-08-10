import { useNavigate, useLocation } from 'react-router-dom'

export const useCleanQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const cleanQueryParams = () => {
    navigate(
      {
        pathname: location.pathname,
        search: ''
      },
      { replace: true }
    )
  }

  return { cleanQueryParams }
}
