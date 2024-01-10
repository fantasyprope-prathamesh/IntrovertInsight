import React from 'react'
import './leftBar.scss'
// import UserImg from '../../assets/logo2.png'
import UserImg from '../../assets/logo2.png'
import Friends from '../../assets/C++.png'

const LeftBar = () => {
  return (
    <div className='leftbar'>
      <div className='container'>
        <div className='menu'>
          <div className='user'>
            <img src={UserImg} alt='user'  />
            <span>Prathamesh Patil</span>
          </div>

          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
        </div>

        <hr/>

        {/* Your shortcuts */}
        <div className='menu'>
          
          <span>Your shortcuts</span>

          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
        </div>

        <hr/>

        {/* Others */}
        <div className='menu'>
          
          <span>Others</span>

          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
        </div>

      </div>
    </div>
  )
}


export default LeftBar