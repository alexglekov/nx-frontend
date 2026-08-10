import { Suspense } from 'react'
import { Head } from 'features/head'
import Help from 'features/help'

export const HelpPage: React.FC = () => {
  return (
    <>
      <Head title='Help' />
      <Suspense fallback={<p>Loading...</p>}>
        <Help />
      </Suspense>
    </>
  )
}
