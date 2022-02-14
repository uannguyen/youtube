import { useEffect, useState, useRef } from 'react';
import MetaData from './VideoMetaData'
import Comment from './comments/index'
import Related from './VideoRelated'
import { getVideoById } from 'api'
import { Row, Col } from 'antd'
import { searchVideos } from 'stores/toolkit/Slice/videoSearchSlice'
import { useAppDispatch } from 'stores/toolkit/hooks'
import { useSearchQuery } from 'components/CustomHook'
import ReactPlayer from 'react-player/youtube'

const WatchScreen = () => {
  const dispatch = useAppDispatch()
  const id: string | any = useSearchQuery('v')
  let playerRef: any = useRef()
  const [videoItem, setVideoItem] = useState<any>(null)
  const [channel, setChannel] = useState(null)
  const [playing, setPlaying] = useState(true)


  useEffect(() => {
    if (id) {
      getVideoById(id).then(({ video, channel }: any) => {
        setVideoItem(video)
        setChannel(channel)
      }).catch(err => console.log(err.message))
      dispatch(searchVideos({ relatedToVideoId: id }))
    }
  }, [id])

  const handleRef = (e: any) => {
    playerRef.current = e?.player?.player?.player
  }

  const handleEvent = (e: any) => {
    const currentTime: number = playerRef?.current?.getCurrentTime()
    const currentVolume: number = playerRef?.current?.getVolume()
    e.preventDefault()
    switch (e.code) {
      case 'Space':
        setPlaying(!playing)
        break;
      case "ArrowRight":
        playerRef?.current?.seekTo(currentTime + 10)
        break;
      case "ArrowDown":
        playerRef?.current?.setVolume(currentVolume > 10 ? currentVolume - 10 : 0)
        break;
      case "ArrowLeft":
        playerRef?.current?.seekTo(currentTime > 10 ? currentTime - 10 : 0)
        break;
      case "ArrowUp":
        playerRef?.current?.setVolume(currentVolume + 10)
        break;
    }
  }

  return (
    <div tabIndex={0} onKeyDown={handleEvent} className='watch-screen-container'>
      <div className='wrapper-player-video'>
        <ReactPlayer
          className='video-player'
          width='100%'
          height='100%'
          url={`https://www.youtube.com/watch?v=${id}`}
          controls={true}
          playing={playing}
          config={{
            playerVars: {
              autoplay: 1
            }
          }}
          ref={handleRef}
        />
      </div>
      {
        videoItem && channel && <div className='watch-flexy'>
          <Row className='watch-flexy-content'>
            <Col className='flexy-primary' xs={24} sm={24} md={14} lg={15} xl={16} xxl={14}>
              <div className='video-metadata'>
                <MetaData videoId={id} item={videoItem} channel={channel} />
                <Comment videoId={id} videoItem={videoItem} />
              </div>
            </Col>
            <Col className='flexy-secondary' xs={24} sm={24} md={10} lg={8} xl={8} xxl={5}>
              <div className='related-video-list'>
                <Related />
              </div>
            </Col>
          </Row>
        </div>
      }
    </div>
  )
}

export default WatchScreen