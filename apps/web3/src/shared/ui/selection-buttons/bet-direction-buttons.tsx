import { FC } from 'react'
import { BetDirectionType } from 'shared/types'
import { DIRECTION_OPTIONS } from './constants'
import { SelectionButtons } from './selection-buttons'
import styles from './selection-buttons.module.scss'

interface Props {
  fieldName: string
  onChange?: (value: string | number) => void
  defaultFieldValue?: BetDirectionType
}
export const BetDirectionButtons: FC<Props> = ({
  onChange,
  fieldName,
  defaultFieldValue
}) => {
  return (
    <SelectionButtons
      /** NOTE: there is an appearance logic in the scss file */
      className={styles.betDirectionButtons}
      onChange={onChange}
      defaultFieldValue={defaultFieldValue}
      name={fieldName}
      options={DIRECTION_OPTIONS}
      appearance='xyro'
    />
  )
}
