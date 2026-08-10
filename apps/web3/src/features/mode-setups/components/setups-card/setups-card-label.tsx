import { Flex } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { PlayArrowIcon } from 'shared/icons'
import { RadixText } from 'shared/ui'

export const SetupsCardLabel = () => {
  return (
    <Flex
      align={'center'}
      gap={'2'}
      width={'100%'}
      justify={'center'}
      mt={'5'}
      data-testid={DataTestIDs.buttonSelectOpenedSetup}
    >
      <PlayArrowIcon
        width={'1.2rem'}
        height={'2.3rem'}
      />
      <RadixText
        size={'3'}
        weight={'bold'}
      >
        SELECT SETUP
      </RadixText>
    </Flex>
  )
}
