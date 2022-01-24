import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'stores/toolkit/hooks'
import { Button } from 'antd'
import InfiniteScroll from "react-infinite-scroll-component"
import { PoweroffOutlined } from '@ant-design/icons'
import Video from './Video/index'
import { getVideos } from 'stores/toolkit/Slice/videoSlice'
import { useHistory } from "react-router-dom";
import Sidebar from 'components/Sidebar'

const HomePage = () => {

  const dispatch = useAppDispatch()
  const { videos: { items = [], pageToken } } = useAppSelector(state => state.video)
  const [keyword, setKeyword] = useState('Tất cả')

  const defaultKeywords = [
    { key: 'Tất cả', videoCategoryId: 0 },
    { key: 'Âm nhạc', videoCategoryId: 10 },
    { key: 'Phim', videoCategoryId: 1 },
    { key: 'Thể thao', videoCategoryId: 17 },
    { key: 'Game', videoCategoryId: 20 },
    { key: 'Blog', videoCategoryId: 22 },
    { key: 'Giải trí', videoCategoryId: 24 },
    { key: 'Tin tức', videoCategoryId: 25 },
    { key: 'Công nghệ', videoCategoryId: 28 },
    { key: 'Pet & Animal', videoCategoryId: 15 },
    { key: 'Ô tô', videoCategoryId: 2 },
  ]

  useEffect(() => {
    let videoCategoryId = 0
    if (keyword) {
      const findByKeyword = defaultKeywords.find(k => k.key === keyword)
      if (findByKeyword) videoCategoryId = findByKeyword.videoCategoryId
    }
    dispatch(getVideos({ videoCategoryId }))
  }, [keyword])

  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(getVideos({ pageToken }))
    }, 1000);
  }

  return (
    <div className='main-container'>
    <Sidebar />
    <div className='video-container'>
      <div className='card-container'>
        <div className='filter-tab'>
          {
            defaultKeywords.map((i, index) => {
              return <Button className={`${keyword === i.key ? 'active' : ''}`}
                onClick={() => setKeyword(i.key)} key={index}>{i.key}</Button>
            })
          }
        </div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
        >
          <div className='card-content'>
            {
              (items || []).map((item, index) => {
                return (
                  <div key={index}>
                    <Video item={item} videoId={item.id} />
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>

      </div>
    </div>
    </div>
  )
}

export default HomePage