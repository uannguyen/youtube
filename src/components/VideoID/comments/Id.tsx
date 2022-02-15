import React, { useEffect, useState, createElement } from "react"
import { Comment, Tooltip, Avatar } from 'antd'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import moment from 'moment'
import { formatMoment } from 'utils/index'

const Comments = (props: any) => {
  const { comment: { snippet: {
    topLevelComment: {
      snippet: {
        authorChannelId,
        authorChannelUrl,
        authorDisplayName,
        authorProfileImageUrl,
        likeCount,
        publishedAt,
        textDisplay,
        textOriginal
      }
    },
    totalReplyCount
  }, id }
  } = props

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {

  }

  const dislike = () => {

  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Thích">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span style={{ paddingLeft: 5 }} className="comment-action">{likeCount}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Không thích">
      <span onClick={dislike}>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  return (
    <Comment
      className='comment-item'
      actions={actions}
      author={<a target='' href={authorChannelUrl}>{authorDisplayName}</a>}
      avatar={<Avatar
        // onClick={() => window.open(authorChannelUrl, '_parent')}
        src={authorProfileImageUrl}
        alt={authorDisplayName}
      />}
      content={<p>{textOriginal}</p>}
      datetime={<span>{formatMoment(publishedAt, null)}</span>}
    />
  )
}
export default Comments