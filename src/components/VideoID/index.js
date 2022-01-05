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

const WatchScreen = (props) => {
  const [videoItem, setVideoItem] = useState(null)
  const [channel, setChannel] = useState(null)
  const dispatch = useAppDispatch()
  const search = searchQuery(useLocation())
  const id = search.get('v')

  useEffect(() => {
    if (id) {
      getVideoById(id).then(({ video, channel }) => {
        setVideoItem(video)
        setChannel(channel)
      }).catch(err => console.log(err.message))
      dispatch(searchVideos({ relatedToVideoId: id }))
    }
  }, [id])

  return (
    <div className='watch-screen-container'>
      <div className='wrapper-player-video'>
        <iframe
          title='Video'
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${id}`}
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