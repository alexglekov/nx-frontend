import { useEffect } from 'react'

interface Props {
  title: string
}
export const Head: React.FC<Props> = ({ title }): null => {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}
