import { IconButton } from '@radix-ui/themes'
import cn from 'classnames'
import { RefreshIcon } from 'shared/icons'
import { XyroLoading } from 'shared/ui'
import styles from '../rewards.module.scss'

interface Props {
  loading: boolean
  handleRefresh: () => void
}
export const TaskRefreshButton: React.FC<Props> = ({
  loading,
  handleRefresh
}) => {
  return (
    <IconButton
      className={cn(styles.refreshBtn, {
        [styles.refreshBtnLoading]: loading
      })}
      size={'1'}
      disabled={loading}
      color='gray'
      variant='soft'
      onClick={handleRefresh}
    >
      <XyroLoading
        loading={loading}
        iconSize='0'
      >
        <RefreshIcon
          width={'2rem'}
          height={'2rem'}
        />
      </XyroLoading>
    </IconButton>
  )
}
