import {
  welcomeScreenFirstBanner,
  welcomeScreenSecondBanner
} from 'shared/images'

export const WELCOME_WINDOW_STEPS_DATA = {
  step1: {
    id: 1,
    image: welcomeScreenFirstBanner,
    title: 'Onbording',
    description:
      'Update your knowledge. All the latest information on how to use the platform is here.',
    secondaryTitle: '',
    secondaryDescriptionPart1: '',
    secondaryDescriptionPart2: '',
    buttonText: 'learn how to play'
  },
  step2: {
    id: 2,
    image: welcomeScreenSecondBanner,
    title: 'Rewards',
    description: 'Earn rewards and rank on the leaderboard.',
    secondaryTitle: 'How to get these tokens?',
    secondaryDescriptionPart1: 'Complete the first quest in the Rewards',
    secondaryDescriptionPart2: 'and receive Native Tokens as a reward.',
    buttonText: 'start earning rewards'
  }
}
