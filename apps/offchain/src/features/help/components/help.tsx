import { useCallback, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { Card, Flex, Text } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { BannerSlider, ContactUs } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { QUESTIONS } from '../constanst'
import { AnswerButtons } from './answer-buttons'
import { AnswerLines } from './answer-line'
import styles from '../help.module.scss'

export const Help = () => {
  const [value, setValue] = useState<string>()
  const handleValueChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const [isMobile] = useResponsive('xs')

  return (
    <>
      <BannerSlider
        banners={['help']}
        withButton={false}
        isClosedDefault={true}
      />

      <Card size='4'>
        <DotTitle
          size={isMobile ? '2' : '3'}
          color='gray'
        >
          Here’s a few answers to our most common questions:
        </DotTitle>

        <Accordion.Root
          className={styles.helpAccordion}
          type='single'
          collapsible
          onValueChange={handleValueChange}
        >
          {QUESTIONS.map(q => (
            <Accordion.Item
              className={styles.helpItem}
              value={q.text}
              key={q.text}
            >
              <Accordion.Header
                className={styles.helpHeader}
                asChild
              >
                <Flex
                  justify={'between'}
                  gap={'4'}
                >
                  <Accordion.Trigger className={styles.helpItemTrigger}>
                    <Text
                      align={{ initial: 'left', sm: 'center' }}
                      size={{ initial: '4', sm: '7' }}
                      className='color-white'
                    >
                      {q.text}
                    </Text>
                    {value === q.text ?
                      <MinusIcon
                        className={styles.icon}
                        aria-hidden
                      />
                    : <PlusIcon
                        className={styles.icon}
                        aria-hidden
                      />
                    }
                  </Accordion.Trigger>
                </Flex>
              </Accordion.Header>

              <Accordion.Content className={styles.helpContent}>
                <AnswerLines answer={q.answer} />
                <AnswerButtons question={q} />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Card>

      <ContactUs />
    </>
  )
}
