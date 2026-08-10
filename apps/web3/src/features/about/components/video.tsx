import { useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PlayIcon } from 'shared/icons/about-page'
import { aboutVideoPreview } from 'shared/images'
import styles from '../about.module.scss'

const VIDEO_URL =
  'https://xyrovideos.s3.ap-southeast-1.amazonaws.com/IMG_5488.mp4'

const Video: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  const handlePlay: React.MouseEventHandler = event => {
    if (!ready) {
      event.preventDefault()
      void videoRef.current?.play()
      setReady(true)
    }
  }

  return (
    <Flex
      onClickCapture={handlePlay}
      className={styles.video}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        controls={ready}
        playsInline
        poster={aboutVideoPreview}
        preload={'metadata'}
      >
        <source
          src={VIDEO_URL}
          type='video/mp4'
        />
      </video>
      {!ready && (
        <Flex className={styles.videoPlayIcon}>
          <PlayIcon
            opacity={0.7}
            width={'13rem'}
            height={'13rem'}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default Video
