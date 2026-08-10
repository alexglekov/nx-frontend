import { Share1Icon } from '@radix-ui/react-icons'
import { Button, Flex, IconButton, Link as RadixLink } from '@radix-ui/themes'
import { Maybe } from 'graphql/jsutils/Maybe'
import { RouterPathes } from 'shared/constants'
import { LinkIcon } from 'shared/icons'
import {
  getGameLink,
  saveLinkToGameInClipboard
} from 'shared/utils/save-link-to-game-in-clipboard'

export const ShareButton = ({
  gameId,
  gameMode
}: {
  gameId: Maybe<string>
  gameMode: RouterPathes
}) => {
  const handleShare = () => {
    if (!gameId) return
    saveLinkToGameInClipboard(gameId, gameMode)
  }

  if (!gameId) return null

  const gameLink = getGameLink(RouterPathes.setups, gameId)

  return (
    <Flex
      width='min-content'
      wrap={'nowrap'}
      gap='3'
      align='center'
    >
      <Button
        onClick={handleShare}
        variant={'ghost'}
        color='gray'
        type='button'
      >
        <Share1Icon />
        Share
      </Button>

      <RadixLink
        href={gameLink}
        underline={'hover'}
        color='gray'
        className='no-wrap'
        target='_blank'
      >
        <Flex align='center'>
          <IconButton
            type='button'
            variant='ghost'
            size='1'
          >
            <LinkIcon
              height={16}
              width={16}
            />
          </IconButton>
        </Flex>
      </RadixLink>
    </Flex>
  )
}
