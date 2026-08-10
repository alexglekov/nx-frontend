// TODO: add cross linking with the router paths constant
export const FOOTER_LINKS = [
  {
    title: 'PLATFORM',
    links: [
      {
        name: 'About',
        path: '/about'
      },
      {
        name: 'Help Center',
        path: '/onboarding'
      },
      {
        name: 'FAQ',
        path: '/help'
      },
      {
        name: 'Privacy Policy',
        path: '/privacy-policy'
      },
      {
        name: 'Terms of Service',
        path: '/terms-and-conditions'
      }
    ]
  },
  {
    title: 'COMMUNITY',
    isExternal: true,
    links: [
      {
        name: 'X (Twitter)',
        path: 'https://x.com/xyro_io'
      },
      {
        name: 'Discord',
        path: 'https://discord.gg/xyro'
      },
      {
        name: 'Telegram',
        path: 'https://t.me/xyro_io'
      },
      {
        name: 'Mirror',
        path: 'https://mirror.xyz/xyro.eth'
      },
      {
        name: 'Whitepaper',
        path: 'https://xyro-io.gitbook.io/xyro-whitepaper'
      }
      // {
      //   name: 'Instagram',
      //   path: ''
      // },
      // TODO: temporal hiding; return when the legal pages are ready
      // {
      //   title: 'LEGAL',
      //   links: [
      //     {
      //       name: 'Privacy Policy',
      //       path: '/privacy-policy'
      //     },
      //     {
      //       name: 'AML Policy',
      //       path: '/aml-policy'
      //     },
      //     {
      //       name: 'Terms and conditions',
      //       path: '/terms-and-conditions'
      //     }
      //   ]
      // },
    ]
  },
  {
    title: 'XYRO TOKEN',
    isExternal: true,
    links: [
      {
        name: 'KuCoin',
        path: 'https://www.kucoin.com/trade/XYRO-USDT'
      },
      {
        name: 'Gate.io',
        path: 'https://www.gate.io/trade/XYRO_USDT'
      },
      {
        name: 'MEXC',
        path: 'https://www.mexc.com/exchange/XYRO_USDT'
      },
      {
        name: 'Uniswap [ETH]',
        path: 'https://app.uniswap.org/explore/tokens/ethereum/0x4eddb15a0abfa2c349e8065af9214e942d9a6d36'
      },
      {
        name: 'Uniswap [ARB]',
        path: 'https://app.uniswap.org/explore/tokens/arbitrum/0xAeAC3b55c3522157ecdA7EC8fcB86C832fAA28aF'
      }
    ]
  },
  {
    title: 'XYRO TOKEN',
    isExternal: true,
    invisible: true,
    links: [
      {
        name: 'CoinMarketCap',
        path: 'https://coinmarketcap.com/currencies/xyro/?ysclid=m67xwmums9865751703'
      },
      {
        name: 'Dex Tools (ETH)',
        path: 'https://www.dextools.io/app/en/ether/pair-explorer/0xfcaeb9e0ef7bb61f24e40ba651b3729975d2570d?t=1737636740342'
      },
      {
        name: 'Dex Tools (ARB)',
        path: 'https://www.dextools.io/app/en/arbitrum/pair-explorer/0xcd3439b962b3fcf9163d6ce9b498949d7ed1ef14?t=1737636776789'
      },
      {
        name: 'CoinGecko'
      },
      {
        name: 'DEX Screener',
        path: 'https://dexscreener.com/arbitrum/0xcd3439b962b3fcf9163d6ce9b498949d7ed1ef14'
      }
    ]
  }
]

export const SERVICE_DESCRIPTIONS = [
  'XYRO is an AI-powered gamified trading platform that leverages gamification and social features to redefine crypto, making it accessible and engaging.'
]

export const CHAT_SIDEBAR_BUTTON_ID = 'chat_sidebar_button_id'
