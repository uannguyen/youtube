import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import CardList from './CardList'
const { search } = require('../../api')

const Home = (props) => {

  useEffect(() => {
    const fetch = async () => {
      try {
        await search({ q: '' })
      } catch (error) {
        console.log(error.message)
      }
    }
    fetch()
  }, [])

  return (
    <div className='container'>
      <Sidebar />
      <CardList />
    </div>
  )
}

export default Home