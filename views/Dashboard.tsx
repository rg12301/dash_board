import React from 'react'
import Navbar from '../components/Navbar'
import Sidepane from '../components/Sidepane'

interface Props {
  
}

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-row">
      <Sidepane />
      <Navbar />
    </div>
  )
}

export default Dashboard
