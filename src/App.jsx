import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from "./components/Certificate";
import Skills from './components/Skills';
import Connect from './components/Connect';
import Footer from './components/Footer';
import SvgFollowScroll from './components/SvgFollowScroll';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <div className="font-sans antialiased bg-white text-[#1E293B] min-h-screen relative overflow-x-hidden">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar />

      <SvgFollowScroll />

      <Hero isLoading={isLoading} />
      <About />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-20">
        <div className="border-b-2 border-dotted border-gray-300 w-full" />
      </div>
      <Projects />
      <Experience />
      <Certificates />
      <Skills />
      <Connect />
      <Footer />
    </div>
  );
}

export default App;