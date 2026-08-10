import { Flex, IconProps, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { DataTestIDs } from 'shared/constants'
import styles from '../profile.module.scss'

export interface ProfileMenuItemProps {
  link: string
  title: string
  icon:
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
      >
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
  dataTestID?: DataTestIDs | ''
  handleClick?: () => void
}

export const ProfileMenuItem = ({
  link,
  title,
  icon: Icon,
  dataTestID = '',
  handleClick
}: ProfileMenuItemProps) => {
  return (
    <Link
      to={link}
      className={styles.dropDownLink}
      data-testid={dataTestID}
      onClick={handleClick}
    >
      <Flex
        align={'center'}
        gap={'2'}
        p={'2'}
      >
        <Icon
          color='var(--white)'
          width={'2.5rem'}
          height={'2.5rem'}
        />
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
