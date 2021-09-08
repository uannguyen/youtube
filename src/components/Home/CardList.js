import React, { useEffect } from 'react'
import { Card } from 'antd'
import DefaultIMG from '../../images/default.jpg'
import BGround from '../../images/background.jpg'

const CardList = (props) => {

  useEffect(() => {
  }, [])

  const listVideo = [0, 1, 2, 3, 4, 5, 6]

  return (
    <div className='card-content'>
      {
        listVideo.map((index, key) => {
          let title = 'Tik Tok Việt Nam ✔️ Những Khoảnh Khắc Thú Vị'
          if (index === 3) title = title + 'Tik ToK Video Triệu View #498aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          return (
            <div key={key} className='card-item'>
              <div className='card-image'>
                <img src={DefaultIMG} alt='img' />
              </div>
              <div className='item-detail'>
                <div className='item-detail-left'>
                  <img src={BGround} alt='icon' />
                </div>
                <div className='item-detail-right'>
                  <div className='title'>
                    <span className='title'>{title}</span>
                  </div>
                  <div className='channel'>
                    <span className='channel'>Bùi Anh Tuấn</span>
                  </div>
                  <div>
                    <span className='view'>20 Tr view</span>
                    <span className='timeline'>7 Nam truoc</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CardList