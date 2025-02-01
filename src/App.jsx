import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { HelmetProvider, Helmet } from "react-helmet-async";

import * as Sentry from '@sentry/react';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Apple Clone - My Project" />
        <meta property="og:description" content="A beautifully designed Apple clone built with React & Three.js." />
        <meta property="og:image" content="https://apple-my.vercel.app/preview.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apple Clone - My Project" />
        <meta name="twitter:description" content="A beautifully designed Apple clone built with React & Three.js." />
        <meta name="twitter:image" content="https://apple-my.vercel.app/preview.jpg" />
        <meta name="twitter:url" content={window.location.href} />
      </Helmet>
      
      <main className="bg-black">
        <Navbar />
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </HelmetProvider>
  )
}

export default Sentry.withProfiler(App);
