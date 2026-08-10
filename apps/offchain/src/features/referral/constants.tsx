import {
  Newbie,
  Legend,
  Emperor,
  King,
  Ambassador,
  Partner,
  GamingAgent,
  Tycoon,
  InvintationMaster,
  Recruiter,
  TopFirstReferral,
  TopSecondReferral,
  TopThirdReferral
} from 'shared/icons/referral-levels'

export const MAP_LEVEL_ID_TO_ICON: Record<
  number,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  1: Newbie,
  2: GamingAgent,
  3: Partner,
  4: InvintationMaster,
  5: Ambassador,
  6: Recruiter,
  7: Legend,
  8: King,
  9: Tycoon,
  10: Emperor
}

export const MAP_TOP_REFERRAL_TO_ICON: Record<
  number,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  1: TopFirstReferral,
  2: TopSecondReferral,
  3: TopThirdReferral
}
