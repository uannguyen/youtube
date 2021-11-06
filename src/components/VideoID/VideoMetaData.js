import { CheckCircleOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import ImageDefault from '../../images/default.jpg'
import { Avatar, Button } from 'antd';
import { useState } from 'react';

const VideoMetaData = (props) => {
  const { item: { snippet: { description } } } = props
  const [isShowMoreText, setIsShowMoreText] = useState(false)


  return (
    <>
      <div className='video-info-primary'>
        <span className='video-info-primary-title'>Câu Chuyện Tình Yêu | Yanbi x Amanda Baby | Official Music Video</span>
        <div className='info-primary-content'>
          <div className='info-content-left'>
            <span className='view'>10.496.089 lượt xem</span>
            <span className='timeline'>3 thg 10, 2013</span>
          </div>
          <div className='info-content-right'>
            <div className='like'>
              <LikeOutlined style={{ fontSize: '20px' }} />
              <span>13 N</span>
            </div>
            <div className='dislike'>
              <DislikeOutlined style={{ fontSize: '20px' }} />
              <span>15 N</span>
            </div>
          </div>
        </div>
      </div>
      <div className='video-info-secondary'>
        <div className='video-info-secondary-title'>
          <div className='channel-info'>
            <div className='channel-image'>
              <Avatar src={ImageDefault} />
            </div>
            <div className='channel-content'>
              Zing Mp3 <CheckCircleOutlined />
            </div>
          </div>
          <div className='channel-subscribe'>
            <Button className='subscribe-btn'> Đăng ký</Button>
          </div>
        </div>
        <div className={`video-description description-${isShowMoreText && 'show-more'}`}>
          <span>{description}</span><br />
        </div>
        <Button style={{ marginLeft: '1.5rem' }} onClick={() => setIsShowMoreText(!isShowMoreText)}
          type='text'>{!isShowMoreText ? 'Hiện thêm' : 'Ẩn bớt'}
        </Button>
      </div>
    </>
  )
}
export default VideoMetaData