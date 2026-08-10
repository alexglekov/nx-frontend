/* eslint-disable max-lines */
import MainLayout from 'features/main-layout'
import { OnboardingMemeWars } from 'features/onboarding'
import { AmlPolicyPage } from 'pages/aml-policy-page'
import { BullsEyeModePage } from 'pages/bulls-eye-page'
import { BuyBackBridgePage } from 'pages/buy-back-bridge-page'
import { BuyBackSwapPage } from 'pages/buy-back-swap-page'
import { BuyBackTokenPage } from 'pages/buy-back-token-page'
import { DevPage } from 'pages/dev-page'
import { FundingPaymentsPage } from 'pages/funding-payments'
import { HelpPage } from 'pages/help-page'
import { HomePage } from 'pages/home-page'
import { MemeWarsModePage } from 'pages/meme-wars'
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
import { OneVsOneModePage } from 'pages/one-vs-one'
import { PasswordRecoveryPage } from 'pages/password-recovery-page'
import { PriceFormulationPage } from 'pages/price-formulation'
import { PrivacyPolicyPage } from 'pages/privacy-policy-page'
import { ProfilePage } from 'pages/profile-page'
import { ReferralsPage } from 'pages/referrals-page'
import { RewardsPage } from 'pages/rewards-page'
import { SetupsModePage } from 'pages/setups'
import { TermsPage } from 'pages/terms-page'
import { UnloggedPage } from 'pages/unlogged'
import { UpDownModePage } from 'pages/up-down'
import { UserSettingsPage } from 'pages/user-settings'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { AboutPage } from '../pages/about'
import { PrivateRoutes } from './private-routes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={RouterPathes.home}
          element={<HomePage />}
        />

        {/* MODES */}
        <Route
          path={RouterPathes.memeWars}
          element={<MemeWarsModePage />}
        />
        <Route
          path={RouterPathes.oneVsOne}
          element={<OneVsOneModePage />}
        />
        <Route
          path={RouterPathes.setups}
          element={<SetupsModePage />}
        />
        <Route
          path={RouterPathes.upDown}
          element={<UpDownModePage />}
        />
        <Route
          path={RouterPathes.bullsEye}
          element={<BullsEyeModePage />}
        />
        <Route
          path={RouterPathes.priceFormulation}
          element={<PriceFormulationPage />}
        />

        {/* INFO */}
        <Route
          path={RouterPathes.buyback}
          element={<BuyBackTokenPage />}
        />

        <Route
          path={RouterPathes.buybackBridge}
          element={<BuyBackBridgePage />}
        />

        <Route
          path={RouterPathes.buybackSwap}
          element={<BuyBackSwapPage />}
        />

        {/* TODO: Remove comment when holders page will be ready*/}
        {/*<Route*/}
        {/*  path={RouterPathes.buybackHolders}*/}
        {/*  element={<BuyBackHoldersPage />}*/}
        {/*/>*/}

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

        <Route
          path={RouterPathes.passwordRecovery}
          element={<PasswordRecoveryPage />}
        />

        <Route element={<PrivateRoutes />}>
          {/* USER */}
          <Route
            path={RouterPathes.profile}
            element={<ProfilePage />}
          />
          <Route
            path={`${RouterPathes.profile}/:id`}
            element={<ProfilePage />}
          />
          <Route
            path={RouterPathes.fundingPayments}
            element={<FundingPaymentsPage />}
          />

          <Route
            path={RouterPathes.settings}
            element={<UserSettingsPage />}
          />
          <Route
            path={RouterPathes.notifications}
            element={<NotificationListPage />}
          />
          <Route
            path={RouterPathes.rewards}
            element={<RewardsPage />}
          />

          <Route
            path={RouterPathes.referrals}
            element={<ReferralsPage />}
          />

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
