import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteBook } from '../books/bookSlice';
import { BookDetail } from '../components/bookInfo'; 
import { BookDetails } from '../types/bookTypes';
import '../App.css';


export const BookList = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null); 

  const handleEditClick = (book: BookDetails) => {
    setSelectedBook(book);
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  return (
    <div className='booklist'>
      {selectedBook ? ( 
        <BookDetail book={selectedBook} onClose={handleCancelEdit} />
      ) : (
        books.map(book => (
          <div key={book.id}>
            <span>Book Name: {book.name}</span>
            <span>Price: ${book.price}</span>
            <span>Category: {book.category}</span>
            <span>Description: {book.description}</span>
            <button onClick={() => handleEditClick(book)}>Edit</button> 
            <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};
