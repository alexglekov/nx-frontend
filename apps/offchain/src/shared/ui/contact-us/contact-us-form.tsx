import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Select, TextArea, TextField } from '@radix-ui/themes'

export const ContactUsForm = () => {
  return (
    <RadixForm.Root>
      <RadixForm.Field name={'name'}>
        <Flex>
          <RadixForm.Label>Name</RadixForm.Label>

          <RadixForm.Message match='valueMissing'>
            Please enter your name
          </RadixForm.Message>
          <RadixForm.Message match='typeMismatch'>
            Please provide a valid name
          </RadixForm.Message>
        </Flex>

        {/* <RadixForm.Control asChild> */}
        <TextField.Root
          name={'name'}
          type='text'
          radius='full'
          placeholder={''}
          required
        />
        {/* </RadixForm.Control> */}
      </RadixForm.Field>

      <RadixForm.Field name={'name'}>
        <Flex>
          <RadixForm.Label>Name</RadixForm.Label>

          <RadixForm.Message match='valueMissing'>
            Please enter your name
          </RadixForm.Message>
          <RadixForm.Message match='typeMismatch'>
            Please provide a valid name
          </RadixForm.Message>
        </Flex>

        <Select.Root name='topic'>
          <Select.Trigger />
          <Select.Content>
            <Select.Item
              value='1'
              key={1}
            >
              Item 1
            </Select.Item>
            <Select.Item
              value='2'
              key={2}
            >
              Item 1
            </Select.Item>
            <Select.Item
              value='3'
              key={3}
            >
              Item 1
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </RadixForm.Field>

      <RadixForm.Field name={'name'}>
        <Flex>
          <RadixForm.Label>Name</RadixForm.Label>

          <RadixForm.Message match='valueMissing'>
            Please enter your name
          </RadixForm.Message>
          <RadixForm.Message match='typeMismatch'>
            Please provide a valid name
          </RadixForm.Message>
        </Flex>

        <TextArea
          name={'name'}
          placeholder={''}
          required
        />
      </RadixForm.Field>

      <RadixForm.Field name={'name'}>
        <RadixForm.Control
          type='file'
          // asChild
        >
          {/* <Button type='button'>Attach your file</Button> */}
        </RadixForm.Control>
      </RadixForm.Field>

      <RadixForm.FormSubmit asChild>
        <Button
          size={'4'}
          color='yellow'
          highContrast
        >
          SEND
        </Button>
      </RadixForm.FormSubmit>
    </RadixForm.Root>
  )
}
