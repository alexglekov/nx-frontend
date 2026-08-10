/* eslint-disable max-lines */
import { AccountLayoutWrapper } from 'features/account/components/account-layout-wrapper'
import MainLayout from 'features/main-layout'
import { OnboardingMemeWars } from 'features/onboarding'
import { AccountBonusPage } from 'pages/account/account-bonus'
import { AccountHistoryPage } from 'pages/account/account-history'
import { AccountSettingsPage } from 'pages/account/account-settings'
import { AmlPolicyPage } from 'pages/aml-policy-page'
import { DevPage } from 'pages/dev-page'
import { HelpPage } from 'pages/help-page'
import { HomePage } from 'pages/home-page'
import { NotFoundPage } from 'pages/not-found'
import { NotificationListPage } from 'pages/notification-list-page'
import {
  OnboradingModeBullsEyePage,
  OnboradingModeOneVsOnePage,
  OnboradingModeReferralProgramPage,
  OnboradingModeRewardsSystemPage,
  OnboradingModeSetupsPage,
  OnboradingModeTreasurePage,
  OnboradingModeUpDownPage
} from 'pages/onboarding'
import { PriceFormulationPage } from 'pages/price-formulation'
import { PrivacyPolicyPage } from 'pages/privacy-policy-page'
import { TermsPage } from 'pages/terms-page'
import { UnloggedPage } from 'pages/unlogged'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { AboutPage } from '../pages/about'
import { AccountPage } from '../pages/account/account-profile'
import { FavoriteGamesPage } from '../pages/favorite-games'
import { GamePage } from '../pages/game'
import { GamesPage } from '../pages/games'
import { ReferralPage } from '../pages/referral'
import { ReferralLandingPage } from '../pages/referral-landing'
import { PrivateRoutes } from './private-routes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={RouterPathes.home}
          element={<HomePage />}
        />

        {/* <Route
          path={RouterPathes['referral-about']}
          element={<ReferralLandingPage />}
        /> */}

        {/* MODES */}
        {/* <Route
          path={RouterPathes.games}
          element={<GamesPage />}
        />

        <Route
          path={RouterPathes.favorites}
          element={<FavoriteGamesPage />}
        />

        <Route
          path={`${RouterPathes.games}/:gameId`}
          element={<GamePage />}
        /> */}

        <Route
          path={RouterPathes.priceFormulation}
          element={<PriceFormulationPage />}
        />

        {/* INFO */}

        <Route
          path={RouterPathes.help}
          element={<HelpPage />}
        />
        <Route
          path={RouterPathes.privacyPolicy}
          element={<PrivacyPolicyPage />}
        />
        <Route
          path={RouterPathes.amlPolicy}
          element={<AmlPolicyPage />}
        />
        <Route
          path={RouterPathes.termsAndConditions}
          element={<TermsPage />}
        />

        <Route element={<PrivateRoutes />}>
          {/* USER */}
          <Route
            path={RouterPathes.notifications}
            element={<NotificationListPage />}
          />

          <Route element={<AccountLayoutWrapper />}>
            <Route
              path={RouterPathes.accountMyAccount}
              element={<AccountPage />}
            />

            <Route
              path={RouterPathes.accountSocials}
              element={<AccountPage />}
            />

            <Route
              path={RouterPathes.accountBasicInformation}
              element={<AccountPage />}
            />

            {/* <Route
              path={RouterPathes.bonusAccountBonus}
              element={<AccountBonusPage />}
            />

            <Route
              path={RouterPathes.bonusWelcomePack}
              element={<AccountBonusPage />}
            />

            <Route
              path={RouterPathes.bonusCashback}
              element={<AccountBonusPage />}
            />

            <Route
              path={RouterPathes.historyDeposit}
              element={<AccountHistoryPage />}
            />

            <Route
              path={RouterPathes.historyWithdraw}
              element={<AccountHistoryPage />}
            />

            <Route
              path={RouterPathes.settingsPreference}
              element={<AccountSettingsPage />}
            />

            <Route
              path={RouterPathes.settingsPassword}
              element={<AccountSettingsPage />}
            /> */}
          </Route>

          {/* <Route
            path={RouterPathes.referral}
            element={<ReferralPage />}
          /> */}

          {/* <Route
            path={ROUTER_PATHS.OAUTH}
            element={<OAuthPage />}
          /> */}
        </Route>

        {/* ONBOARDING */}
        <Route
          path={RouterPathes.onboarding}
          element={<Navigate to={RouterPathes.onboardingUpDown} />}
        />
        <Route
          path={RouterPathes.onboardingUpDown}
          element={<OnboradingModeUpDownPage />}
        />
        <Route
          path={RouterPathes.onboardingBullsEye}
          element={<OnboradingModeBullsEyePage />}
        />
        <Route
          path={RouterPathes.onboardingSetups}
          element={<OnboradingModeSetupsPage />}
        />
        <Route
          path={RouterPathes.onboardingOneVsOne}
          element={<OnboradingModeOneVsOnePage />}
        />
        <Route
          path={RouterPathes.onboardingMemeWars}
          element={<OnboardingMemeWars />}
        />
        <Route
          path={RouterPathes.onboardingTreasure}
          element={<OnboradingModeTreasurePage />}
        />
        <Route
          path={RouterPathes.onboardingReferralProgram}
          element={<OnboradingModeReferralProgramPage />}
        />
        <Route
          path={RouterPathes.onboardingRewardsSystem}
          element={<OnboradingModeRewardsSystemPage />}
        />

        {/* MISC */}
        <Route
          path='*'
          element={<NotFoundPage />}
        />
        <Route
          path={RouterPathes.dev}
          element={<DevPage />}
        />
        <Route
          path={RouterPathes.unlogged}
          element={<UnloggedPage />}
        />
      </Route>

      <Route
        path={'/about'}
        element={<AboutPage />}
      />
    </Routes>
  )
}
