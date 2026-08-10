import { Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { DataTestIDs } from 'shared/constants'
import styles from '../profile.module.scss'

export interface ProfileMenuItemProps {
  link: string
  title: string
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  dataTestID?: DataTestIDs | ''
}

export const ProfileMenuItem = ({
  link,
  title,
  icon: Icon,
  dataTestID = ''
}: ProfileMenuItemProps) => {
  return (
    <Link
      to={link}
      className={styles.dropDownLink}
      data-testid={dataTestID}
    >
      <Flex
        align={'center'}
        gap={'2'}
        p={'2'}
      >
        <Icon color='var(--white)' />
        <Text
          className='color-white'
          size={'2'}
        >
          {title}
        </Text>
      </Flex>
    </Link>
  )
}
