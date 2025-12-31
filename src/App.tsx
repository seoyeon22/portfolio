import './App.css'
import './i18n';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Skills from './pages/Skills';

function App() {
  return (
    <Router> 
      <div className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-grow bg-black/6 dark:bg-black/80">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />}/>
              <Route path="/skills" element={<Skills />}/>
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
