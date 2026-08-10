/* eslint-disable max-lines */
import { Box, Flex, Heading, Text } from '@radix-ui/themes'

export const TermsAndConditions = () => {
  return (
    <Box px='9'>
      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
      >
        <Heading
          as='h1'
          size='8'
          my='6'
        >
          Terms & Conditions
        </Heading>

        <Text>Last updated: 30 June 2025</Text>
      </Flex>
      <Flex
        direction={'column'}
        gap={'3'}
      >
        <Text>
          Welcome to XYRO, an online entertainment platform operated by XYRO
          GAMING LIMITADA, located at Puntarenas, Garabito, Jaco, Pastor Diaz
          Avenue, east side of the Garabito Municipality, Sanchez Chavarría Law
          Firm, Costa Rica. By accessing and using our services, you agree to be
          bound by these Terms and Conditions. Please review them carefully
          before proceeding.
        </Text>
        <Text>
          This platform is intended for players aged 18 and above, or of legal
          gambling age in their country of residence, whichever is greater. It
          is the user&apos;s sole responsibility to ensure that accessing and
          using our services complies with local laws. XYRO GAMING LIMITADA does
          not verify the legal status of online gaming activities in the
          player’s country or region.
        </Text>
        <Text>
          By registering an account, you confirm that the information provided
          is accurate and current. You are fully responsible for maintaining the
          security and confidentiality of your account credentials and for all
          activity conducted through your account.
        </Text>
      </Flex>
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Cryptocurrency Transactions
      </Heading>
      All financial operations are conducted exclusively in cryptocurrencies.
      Accepted assets include USDT (TRC20 / ERC20), Ethereum (ETH), and Bitcoin
      (BTC). Transaction limits and availability are detailed within the
      platform’s cashier interface. Withdrawal processing times depend on
      blockchain network confirmations.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Bonuses and Promotions
      </Heading>
      Promotions may include deposit bonuses, cashback offers, free spins, and
      other incentives. Each offer is subject to specific terms such as wagering
      requirements, bonus expiration dates, and applicable game restrictions.
      Abuse of bonuses may result in suspension, account closure, or forfeiture
      of funds.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Responsible Gaming
      </Heading>
      We support responsible gaming practices and offer tools such as deposit
      limits, play time reminders, voluntary account suspensions, and permanent
      self-exclusion upon request.
      <Heading
        as='h2'
        mt='4'
        mb='3'
        size='5'
      >
        Prohibited Conduct
      </Heading>
      Cheating, system abuse, automated bots, or exploitation of technical
      vulnerabilities are strictly prohibited. Accounts involved in such
      activities will be terminated without prior notice and remaining funds may
      be withheld.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Limitation of Liability
      </Heading>
      XYRO GAMING LIMITADA provides services on an “as-is” basis and disclaims
      any liability for interruptions, system errors, unauthorized account
      access, or other unforeseen circumstances affecting user access or
      experience.
      <Heading
        as='h3'
        mt='4'
        mb='3'
        size='5'
      >
        Terms Modifications
      </Heading>
      We reserve the right to modify these Terms & Conditions at any time.
      Continued use of the platform following updates constitutes your
      acceptance of the revised terms.
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
