import {
  Alchemy,
  AnimocaBrands,
  AnimocaBrandsLogo,
  Arbitrum,
  ChainGPT,
  CastrumCapital,
  Chainlink,
  Contango,
  Cookie3,
  Eesee,
  LiquidX,
  MavenCapital,
  MonProtocol,
  NewtribeCapital,
  Nxgen,
  OddiyanaVentures,
  Zealy,
  Mexc,
  BasicsCapital,
  Certik,
  Bdc
} from 'shared/icons/about-page'
import { InvestorsProps } from './types'

export const BACKERS_LIST: InvestorsProps[] = [
  {
    icon: AnimocaBrands,
    borderColor: '#31A4DE',
    gridSettings: {
      mobile: {
        rowSpan: 2,
        colSpan: 2
      },
      desktop: {
        rowSpan: 2,
        colSpan: 2
      }
    }
  },
  { icon: BasicsCapital },
  { icon: Contango },
  { icon: Nxgen },
  { icon: MavenCapital },
  { icon: OddiyanaVentures },
  { icon: LiquidX },
  {
    icon: CastrumCapital,
    borderColor: 'var(--c-a-pink)',
    gridSettings: {
      mobile: {
        rowSpan: 2,
        colSpan: 2
      },
      desktop: {
        rowSpan: 2,
        colSpan: 2
      }
    }
  },
  { icon: NewtribeCapital }
]

export const PARTNERS_LIST_DESKTOP: InvestorsProps[] = [
  {
    icon: Mexc,
    gridSettings: { desktop: { rowSpan: 3 }, mobile: { rowSpan: 3 } },
    borderColor: 'rgba(240, 236, 233, 0.80)'
  },
  { icon: Cookie3 },
  {
    icon: Chainlink,
    gridSettings: {
      desktop: { colSpan: 2, rowSpan: 2 },
      mobile: { colSpan: 2, rowSpan: 2 }
    },
    borderColor: '#0847F7'
  },
  { icon: MonProtocol },
  { icon: Bdc },
  { icon: Eesee },
  { icon: Alchemy },
  { icon: Zealy },
  {
    icon: Arbitrum,
    gridSettings: {
      desktop: { colSpan: 2, rowSpan: 2 },
      mobile: { colSpan: 2 }
    },
    borderColor: 'rgba(157, 204, 237, 0.50)'
  },
  { icon: ChainGPT },
  { icon: Certik },
  { icon: AnimocaBrandsLogo }
]

export const PARTNERS_LIST_MOBILE: InvestorsProps[] = [
  {
    icon: Mexc,
    gridSettings: { desktop: { rowSpan: 3 }, mobile: { rowSpan: 3 } },
    borderColor: 'rgba(240, 236, 233, 0.80)'
  },
  {
    icon: Chainlink,
    gridSettings: {
      desktop: { colSpan: 2, rowSpan: 2 },
      mobile: { colSpan: 2, rowSpan: 2 }
    },
    borderColor: '#0847F7'
  },
  { icon: Alchemy },
  { icon: Zealy },
  { icon: ChainGPT },
  { icon: Certik },
  { icon: AnimocaBrandsLogo },
  { icon: Cookie3 },
  { icon: MonProtocol },
  { icon: Eesee },
  { icon: Bdc },
  {
    icon: Arbitrum,
    gridSettings: {
      desktop: { colSpan: 2, rowSpan: 2 },
      mobile: { colSpan: 2 }
    },
    borderColor: 'rgba(157, 204, 237, 0.50)'
  }
]
