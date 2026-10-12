import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Celebration from './components/Celebration';
import Invitation from './components/Invitation';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-svh bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Invitation />
        <Gallery />
        <Celebration />
        <RsvpForm />
      </main>
      <Footer />
    </div>
  );
}
