import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Celebration from './components/Celebration';
import Invitation from './components/Invitation';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import MessageDuCoeur from './components/MessageDuCoeur';

export default function App() {
  return (
    <div className="min-h-svh bg-paper">
      <Navbar />
      <main>
        <Hero />
        <MessageDuCoeur />
        <Invitation />
        <Gallery />
        <Celebration />
        <RsvpForm />
      </main>
      <Footer />
    </div>
  );
}
