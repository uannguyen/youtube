import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppSelector } from 'stores/toolkit/hooks'
import { PoweroffOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { searchVideos } from 'stores/toolkit/Slice/videoSearchSlice'
import { Button } from 'antd'
import Video from 'components/Home/Video'
import { useLocation } from "react-router-dom";
import { searchQuery } from 'utils'
import Sidebar from 'components/Sidebar'

const Search = () => {
  const { videos: { items = [], pageToken } } = useAppSelector(state => state.videoSearch)
  const dispatch = useDispatch()
  const search = searchQuery(useLocation())

  const query = search.get('search_query')

  useEffect(() => {
    if (query) dispatch(searchVideos({ q: query }))
  }, [query])

  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(searchVideos({ pageToken, q: query }))
    }, 1500);
  }

  return <div className='search-wrapper'>
    <Sidebar />
    <div className='search-container'>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
        className='search-video-list'
      >
        {
          (items).map((item, index) => {
            return (
              <div key={index}>
                <Video item={item} displayPage='search' videoId={item.id?.videoId} />
              </div>
            )
          })
        }
      </InfiniteScroll>
    </div>
  </div>


}

export default Search