import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MobileScaleContext, useMobileLandscapeDetection } from './contexts/MobileScaleContext'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import main4 from './assets/main4.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import SideProjectsPage from './SideProjectsPage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'


function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => {
        if (page === "github") {
          window.open("https://github.com/rhushi-07", "_blank");
        } else {
          navigate(`/${page}`);
        }
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><SideProjectsPage src={main4} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}



// --- FULLSCREEN HELPER ---
const requestFullScreen = () => {
  if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  }
};

// --- MANDATORY FULLSCREEN OVERLAY ---
function MandatoryFullscreenOverlay({ onEnter }) {
  return (
    <div 
      onClick={onEnter}
      style={{
      position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 999999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff', textAlign: 'center', padding: '2rem', cursor: 'pointer'
    }}>
      <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', marginBottom: '1.5rem' }}>Welcome</h1>
      <button 
        style={{ padding: '15px 30px', fontSize: '1.2rem', background: '#fff', border: 'none', color: '#000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        TAP FOR FULLSCREEN
      </button>
      <p style={{ marginTop: '1.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Fullscreen is required on mobile devices.</p>
    </div>
  );
}

// --- PORTRAIT OVERLAY COMPONENT ---
function PortraitOverlay() {
  return (
    <div 
      onClick={requestFullScreen}
      style={{
      position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff', textAlign: 'center', padding: '2rem', cursor: 'pointer'
    }}>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>
        <path d="M2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z"></path>
        <path d="M12 8v4l3 3"></path>
      </svg>
      <h2 style={{ fontFamily: 'inherit', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Please Rotate Your Device</h2>
      <p style={{ opacity: 0.8, marginBottom: '1rem' }}>This experience requires Landscape mode.</p>
    </div>
  );
}

// --- VIRTUAL GAMEPAD COMPONENT ---
function MobileGamepad() {
  const triggerKey = (keyName, keyCode) => {
    requestFullScreen(); // Ensure we are in fullscreen when playing
    const event = new KeyboardEvent('keydown', {
      key: keyName,
      code: keyName,
      keyCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="mobile-gamepad">
      <div className="keyboard-arrows">
        <button className="p3-game-btn k-btn-up" onTouchStart={(e) => { e.preventDefault(); triggerKey('ArrowUp', 38); }}><span>↑</span></button>
        <button className="p3-game-btn k-btn-left" onTouchStart={(e) => { e.preventDefault(); triggerKey('ArrowLeft', 37); }}><span>←</span></button>
        <button className="p3-game-btn k-btn-down" onTouchStart={(e) => { e.preventDefault(); triggerKey('ArrowDown', 40); }}><span>↓</span></button>
        <button className="p3-game-btn k-btn-right" onTouchStart={(e) => { e.preventDefault(); triggerKey('ArrowRight', 39); }}><span>→</span></button>
      </div>
      <div className="action-pad">
        <button className="p3-game-btn action-btn-p3" onTouchStart={(e) => { e.preventDefault(); triggerKey('Enter', 13); }}>
          <span>ENTER</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const { isMobile, isPortrait } = useMobileLandscapeDetection();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
    };
    
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, [isMobile]);

  const handleEnterExperience = () => {
    requestFullScreen();
    setIsFullscreen(true);
  };

  // Intercept touch events to disable native touching on menu elements, while allowing mouse events.
  const handleTouchBlock = (e) => {
    if (isMobile) {
      // Don't block touches on the gamepad itself
      if (!e.target.closest('.mobile-gamepad') && !e.target.closest('button')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  // If on mobile and NOT in fullscreen, force the user to tap to enter.
  if (isMobile && !isFullscreen) {
    return <MandatoryFullscreenOverlay onEnter={handleEnterExperience} />;
  }

  const { scale: contextScale } = useContext(MobileScaleContext);
  const scale = isMobile ? contextScale : 1;
  const invScale = isMobile ? (1 / contextScale) : 1;
  
  const wrapperStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${100 * invScale}%`,
    height: `${100 * invScale}%`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    containerType: 'size',
    overflow: 'hidden'
  };

  return (
    <div 
      onTouchStartCapture={handleTouchBlock}
      style={wrapperStyle}
    >
      <AnimatedRoutes />
      
      {/* Show Gamepad on Mobile (even if portrait, though it will be covered by overlay) */}
      {isMobile && <MobileGamepad />}
      
      {/* Show Portrait blocker on Mobile when in portrait mode */}
      {isMobile && isPortrait && <PortraitOverlay />}
    </div>
  );
}