/* eslint-disable max-lines */
import { Box, Flex, Heading, Text } from '@radix-ui/themes'

export const PrivacyPolicy = () => {
  return (
    <Box px='9'>
      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
        mb={'4'}
      >
        <Heading
          as='h1'
          size='8'
          mt='6'
        >
          Privacy Policy
        </Heading>

        <Text>Last updated: 30 June 2025</Text>
      </Flex>
      XYRO GAMING LIMITADA (“we,” “us,” “our”) respects your privacy and is
      committed to safeguarding your personal data. This policy explains how we
      collect, use, store, and protect your information.
      <Heading
        as='h2'
        mt='5'
        mb='4'
        size='7'
      >
        Information We Collect
      </Heading>
      When you register and use our services, we collect personal details such
      as your full name, email address, country of residence, and contact
      information. We also log transaction details, game activity, IP address,
      device type, and other technical data.
      <Heading
        as='h2'
        mt='4'
        mb='3'
        size='5'
      >
        Use of Data
      </Heading>
      Your data is used for:
      <ul>
        <li>Account creation and management</li>

        <li>Cryptocurrency transaction processing</li>

        <li>Customer support services</li>

        <li>Personalized promotions (where opted in)</li>

        <li>Internal security checks and fraud prevention</li>

        <li>Service optimization and analytics</li>
      </ul>
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Data Sharing
      </Heading>
      Your data will not be sold or disclosed to unrelated third parties. It may
      be shared with payment providers, platform infrastructure services, or
      legal authorities if required by applicable law or for operational
      purposes.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Data Security
      </Heading>
      All personal data is securely stored and protected through encryption and
      restricted access protocols. Only authorized personnel may access
      sensitive data.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        User Rights
      </Heading>
      You have the right to request access, correction, or deletion of your
      personal data at any time. Contact our support team to exercise these
      rights.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Cookies
      </Heading>
      We use cookies and similar technologies to improve your experience, store
      preferences, and collect anonymized usage analytics.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Privacy Policy Updates
      </Heading>
      We may amend this Privacy Policy at our discretion. Updates will be
      published on the platform, and continued use implies acceptance of the
      revised policy.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        © 2025{' '}
        <a
          href='https://xyro.io'
          target='_blank'
          rel='noreferrer'
        >
          xyro.io
        </a>
      </Heading>
      [XYRO] is owned and operated by XYRO GAMING LIMITADA located at
      Puntarenas, Garabito, Jaco, Pastor Diaz Avenue, east side of the Garabito
      Municipality, Sanchez Chavarría Law Firm, Costa Rica.
    </Box>
  )
}
