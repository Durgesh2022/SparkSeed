import Landing from './landing/page';
// import Scroll from './scroll/page';
// import Slideshow from './slider/page'; 
import Logos from './logos/page';
import Team from './Team/page';
import Demo from './demo/page';
import Demo2 from './demo3/page';

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
