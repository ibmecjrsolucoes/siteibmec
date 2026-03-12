import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ClientsCarousel from './components/ClientsCarousel'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Methodology from './components/Methodology'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingChat from './components/FloatingChat'
import ScrollToTop from './components/ScrollToTop'
import VideoSection from './components/VideoSection'
import WhatsAppButton from './components/WhatsAppButton'
import CoverBanner from './components/CoverBanner'
import ServicosPage from './pages/ServicosPage'
import SobreNosPage from './pages/SobreNosPage'
import ContatoPage from './pages/ContatoPage'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ClientsCarousel />
        <VideoSection />
        <About />
        <Services />
        <CoverBanner />
        <Methodology />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}

/** Rotas do app — View Transitions API cuida da animação no TransLink */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/sobre" element={<SobreNosPage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
