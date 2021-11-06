import MetaData from './VideoMetaData'
import Comment from './Comment'
import Related from './VideoRelated'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getVideoById } from 'api/api'
import { Row, Col } from 'antd'


const WatchScreen = (props) => {
  const { id } = useParams()
  const [videoItem, setVideoItem] = useState(null)

  useEffect(() => {
    getVideoById(id).then((video) => {
      setVideoItem(video)
    }).catch(err => console.log(err.message))
  }, [id])

  return (
    <div className='watch-screen-container'>
      <div className='wrapper-player-video'>
        <iframe
          title='Video'
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${id}`}
        />
      </div>
      {
        videoItem && <div className='watch-flexy'>
          <Row className='watch-flexy-content'>
              <Col xs={24} sm={24} md={24} lg={16}>
            <div className='video-metadata'>
                <MetaData item={videoItem} />
                <Comment videoId={id} />
            </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
            <div className='related-video-content'>
                <Related />
            </div>
              </Col>
          </Row>


        </div>
      }
    </div>
  )
}

export default WatchScreen