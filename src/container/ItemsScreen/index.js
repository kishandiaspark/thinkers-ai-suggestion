import React from 'react';
import SvgIcon from '../../components/svg-icon/svg-icon';
import { Link } from 'react-router-dom';
import './index.scss';

import CompanyLogo from '../../assets/images/company.svg';
import ListImage1 from '../../assets/images/list1.png';
import ListImage2 from '../../assets/images/list2.png';
import ListImage3 from '../../assets/images/list3.png';
import ListImage4 from '../../assets/images/list4.png';
import ListImage5 from '../../assets/images/list5.png';
import ListImage6 from '../../assets/images/list6.png';

const data = [
  {
    id: 'PB1012',
    image: ListImage1,
    title: 'Platinum Rhythmic Moments',
  },
  {
    id: 'PB1013',
    image: ListImage2,
    title: 'Platinum Rhythmic Moments',
  },
  {
    id: 'PB1014',
    image: ListImage3,
    title: 'Platinum Rhythmic Moments',
  },
  // {
  //   id: 'PB1015',
  //   image: ListImage4,
  //   title: 'Platinum Rhythmic Moments',
  // },
  // {
  //   id: 'PB1016',
  //   image: ListImage5,
  //   title: 'Platinum Rhythmic Moments',
  // },
  // {
  //   id: 'PB1017',
  //   image: ListImage6,
  //   title: 'Platinum Rhythmic Moments',
  // },
];

const ItemsScreen = () =>{
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
      <div className='content-wrapper items-wrapper'>
          <div className='items-wrapper-inner'>
            {data.map(item => 
              <div className='items-wrapper-row'>
                <div className="list-card">
                  <div className='list-card-inner'>
                    <div className='list-card-image'>
                      <Link to="/item-details"><img src={item.image} alt={item.image} /></Link>
                    </div>
                    <div className='list-card-right'>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.id}</p>  
                      </div>
                    </div>
                  </div>
                </div>
                <button className='remove-item'><SvgIcon name="close" viewbox="0 0 30.72 30.721" /></button>
              </div>
            )
            }
          </div>
      </div>
    </div>
  )
}

export default ItemsScreen