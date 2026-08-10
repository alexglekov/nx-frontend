import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { CheckboxIcon } from '../../../shared/icons/about-page'
import { RoadmapItem } from '../types'
import styles from '../about.module.scss'

interface Props {
  items: RoadmapItem[]
}
const Roadmap: React.FC<Props> = ({ items }) => {
  return (
    <Flex
      className={styles.roadmapWrapper}
      direction={'column'}
      align={'center'}
    >
      <Heading
        size={{ initial: '8', lg: '9' }}
        as={'h2'}
        className={'color-white'}
        weight={'bold'}
      >
        XYRO Roadmap
      </Heading>

      <Box className={styles.roadmapLine} />

      <Flex
        direction={{ initial: 'column', lg: 'row' }}
        justify={{ initial: 'center', lg: 'between' }}
        gap={'5'}
        mx={'9'}
      >
        {items.map((item, index) => (
          <RoadmapSection
            key={index}
            item={item}
          />
        ))}
      </Flex>
    </Flex>
  )
}

interface RoadmapItemProps {
  item: RoadmapItem
}
const RoadmapSection: React.FC<RoadmapItemProps> = ({ item }) => {
  const { actions, quarter, circleIcon: Icon, checkboxColor } = item
  return (
    <Flex
      className={styles.roadmapSection}
      direction={'column'}
    >
      <Flex
        direction={{ initial: 'row', lg: 'column' }}
        gap={'3'}
      >
        <Text
          size={'6'}
          className={cn(styles.roadmapQuarter, 'color-white')}
        >
          {quarter}
        </Text>

        <Icon />
      </Flex>

      <Flex
        className={styles.roadmapActions}
        direction={'column'}
        gap={'5'}
        mt={'5'}
      >
        {actions.map((action, index) => (
          <Flex
            key={index}
            align={'center'}
            gap={'4'}
          >
            <Flex
              className={cn(styles.roadmapCheckbox, {
                [styles[`roadmapCheckbox${checkboxColor}`]]: checkboxColor
              })}
              align={'center'}
              justify={'center'}
            >
              {checkboxColor && (
                <CheckboxIcon
                  width={'3rem'}
                  height={'3rem'}
                />
              )}
            </Flex>

            <Text
              className={cn(styles.roadmapAction, 'color-gray-light')}
              size={'3'}
              weight={'regular'}
            >
              {action}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default Roadmap
