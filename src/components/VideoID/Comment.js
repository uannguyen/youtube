import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from 'stores/toolkit/hooks'
import { listComment } from 'stores/toolkit/Slice/commentSlide'
import { Input, Button, Select } from 'antd'
import defaultIMG from 'images/default.jpg'
import { Row, Col } from 'antd'

const { Option } = Select

const Comment = (props) => {
  const { videoId } = props
  const dispatch = useAppDispatch()
  const { comments, isLoading } = useAppSelector(state => state.comment)
  const [isOpen, setIsOpen] = useState(false)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    dispatch(listComment({ videoId }))
  }, [videoId])

  const handleChange = (order) => {
    console.log(order)
    if (order) dispatch(listComment({ order, videoId }))
  }
  console.log('comments', comments)
  return (
    <div className='video-comment'>
      <div className='video-comment-title'>
        <Row gutter={24} style={{ alignItems: 'center' }}>
          <Col>133333 binh luan</Col>
          <Col>
          <Select defaultValue="" style={{ width: 150 }} onChange={handleChange}>
            <Option value=''>Sắp xếp theo</Option>
            <Option value="relevance">Bình luận hàng đầu</Option>
            <Option value="time">Mới nhất xếp trước</Option>
          </Select>
          </Col>
        </Row>
      </div>
      <div onChange={setCommentText} className='user-comment'>
        <div className='left-user-comment'>
          <img className='avatar-img' src={defaultIMG} alt='avatar-img' />
        </div>
        <div className='right-user-comment'>
          <Input onFocus={() => setIsOpen(true)} placeholder="Bình luận công khai..." />
          <div style={{ visibility: isOpen ? 'unset' : 'hidden' }} className='user-comment-action-btn'>
            <Button onClick={() => setIsOpen(false)} type='text'>Hủy</Button>
            <Button disabled={!commentText} type='primary'>Bình luận</Button>
          </div>
        </div>

      </div>
      <div className='list-comment'>

      </div>
    </div>
  )
}
export default Comment