import MetaData from './VideoMetaData'
import Comment from './comments/index'
import Related from './VideoRelated'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getVideoById } from 'api/api'
import { Row, Col } from 'antd'
import { searchVideos } from 'stores/toolkit/Slice/videoSearchSlice'
import { useAppDispatch } from 'stores/toolkit/hooks'
import { searchQuery } from 'utils'
import ReactPlayer from 'react-player/youtube'

const WatchScreen = () => {
  const [videoItem, setVideoItem] = useState<any>(null)
  const [channel, setChannel] = useState(null)
  const dispatch = useAppDispatch()
  const search = searchQuery(useLocation())
  const id: string | any = search.get('v')
  const eventTest = document.querySelector('button');


  useEffect(() => {
    if (id) {
      getVideoById(id).then(({ video, channel }: any) => {
        setVideoItem(video)
        setChannel(channel)
      }).catch(err => console.log(err.message))
      dispatch(searchVideos({ relatedToVideoId: id }))
    }
  }, [id])

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      disablekb: 0
    }
  }

  const handleEvent = (e: any) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  }

  const handleDuration = (e: any) => {
    console.log("handleDuration", e)
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
          config={{
           playerVars: {
             autoplay: 1
           }
          }}
          // playing={playing}
          // onReady={() => console.log('onReady')}
          // onStart={() => console.log('onStart')}
          // onPlay={this.handlePlay}
          // onEnablePIP={this.handleEnablePIP}
          // onDisablePIP={this.handleDisablePIP}
          // onPause={this.handlePause}
          // onBuffer={() => console.log('onBuffer')}
          // onPlaybackRateChange={this.handleOnPlaybackRateChange}
          onSeek={e => console.log('onSeek', e)}
          // onEnded={this.handleEnded}
          // onError={e => console.log('onError', e)}
          // onProgress={this.handleProgress}
          onDuration={handleDuration}
        />
      </div>
      {
        videoItem && channel && <div className='watch-flexy'>
          <Row className='watch-flexy-content'>
            <Col className='flexy-primary' xs={24} sm={24} md={14} lg={15} xl={16} xxl={14}>
              <div className='video-metadata'>
                <MetaData item={videoItem} channel={channel} />
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