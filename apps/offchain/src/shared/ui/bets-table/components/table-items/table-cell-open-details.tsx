import { Table, Flex, Button } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import styles from '../../table.module.scss'

export const OpenDetailsCell = ({
  onClick,
  dataTestID = '',
  title
}: {
  onClick?: () => void
  dataTestID?: DataTestIDs | ''
  title: string
}) => {
  return (
    <Table.Cell className={styles.detailsCell}>
      <Flex
        className={styles.detailsCellContainer}
        align={'center'}
        height={'100%'}
      >
        <Button
          variant='ghost'
          onClick={onClick}
          m={'0'}
          mt={'-3'}
          data-testid={dataTestID}
        >
          {title}
        </Button>
      </Flex>
    </Table.Cell>
  )
}
