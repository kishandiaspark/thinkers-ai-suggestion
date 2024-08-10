import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '../../components/svg-icon/svg-icon';
import { Button, Calendar, Card } from 'antd';
import TinderCard from 'react-tinder-card';
import './index.scss';
import CompanyLogo from '../../assets/images/company.svg';
import Slide1 from '../../assets/images/slide1.webp';
import Slide2 from '../../assets/images/slide2.webp';
import Slide3 from '../../assets/images/slide3.webp';

const listItems = [
  {productCode: "PB1012", url:"/details", name: "Platinum Rhythmic Moments", image: Slide1, description: 'Crafted in long-lasting platinum, one of the most durable metals to exist, the design features an alternating play of subtle and'},
  {productCode: "PB1013", url:"/details", name: "Platinum Rhythmic Moments", image: Slide2, description: 'Crafted in long-lasting platinum, one of the most durable metals to exist, the design features an alternating play of subtle and'},
  {productCode: "PB1014", url:"/details", name: "Platinum Rhythmic Moments", image: Slide3, description: 'Crafted in long-lasting platinum, one of the most durable metals to exist, the design features an alternating play of subtle and'},
  {productCode: "PB1015", url:"/details", name: "Platinum Rhythmic Moments", image: Slide1, description: 'Crafted in long-lasting platinum, one of the most durable metals to exist, the design features an alternating play of subtle and'},
  {productCode: "PB1016", url:"/details", name: "Platinum Rhythmic Moments", image: Slide2, description: 'Crafted in long-lasting platinum, one of the most durable metals to exist, the design features an alternating play of subtle and'},
]

const SwipeScreen = () => {

  const [currentIndex, setCurrentIndex] = useState(listItems.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [count, setCount] = useState(0);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(listItems.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < listItems.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < listItems.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  // modal 
  const [isModalVisible, setIsModalVisible] = useState(true);
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const refreshPage = ()=>{
    window.location.reload();
  }

  const handleLikeClick = () => {
    setCount(count + 1);
  };
  
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  
  return (
    <div className='screen-wrapper'>
      <div className='header-main'>
        <div className='header-inner'>
          <div className='header-user'>
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
            <Link to="/items" className='user-like'>Likes <span>{count}</span></Link>
          </div>
        </div>
      </div>
      <div className='content-wrapper swipescreen-wrapper'>
        {isModalVisible &&
          <div className='overlay-modal'>
            <div className='overlaymodal-inner'>
                <div className='overlaymodal-upper'></div>
                <div className='overlaymodal-middle'>
                  <p>Here’s some specially curated masterpieces for you</p>
                  <Button onClick={handleCancel}>Go ahead and check it</Button>
                </div>
                <div className='overlaymodal-bottom'>
                  <p>You can like / dislike the suggestions</p>
                  <div className="overlaymodal-action">
                    <div className='dislike-btn'>
                      <SvgIcon name="dislike" viewbox="0 0 29.589 26.331" />
                      Dislike
                    </div>
                    <div className='like-btn'>
                      <SvgIcon name="like" viewbox="0 0 29.279 25.845" />
                      Like
                    </div>
                  </div>
                </div>
            </div>
          </div>
        }
        <div className='swipescreen-wrapper-inner'>
          <p className='swap-title'>{canGoBack ? 'How about this' : 'You purchased this ring' }</p>
          <div className="swipescreen-main">
            {/* <Link to='/item-details'><Button type='primary' className='try-btn'>Try Now</Button></Link> */}
            <div className='cardContainer'>
              {listItems.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className='swipe'
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <Card>
                    <div className='plane-icon'><SvgIcon name="share-icon" viewbox="0 0 17.307 18.14" /></div>
                    <div className='card-image'>
                      <img src={character.image} alt={character.image} />
                    </div>
                    <div className='card-bottom'>
                      <Link to="/details"><h4>{character.name}</h4></Link>
                      <p className='mb-2 mt-2'>Product Code - {character.productCode}</p>
                      <p>{character.description}</p>
                    </div>
                  </Card>
                </TinderCard>
              ))}
            </div>
            <div className="action-btn">
              <Button className='like-btn' onClick={() => swipe('left')}>
                <SvgIcon name="dislike" viewbox="0 0 29.589 26.331" />
                Dislike
              </Button>
              <Button className='dislike-btn' onClick={() => {swipe('right'); handleLikeClick();}}>
                <SvgIcon name="like" viewbox="0 0 29.279 25.845" />
                Like
              </Button>
            </div>
          </div>
        </div>
        {!canSwipe && 
          <div className='screen-wrapper callwrapper-swipe'>
            <div className='header-main'>
              <div className='header-inner'>
                <div className='header-user'>
                  <div className='back-icon'>
                    <Link to="/" onClick={refreshPage}>
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
            <div className='content-wrapper call-wrapper'>
              <div className='call-wrapper-inner'>
                <div className='thankyou'>
                  <div className='thankyou-inner'>
                    <SvgIcon name="thumb-up" viewbox="0 0 51.529 52.055" />
                    <p>Book an appointment</p>
                    <div>
                      <Calendar fullscreen={false} />
                    </div>
                  </div>
                </div>
                <div className='call-bottom'>
                  <p>For More Info please call</p>
                  <Button className='call-btn'><SvgIcon name="call-icon" viewbox="0 0 30.257 30.252" /> Call</Button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SwipeScreen