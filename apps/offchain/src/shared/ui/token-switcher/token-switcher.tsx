import { Box, Flex } from '@radix-ui/themes'
import classNames from 'classnames'
import { SwapXyroToken, TetherAssetIcon } from 'shared/icons'
import styles from './token-switcher.module.scss'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const TokenSwitcher: React.FC<Props> = ({ checked, onChange }) => (
  <Flex
    align={'center'}
    gap={'2'}
  >
    <TetherAssetIcon
      className={classNames({
        [styles.tokenUnchecked]: checked
      })}
      width={'3rem'}
      height={'3rem'}
    />

    <label className={styles.element}>
      {/* NOTE: We hide this input, just for focus on this switch */}
      <input
        type='checkbox'
        className={styles.input}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />

      <Box
        className={classNames(styles.block, {
          [styles.blockChecked]: checked
        })}
      >
        <Box
          className={classNames(styles.switcher, {
            [styles.switcherChecked]: checked
          })}
        />
      </Box>
    </label>

    <SwapXyroToken
      className={classNames({ [styles.tokenUnchecked]: !checked })}
      width={'3rem'}
      height={'3rem'}
    />
  </Flex>
)
