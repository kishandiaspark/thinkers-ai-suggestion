import React from 'react';
import AOS from 'aos';
import { Routes, Route } from "react-router-dom";
import 'aos/dist/aos.css';
import './App.scss';
import SwipeScreen from './container/SwipeScreen';
import ItemsScreen from './container/ItemsScreen';
import ItemsDetailsScreen from './container/ItemsDetailsScreen';
import CallScreen from './container/CallScreen';
import SvgSprite from "./SvgSpriteLoader";
//Svg Sprite
import svgFile from './assets/images/svg/svg-sprite.svg';

function App() {
  AOS.init();

  return (
    <>
      <SvgSprite url={svgFile} />
      <Routes>
        <Route path="/" element={<SwipeScreen />} />
        <Route path="/items" element={<ItemsScreen />} />
        <Route path="/item-details" element={<ItemsDetailsScreen />} />
        <Route path="/call" element={<CallScreen />} />
      </Routes>
    </>
  );
}

export default App;