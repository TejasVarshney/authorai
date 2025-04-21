import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Book from './components/Book';
import Library from './components/Library';
import { BookProvider } from './components/BookContext';

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book/>} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;