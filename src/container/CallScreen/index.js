import React from 'react';
import SvgIcon from '../../components/svg-icon/svg-icon';
import { Link } from 'react-router-dom';
import './index.scss';

import CompanyLogo from '../../assets/images/company.svg';
import { Button } from 'antd';

const CallScreen = () =>{
  return (
    <div className='screen-wrapper'>
      <div className='header-main'>
        <div className='header-inner'>
          <div className='header-user'>
            <div className='back-icon'>
              <Link to="/">
                <SvgIcon name="back-arrow" viewbox="0 0 15 13.333" />
              </Link>
            </div>
            <div className='user-image'>
              <div className='user-image-inner'>
                <img src={CompanyLogo} alt={CompanyLogo} />
              </div>
            </div>
            <div className='user-name'>
              STAR JEWEL
            </div>
          </div>
          <div className='header-right'>
          </div>
        </div>
      </div>
      <div className='content-wrapper call-wrapper'>
        <div className='call-wrapper-inner'>
          <div className='thankyou'>
            <div className='thankyou-inner'>
              <SvgIcon name="thumb-up" viewbox="0 0 51.529 52.055" />
              <p>Thank you</p>
            </div>
          </div>
          <div className='call-bottom'>
            <p>For More Info please call</p>
            <Button className='call-btn'><SvgIcon name="call-icon" viewbox="0 0 30.257 30.252" /> Call</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallScreen