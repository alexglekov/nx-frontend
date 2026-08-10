import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Heading, Text, TextArea } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { XyroLoading } from 'shared/ui'
import { MAX_SYMBOLS_CHANGE_BIO_INPUT_VALUE } from '../constants'
import { useUserBio } from '../hooks/use-user-bio'
import styles from '../user-settings.module.scss'

export const ChangeBioModalForm = () => {
  const user = useReactiveVar(userVar)

  const modalAimText = user?.bio ? 'Change bio' : 'Add bio'

  const { bio, loading, isBioTextAreaFull, handleBIOChange, handleSubmit } =
    useUserBio()

  return (
    <RadixForm.Root onSubmit={handleSubmit}>
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        position={'relative'}
      >
        <Heading
          size={'7'}
          weight={'medium'}
          mb={'3'}
          className={'color-white'}
        >
          {modalAimText}
        </Heading>

        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
          mt={'6'}
          px={'1'}
        >
          <Text
            size={{ initial: '4', sm: '2' }}
            className={styles.enterBioTitle}
            weight={'regular'}
          >
            Enter your bio
          </Text>

          <Text
            size={{ initial: '4', sm: '2' }}
            className={isBioTextAreaFull ? 'color-pink' : 'color-gray'}
            weight={'regular'}
          >
            {bio.length}/{MAX_SYMBOLS_CHANGE_BIO_INPUT_VALUE}
          </Text>
        </Flex>

        <TextArea
          mt={'2'}
          mb={'6'}
          placeholder='Tell us a little bit about yourself'
          className={styles.bioArea}
          value={bio}
          onChange={handleBIOChange}
          data-testid={DataTestIDs.userSettingsChangeBioInput}
        />

        <Flex
          direction={'column'}
          gap={'1'}
          width={'100%'}
        >
          <Button
            className={styles.submitBtn}
            type='submit'
            disabled={bio === user?.bio || loading}
            data-testid={DataTestIDs.buttonUserSettingsChangeBioSave}
          >
            <XyroLoading
              loading={loading}
              iconSize='0'
              variant='dark'
            >
              <Text
                className={styles.submitBtnText}
                size={'2'}
              >
                SAVE BIO
              </Text>
            </XyroLoading>
          </Button>
        </Flex>
      </Flex>
    </RadixForm.Root>
  )
}
