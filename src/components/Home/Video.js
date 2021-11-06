
import { formatMoment, formatNumeral } from 'utils/index'
import { useAppSelector } from 'stores/toolkit/hooks'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Video = (props) => {
  const { channels } = useAppSelector(state => state.video)
  const { item } = props
  const {
    snippet: { title, thumbnails: { high }, channelTitle, channelId, publishedAt },
    statistics: { viewCount },
    contentDetails: { duration }
  } = item
  let channelBanner = ''
  const channel = channels.find(c => c.id === channelId)
  if (channel) channelBanner = channel.snippet.thumbnails.default.url

  return (
    <>
      <div className='card-image'>
        <LazyLoadImage
          alt='image video'
          src={high.url} />
        <span className='duration'>{formatMoment(duration, 'duration')}</span>
      </div>
      <div className='card-detail'>
        <div className='card-detail-left'>
          <LazyLoadImage
          className='avatar-img'
          alt='image channel'
          src={channelBanner || ''} />
        </div>

        <div className='card-detail-right'>
          <div className='title'>
            <span className='title'>{title}</span>
          </div>
          <div className='channel'>
            <span className='channel'>{channelTitle}</span>
          </div>
          <div>
            <span className='view'>{formatNumeral(viewCount, '0.a')} lượt xem</span>
            <span className='timeline'>{formatMoment(publishedAt)}</span><br />
          </div>
        </div>
      </div>
    </>
  )
}

export default Video