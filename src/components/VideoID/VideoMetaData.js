import { CheckCircleOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import ImageDefault from '../../images/default.jpg'
import { Avatar, Button } from 'antd';
import { useState } from 'react'
import { formatNumeral } from 'utils'
import moment from 'moment'

const VideoMetaData = (props) => {
  const { item: { snippet, statistics }, channel: {
    snippet: { 
      title: channelTitle,
      thumbnails: { default: { url: channelThumbnail } }
     }
  } } = props
  const [isShowMoreText, setIsShowMoreText] = useState(false)

  return (
    <>
      <div className='video-info-primary'>
        <span className='video-info-primary-title'>{snippet?.title}</span>
        <div className='info-primary-content'>
          <div className='info-content-left'>
            <span className='view'>{formatNumeral(statistics?.viewCount, '0,0')} lượt xem</span>
            <span className='timeline'>{moment(snippet?.publishedAt).format('ll')}</span>
          </div>
          <div className='info-content-right'>
            <div className='like'>
              <LikeOutlined style={{ fontSize: '18px' }} />
              <span>{formatNumeral(statistics?.likeCount, '0.a')}</span>
            </div>
            <div className='dislike'>
              <DislikeOutlined style={{ fontSize: '18px' }} />
              <span>{formatNumeral(statistics?.dislikeCount, '0.a')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='video-info-secondary'>
        <div className='video-info-secondary-title'>
          <div className='channel-info'>
            <div className='channel-image'>
              <Avatar src={channelThumbnail || ImageDefault} />
            </div>
            <div className='channel-content'>
              {channelTitle}
              &nbsp;<CheckCircleOutlined />
            </div>
          </div>
          <div className='channel-subscribe'>
            <Button className='subscribe-btn'> Đăng ký</Button>
          </div>
        </div>
        <div className={`video-description description-${isShowMoreText && 'show-more'}`}>
          <span>{snippet?.description}</span><br />
        </div>
        <Button style={{ marginLeft: '1.5rem' }} onClick={() => setIsShowMoreText(!isShowMoreText)}
          type='text'>{!isShowMoreText ? 'Hiện thêm' : 'Ẩn bớt'}
        </Button>
      </div>
    </>
  )
}
export default VideoMetaData