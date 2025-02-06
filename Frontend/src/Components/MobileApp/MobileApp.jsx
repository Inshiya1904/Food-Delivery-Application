import React from 'react'
import './MobileApp.css'
import playStore from '../../assets/play_store.png'
import appStore from '../../assets/app_store.png'

const MobileApp = () => {
  return (
    <div>
      <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br />Tomato App</p>
            <div className="app-download-platforms">
                <img src={playStore} alt="" />
                <img src={appStore} alt="" />
            </div>
        </div>
    </div>
  )
}

export default MobileApp
