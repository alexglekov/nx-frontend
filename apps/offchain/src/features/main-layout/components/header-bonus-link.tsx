import { useReactiveVar } from '@apollo/client'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { BonusIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'
import styles from '../header.module.scss'

export const HeaderBonusLink: React.FC = () => {
  const user = useReactiveVar(userVar)

  if (!user) {
    return null
  }

  return (
    <Link
      to={RouterPathes.bonusAccountBonus}
      className={styles.headerBonusLink}
    >
      <BonusIcon
        width={'2.5rem'}
        height={'2.5rem'}
      />
    </Link>
  )
}
