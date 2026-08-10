import { Head } from 'features/head'
import { NotFound } from '../features/not-found/not-found'

export const NotFoundPage = () => (
  <>
    <Head title='404: Not found' />
    <NotFound />
  </>
)
