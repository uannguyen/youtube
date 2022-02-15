import React, { useEffect, useState, Fragment } from 'react'
import { CheckCircleOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import ImageDefault from 'images/default.jpg'
import { Avatar, Button } from 'antd'
import { formatNumeral } from 'utils'
import moment from 'moment'
import { updateRate, getRating } from 'api'
import { useSearchQuery } from 'components/CustomHook'

const styleIcon = { fontSize: 20 }

const VideoMetaData = (props: any) => {
  const id: string | any = useSearchQuery('v')
  const { item: { snippet, statistics }, channel: {
    snippet: {
      title: channelTitle,
      thumbnails: { default: { url: channelThumbnail } }
    }
  } } = props
  const [isShowMoreText, setIsShowMoreText] = useState(false)
  const [rating, setRating] = useState<'none' | 'like' | 'dislike'>('none')

  useEffect(() => {
    getRating(id).then((data: any) => {
      if (data?.items[0].rating) setRating(data.items[0].rating)
    })
  }, [id])

  const handleRating = async (rate: 'none' | 'like' | 'dislike') => {
    await updateRate({ rate, id })
    setRating(rate)
  }

  return (
    <Fragment>
      <div className='video-info-primary'>
        <span className='video-info-primary-title'>{snippet?.title}</span>
        <div className='info-primary-content'>
          <div className='info-content-left'>
            <span className='view'>{formatNumeral(statistics?.viewCount, '0,0')} lượt xem</span>
            <span className='timeline'>{moment(snippet?.publishedAt).format('ll')}</span>
          </div>
          <div className='info-content-right'>
            <div onClick={() => handleRating('like')} className='like'>
              {
                rating === 'like' ? <LikeFilled style={styleIcon} /> : <LikeOutlined style={styleIcon} />
              }
              <span>{formatNumeral(statistics?.likeCount, '0.a')}</span>
            </div>
            <div onClick={() => handleRating('dislike')} className='dislike'>
              {
                rating === 'dislike' ? <DislikeFilled style={styleIcon} /> : <DislikeOutlined style={styleIcon} />
              }
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
    </Fragment>
  )
}
export default VideoMetaData