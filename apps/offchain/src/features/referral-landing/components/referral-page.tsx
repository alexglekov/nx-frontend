import { Flex } from '@radix-ui/themes'
import { BannerCTA } from './banner-cta'
import { HowItWork } from './how-it-work'
import { ReferralDescription } from './referral-description'
import { ReferralIntro } from './referral-intro'
import { SeasonRewards } from './season-rewards'

export const ReferralPage: React.FC = () => {
  return (
    <Flex direction={'column'}>
      <ReferralIntro />

      <ReferralDescription />

      <SeasonRewards />

      <HowItWork />

      <BannerCTA />
    </Flex>
  )
}
