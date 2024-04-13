import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BookDetails } from '../types/bookTypes';
import { updateBook } from '../books/bookSlice';

interface BookDetailProps {
  book: BookDetails;
  onClose: () => void;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book, onClose }) => {
  const [editedBook, setEditedBook] = useState(book);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateBook(editedBook));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={editedBook.name} onChange={handleChange} />
      <input name="price" value={editedBook.price} onChange={handleChange} />
      <input name="category" value={editedBook.category} onChange={handleChange} />
      <textarea name="description" value={editedBook.description} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};
