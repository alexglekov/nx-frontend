import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { notFoundBackgroundMobile } from 'shared/images'
import { Head } from '../head'
import styles from './not-found.module.scss'

export const NotFound = () => (
  <>
    <Head title='Page Not Found' />

    <Flex
      className={styles.container}
      width={'100%'}
      direction={'column'}
      justify={{ initial: 'center', sm: 'start' }}
    >
      <Flex
        direction={'column'}
        gap={'8'}
        align={{ initial: 'center', sm: 'start' }}
      >
        <Flex
          direction={'column'}
          gap={'5'}
          align={{ initial: 'center', sm: 'start' }}
        >
          <Text
            className={cn(styles.title, 'color-white')}
            weight={'bold'}
          >
            Page Not Found
          </Text>

          <Text
            className={cn(styles.description, 'color-white')}
            size={'2'}
            weight={'medium'}
          >
            Sorry, the page you&apos;re looking for doesn&apos;t exists
          </Text>
        </Flex>

        <Link
          className={styles.link}
          to={RouterPathes.home}
        >
          <Text
            size={'2'}
            className={'color-black'}
            weight={'bold'}
          >
            GO TO MAIN PAGE
          </Text>
        </Link>
      </Flex>

      <img
        className={styles.backgroundMobile}
        src={notFoundBackgroundMobile}
        alt={'Not found background'}
      />
    </Flex>
  </>
)
