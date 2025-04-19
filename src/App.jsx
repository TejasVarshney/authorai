import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Book from './components/Book';
import { BookProvider } from './components/BookContext';

function App() {
  return (
    <>
      <BookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Book/>}/>
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </>
  )
}

export default App
