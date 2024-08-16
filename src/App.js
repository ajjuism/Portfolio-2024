import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import CustomCursor from './components/CustomCursor';
import AudioPlayer from './components/AudioPlayer';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  height: 100vh;
  overflow-y: auto;
  pointer-events: ${props => props.isHome ? 'none' : 'auto'};
`;

const PageContent = styled.div`
  padding: 40px 20px 120px 220px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 100px 20px 140px;
  }
`;

const AudioControlWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const CopyrightText = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #FFFFFF;
  font-family: 'syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  z-index: 2;
  display: ${props => props.isHome ? 'block' : 'none'};

  @media (max-width: 768px) {
    font-size: 16px;
    bottom: 10px;
    right: 0;
    left: 0;
    text-align: center;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #030303;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #FFF8DC;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <AppContainer>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <OrbitControls enableZoom={true} enablePan={true} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </CanvasContainer>
      <ContentContainer isHome={isHome}>
        <Navigation isHome={isHome} />
        <PageContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PageContent>
      </ContentContainer>
      <CopyrightText isHome={isHome}>© AJJUISM.COM</CopyrightText>
      <CustomCursor />
      <AudioControlWrapper>
        <AudioPlayer />
      </AudioControlWrapper>
    </AppContainer>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.remove();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <Router>
      <GlobalStyle />
      <AppContent />
    </Router>
  );
}

export default App;