import LandingPageNavBar from './LandingPageNavBar';
import '../styles/landing-page.css';

export default function LandingPage() {
  return (
    <>
      <LandingPageNavBar />
      <div className="landing-page">{/* <h1>Virtual Library</h1> */}</div>
    </>
  );
}
