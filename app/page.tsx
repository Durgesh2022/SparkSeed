import Landing from './components/Landing';
// import Scroll from './scroll/page';
// import Slideshow from './slider/page'; 
import Logos from './components/logos';
import Team from './components/team';
import Demo from './components/WhatAreWe';
import Demo2 from './components/different';

export default function Home() {
  return (
    <div>
      <Landing />
      <Demo />
      {/* <Scroll /> */}
      <Logos />
      {/* <Slideshow /> */}
      <Demo2 />
      <Team />
      
    </div>
  );
}
