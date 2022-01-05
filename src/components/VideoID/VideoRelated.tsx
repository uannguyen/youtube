
import { PoweroffOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector, useAppDispatch } from 'stores/toolkit/hooks'
import { searchVideos } from 'stores/toolkit/Slice/videoSearchSlice'
import Video from 'components/Home/Video'

const VideoRelated = () => {
  const dispatch = useAppDispatch()
  const { videos: { items = [], pageToken } } = useAppSelector(state => state.videoSearch)
  
  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(searchVideos({ pageToken }))
    }, 1500);
  }


  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
        className='related-video-load'
      >
        {
          (items).map((item, index) => {
            return (
              <div key={index}>
                <Video item={item} videoId={item?.id?.videoId} />
              </div>
            )
          })
        }
      </InfiniteScroll>
    </>
  )
}
export default VideoRelated