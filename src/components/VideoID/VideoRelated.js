
import { PoweroffOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector, useAppDispatch } from '../../stores/toolkit/hooks'
import { getVideos } from '../../stores/toolkit/Slice/videoSlice'
import Video from '../Home/Video'

const VideoRelated = (props) => {
  const dispatch = useAppDispatch()

  const { videos: { items = [], pageToken } } = useAppSelector(state => state.video)
  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(getVideos({ pageToken }))
    }, 1500);
  }
  return (
    <>
      Related video
      {/* <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
      >
        <div className=''>
          {console.log('items', items)}
          {
            (items || []).map((item, index) => {
              return (
                <div key={index} className=''>
                  <Video index={index} item={item} />
                </div>
              )
            })
          }
        </div>
      </InfiniteScroll> */}
    </>
  )
}
export default VideoRelated