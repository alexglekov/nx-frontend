import { Badge, Flex, Text } from '@radix-ui/themes'
import { DownIcon, UpIcon } from 'shared/icons'

interface Props {
  isLong: boolean
}

export const SetupsCardHeaderDirectionBadge: React.FC<Props> = ({ isLong }) => {
  const directionIcon = isLong ? (
    <UpIcon
      width={'2rem'}
      height={'2rem'}
      color='var(--c-black)'
    />
  ) : (
    <DownIcon
      width={'2rem'}
      height={'2rem'}
      color='var(--c-black)'
    />
  )

  return (
    <Badge
      size={'1'}
      radius='large'
      color={isLong ? 'green' : 'pink'}
      style={{
        backgroundColor: isLong ? 'var(--green)' : 'var(--pink)',
        borderRadius: '1rem',
        padding: '0.6rem 1rem 0.6rem 1rem'
      }}
    >
      <Flex
        width={'100%'}
        align={'center'}
        justify={'center'}
        gap={'1'}
      >
        {directionIcon}
        <Text style={{ color: 'var(--c-black)' }}>
          {isLong ? 'long' : 'short'}
        </Text>
      </Flex>
    </Badge>
  )
}
