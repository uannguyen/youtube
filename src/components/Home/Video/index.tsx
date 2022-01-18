
import { formatMoment, formatNumeral } from 'utils/index'
import { useAppSelector } from 'stores/toolkit/hooks'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Popover } from 'antd'
import DefaultIMG from 'images/default.jpg'
import { useHistory } from "react-router-dom";
import { VideoItem } from 'interface'

type PropsType = {
  item: VideoItem,
  displayPage?: string
  videoId: string
}

const Video = (props: PropsType) => {
  const history = useHistory()
  const { channels } = useAppSelector(state => state.video)
  const { item, displayPage, videoId } = props
  const {
    snippet: { title, thumbnails: { high }, channelTitle, channelId, publishedAt, description },
    statistics: { viewCount },
    contentDetails: { duration }
  } = item
  let channelBanner
  const channel = channels.find(c => c.id === channelId)
  if (channel) channelBanner = channel.snippet?.thumbnails?.default?.url

  const handleNextVideo = () => {
    history.push(`/watch?v=${videoId}`)
    window.scrollTo(0,0)
  }

  return (
    <div className='card-item' onClick={handleNextVideo}>
      <div className='card-image'>
        <LazyLoadImage
          alt='image video'
          src={high?.url} />
        <span className='duration'>{formatMoment(duration, 'duration')}</span>
      </div>
      <div className='card-detail'>
        <div className='card-detail-left'>
          <LazyLoadImage
            className='avatar-img'
            alt='image channel'
            src={channelBanner || DefaultIMG}
          />
        </div>

        <div className='card-detail-right'>
          <Popover
            placement='bottom'
            color='#4a403e'
            content={
              <span style={{ color: '#fff', fontSize: 16 }}>{title}</span>
            }>
            <span className='title'>{title}</span>
          </Popover>
          <div className='channel-wrapper'>
            <span className='channel-name'>{channelTitle}</span>
          </div>
          <div className='videoParams'>
            <span className='view'>{formatNumeral(viewCount, '0.a')} lượt xem</span>
            <span className='timeline'>{formatMoment(publishedAt)}</span><br />
          </div>
          {
            displayPage === 'search' && <span className='video-description'>{description}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default Video