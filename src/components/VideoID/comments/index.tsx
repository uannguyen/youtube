import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from 'stores/toolkit/hooks'
import { listComment, updateComment } from 'stores/toolkit/Slice/commentSlide'
import { Input, Button, Select, Row, Col } from 'antd'
import defaultIMG from 'images/default.jpg'
import CommentID from './Id'
import InfiniteScroll from "react-infinite-scroll-component"
import { PoweroffOutlined } from '@ant-design/icons'
import { formatNumeral } from 'utils/index'
import { postComment } from "api"

const { Option } = Select

const Comment = (props: any) => {
  const { videoId, videoItem: { statistics } } = props
  const dispatch = useAppDispatch()
  const {
    comments: { items, nextPageToken, pageInfo }
  } = useAppSelector(state => state.comment)
  const { userInfo } = useAppSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [orderFilter, setOrderFilter] = useState('relevance')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    dispatch(listComment({ videoId }))
  }, [videoId])

  const handleChange = (order: "relevance" | "time") => {
    setOrderFilter(order)
    if (order) dispatch(listComment({ order, videoId }))
  }

  const fetchMoreComment = () => {
    setTimeout(() => {
      dispatch(listComment({ videoId, pageToken: nextPageToken, order: orderFilter }))
    }, 1000)
  }

  const handleCancelComment = () => {
    setIsOpen(false)
    setCommentText('')
  }

  const handlePostComment = async () => {
    try {
      const comment = await postComment({ id: videoId, commentText })
      if (comment) {
        dispatch(updateComment(comment))
      }
      setIsOpen(false)
      setCommentText('')
    } catch (error) {
      console.log(error)
    }
  }
  console.log("commentText", commentText)
  if (!pageInfo?.totalResults) return null
  return (
    <div className='video-comment'>
      <div className='video-comment-title'>
        <Row gutter={24} style={{ alignItems: 'center' }}>
          <Col>{formatNumeral(statistics?.commentCount, '0,0')} bình luận</Col>
          <Col>
            <Select placeholder='Sắp xếp theo' style={{ width: 170 }} onChange={handleChange}>
              <Option value="relevance">Bình luận hàng đầu</Option>
              <Option value="time">Mới nhất xếp trước</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div className='user-comment'>
        <div className='left-user-comment'>
          <img className='avatar-img' src={userInfo?.picture || defaultIMG} alt='avatar-img' />
        </div>
        <div className='right-user-comment'>
          <Input
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            onFocus={() => setIsOpen(true)}
            placeholder="Bình luận công khai..."
          />
          <div style={{ visibility: isOpen ? 'unset' : 'hidden' }} className='user-comment-action-btn'>
            <Button onClick={handleCancelComment} type='text'>Hủy</Button>
            <Button onClick={handlePostComment} disabled={!commentText} type='primary'>Bình luận</Button>
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreComment}
        hasMore={true}
        loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
      >
        <div className='list-comment'>
          {
            items.map((comment, index) => {
              return <CommentID
                key={index}
                comment={comment}
                nextPageToken={nextPageToken}
              />
            })
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}
export default Comment