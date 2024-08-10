import React, { useRef, useEffect, useState } from 'react';
import SvgIcon from '../../components/svg-icon/svg-icon';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './index.scss';

import CompanyLogo from '../../assets/images/company.svg';
import overlayItem from '../../assets/images/pendals.png';
import overlayItem2 from '../../assets/images/pendals2.png';
import overlayItem3 from '../../assets/images/pendals3.png';
import tryItem from '../../assets/images/try.png';

const ItemsDetailsScreen = () =>{
  const [tryJewel, setTryJewel ] = useState([]);
  const [camshow, setCamshow ] = useState(false);
  
  const videoRef = useRef(null); // Create a reference for the video element

     useEffect(() => {
       const startVideo = async () => {
         try {
           // Request access to the webcam
           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
           // Set the video source to the stream
           videoRef.current.srcObject = stream;
         } catch (error) {
           console.error("Error accessing webcam: ", error);
         }
       };

       startVideo();

       // Cleanup function to stop the video stream on component unmount
       return () => {
         const stream = videoRef.current;
         if (stream) {
           const tracks = stream.getTracks();
           tracks.forEach(track => track.stop()); // Stop all tracks
         }
       };
     }, []);

  const ChangeJewel1 = () => {
    setTryJewel("j1");
  }
  const ChangeJewel2 = () => {
    setTryJewel("j2");
  }
  const ChangeJewel3 = () => {
    setTryJewel("j3");
  }
  const handleCam = () =>{
    setCamshow(!camshow);
  }

  return (
    <div className='screen-wrapper'>
      <div className='header-main'>
        <div className='header-inner'>
          <div className='header-user'>
            <div className='back-icon'>
              <Link to="/items">
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
            <Link to="/items" className='user-like'>Likes <span>03</span></Link>
          </div>
        </div>
      </div>
      <div className='content-wrapper itemdetails-wrapper'>
        <div className='itemdetails-wrapper-inner'>
          <div className='itemdetails-upper'>
            <div className='itemdetails-image'>
              {/* <div className='share-icon'><SvgIcon name="share-icon" viewbox="0 0 17.307 18.14" /></div> */}
              <img className='try-person' src={tryItem} alt='' />
              <div className={camshow ? 'camdiv showcam' : 'camdiv hidecam'}>
                <video ref={videoRef} autoPlay playsInline className='cam-area' />
              </div>
              {tryJewel === 'j1' &&
                <img className='pendals-jewel' alt='' src={overlayItem} />
              }
              {tryJewel === 'j2' &&
                <img className='pendals-jewel2' alt='' src={overlayItem2} />
              }
              {tryJewel === 'j3' &&
                <img className='pendals-jewel3' alt='' src={overlayItem3} />
              }
            </div>
          </div>
          <div className='itemdetails-bottom select-jewel'>
              <div className='items-wrapper-row'>
                <div className="list-card" onClick={ChangeJewel1}>
                  <div className='list-card-inner'>
                    <div className='list-card-image'>
                      <img src={overlayItem} alt='' />
                    </div>
                    <div className='list-card-right'>
                      <div>
                        <h4>Hot Neck</h4>
                        <p>$50</p>  
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-card" onClick={ChangeJewel2}>
                  <div className='list-card-inner'>
                    <div className='list-card-image'>
                      <img src={overlayItem2} alt='' />
                    </div>
                    <div className='list-card-right'>
                      <div>
                        <h4>Hot Red Neck</h4>
                        <p>$150</p>  
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-card" onClick={ChangeJewel3}>
                  <div className='list-card-inner'>
                    <div className='list-card-image'>
                      <img src={overlayItem3} alt='' />
                    </div>
                    <div className='list-card-right'>
                      <div>
                        <h4>Hot Neck</h4>
                        <p>$50</p>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className='bottom-action'>
              <Button type='primary' size='small'>Uplaod Photo</Button>
              <Button type='primary' size='small' onClick={handleCam}>User Camera </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsDetailsScreen