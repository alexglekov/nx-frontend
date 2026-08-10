/* eslint-disable max-lines */
import { Suspense } from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Head } from 'features/head'

// NOTE: copied from rollbit
// TODO: replace content with the original AML
export const AmlPolicyPage: React.FC = () => {
  return (
    <>
      <Head title='AML / KYC Policy — XYRO' />
      <Suspense fallback={<p>Loading...</p>}>
        <Flex
          p={'6'}
          direction={'column'}
          gap={'3'}
          className='about-us-container'
          style={{ fontSize: '1.5em' }}
        >
          <Flex
            align={'center'}
            justify={'between'}
          >
            <Heading
              as='h1'
              size='8'
              mt='6'
            >
              AML / KYC Policy — XYRO
            </Heading>

            <Text>Last updated: 30 June 2025</Text>
          </Flex>

          <Text size={'2'}>
            XYRO GAMING LIMITADA (referred to as “we,” “us,” “our,” or “the
            platform”) is committed to preventing any activity that facilitates
            money laundering, terrorism financing, or other forms of financial
            crime. This Anti-Money Laundering (AML) and Know Your Customer (KYC)
            Policy outlines the principles and procedures we follow to detect,
            prevent, and report any suspicious financial activities.
          </Text>

          <Text size={'2'}>
            Although we operate in a decentralized, cryptocurrency-based
            environment, we voluntarily apply strict internal measures to
            protect the integrity of our platform and our users.
          </Text>

          <Heading
            as='h1'
            size='4'
          >
            AML / KYC Policy — XYRO
          </Heading>

          <Text size={'2'}>The objective of this AML/KYC Policy is to:</Text>

          <ul>
            <li style={{ fontSize: '1.75rem' }}>
              Establish verification procedures for users.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Detect and prevent financial crimes, including money laundering,
              terrorism financing, and fraud.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Comply with globally recognized AML best practices for crypto
              gaming platforms.
            </li>
          </ul>

          <Heading
            as='h1'
            size='4'
          >
            User Identity Verification (KYC)
          </Heading>

          <Text size={'2'}>
            In order to maintain platform security and reduce the risk of
            financial crime, XYRO reserves the right to request identity
            verification (KYC) at any time, especially in the following cases:
          </Text>

          <ul>
            <li style={{ fontSize: '1.75rem' }}>
              When cumulative deposit or withdrawal activity exceeds a
              predefined internal limit.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Upon detection of unusual, irregular, or suspicious account
              behavior.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Before processing high-value withdrawals.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Upon multiple accounts detected under one identity or IP address.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              As part of random or routine compliance reviews.
            </li>
          </ul>

          <Heading
            as='h1'
            size='4'
          >
            The requested documents may include:
          </Heading>

          <ul>
            <li style={{ fontSize: '1.75rem' }}>
              Valid government-issued photo ID (passport, driver’s license, or
              national ID card)
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Proof of address (utility bill, bank statement, or official
              government letter not older than 3 months)
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Proof of ownership of the cryptocurrency wallet used for
              transactions (if necessary)
            </li>
          </ul>

          <Text size={'2'}>
            Failure to provide requested documents within the specified time
            frame may result in temporary account suspension, transaction
            delays, or permanent account closure.
          </Text>

          <Heading
            as='h1'
            size='4'
          >
            Monitoring and Risk Assessment
          </Heading>

          <Text size={'2'}>
            We continuously monitor player activity on the platform using both
            automated and manual review processes to identify patterns or
            behaviors that may indicate potential money laundering or financial
            crime. Examples of red flags include:
          </Text>

          <ul>
            <li style={{ fontSize: '1.75rem' }}>
              Unusually large deposits with no corresponding gameplay activity.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Frequent deposits and immediate withdrawal requests.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Structured deposits or withdrawals designed to avoid verification
              thresholds.
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Use of anonymous wallets or addresses linked to known suspicious
              activity.
            </li>
          </ul>

          <Text size={'2'}>
            Suspicious accounts or transactions may be subject to further
            review, account restrictions, reporting to relevant financial crime
            authorities, or termination.
          </Text>

          <Heading
            as='h1'
            size='4'
          >
            Cryptocurrency Transactions
          </Heading>

          <Text size={'2'}>
            Since XYRO operates exclusively with cryptocurrencies, additional
            risk assessment procedures are applied to crypto transactions,
            including:
          </Text>

          <ul>
            <li style={{ fontSize: '1.75rem' }}>
              Blockchain transaction history reviews
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Address screening against known sanction or watchlists
            </li>

            <li style={{ fontSize: '1.75rem' }}>
              Enhanced due diligence on high-volume or high-risk transactions
            </li>
          </ul>

          <Text size={'2'}>
            We reserve the right to delay, withhold, or refuse any transaction
            that appears suspicious or inconsistent with our AML/KYC standards.
          </Text>

          <Heading
            as='h1'
            size='4'
          >
            Data Protection
          </Heading>

          <Text size={'2'}>
            All personal data and documents collected during KYC verification
            are securely stored and processed in accordance with our Privacy
            Policy. Access to sensitive information is restricted to authorized
            personnel only and used exclusively for compliance and security
            purposes.
          </Text>

          <Heading
            as='h1'
            size='4'
          >
            Policy Updates
          </Heading>

          <Text size={'2'}>
            XYRO GAMING LIMITADA reserves the right to amend this AML/KYC Policy
            at any time. The latest version will always be available on the
            platform. Continued use of the platform after updates implies
            acceptance of the revised policy.
          </Text>

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

          <Text size={'2'}>
            [XYRO] is owned and operated by XYRO GAMING LIMITADA located at
            Puntarenas, Garabito, Jaco, Pastor Diaz Avenue, east side of the
            Garabito Municipality, Sanchez Chavarría Law Firm, Costa Rica.
          </Text>
        </Flex>
      </Suspense>
    </>
  )
}
