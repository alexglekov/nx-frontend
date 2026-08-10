import { Button } from '@radix-ui/themes'
import {
  GameCrownIcon,
  GameFullscreenIcon,
  GameLikeIcon,
  GamePromotionIcon
} from 'shared/icons'
import { XyroButton } from 'shared/ui'
import { ToolButtonType } from '../types'
import styles from '../game.module.scss'

interface Props {
  type: ToolButtonType
  onClick: () => void
  isActive?: boolean
}

export const GameToolButton: React.FC<Props> = ({
  onClick,
  isActive,
  type
}) => {
  return (
    <Button
      onClick={onClick}
      className={styles.gameToolButton}
      variant='ghost'
    >
      <GameToolIcon
        type={type}
        isActive={isActive}
      />
    </Button>
  )
}

interface GameToolIconProps {
  type: ToolButtonType
  isActive?: boolean
  className?: string
}

const GameToolIcon: React.FC<GameToolIconProps> = ({ type, isActive }) => {
  const color = isActive ? 'var(--white)' : 'var(--c-gray-40)'

  if (type === 'fullscreen') {
    return <GameFullscreenIcon color={color} />
  }

  if (type === 'favorite') {
    return <GameLikeIcon color={color} />
  }

  if (type === 'promotion') {
    return <GamePromotionIcon color={color} />
  }

  if (type === 'crown') {
    return <GameCrownIcon color={color} />
  }
}
