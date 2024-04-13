import React, { useState } from 'react';
import { AddBook } from './components/addBook'; 
import { BookList } from './components/bookList';
import './App.css';

function App() {
  const [showAddBook, setShowAddBook] = useState(false);
  const toggleAddBook = () => setShowAddBook(!showAddBook);

  return (
    <div className='App'>
      <h1>Bookstore</h1>
      <button onClick={toggleAddBook}>Add Book</button>
      {showAddBook && <AddBook onClose={toggleAddBook} />}
      <BookList />
    </div>
  );
}

export default App;
