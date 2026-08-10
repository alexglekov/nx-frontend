import { FC, useCallback } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { notificationStateVar } from 'shared/store/notification'

interface Props {
  question: {
    text: string
  }
}
export const AnswerButtons: FC<Props> = ({ question }) => {
  const handleFeedbackClick = useCallback((isPositive: boolean) => {
    // TODO: send feedback and question to the server
    notificationStateVar({
      isOpen: true,
      title: 'Feedback',
      description:
        isPositive ?
          'Thank you for your feedback!'
          // NOTE: this is just a lie, we don't send feedback to the server
        : 'Thank you for your feedback! We will work on it.',
      type: isPositive ? 'success' : 'info'
    })
  }, [])

  return (
    <Flex
      width={'100%'}
      gap='4'
      mt='6'
      wrap={'wrap'}
    >
      <Button
        variant='outline'
        size='3'
        color='yellow'
        onClick={() => handleFeedbackClick(true)}
      >
        it solves my problem
      </Button>

      <Button
        variant='outline'
        size='3'
        color='pink'
        onClick={() => handleFeedbackClick(false)}
      >
        It doesn&apos;t solve my problem
      </Button>
    </Flex>
  )
}
