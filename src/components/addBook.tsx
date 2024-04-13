import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../books/bookSlice';


interface AddBookProps {
    onClose: () => void;
  }

export const AddBook: React.FC<AddBookProps> = ({ onClose }) => {
  const [bookDetails, setBookDetails] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDetails.name || !bookDetails.price) {
      return;
    }
    dispatch(addBook({ ...bookDetails, id: Date.now()}));
    setBookDetails({ name: '', price: '', category: '', description: '' }); 
    onClose();
  };

  return (
    <div className='addbook'>
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={bookDetails.name}
                onChange={handleChange}
                placeholder="Book Name"
                required
            />
            <input
                name="price"
                value={bookDetails.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                name="category"
                value={bookDetails.category}
                onChange={handleChange}
                placeholder="Category"
            />
            <textarea
                name="description"
                value={bookDetails.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button type="submit">Add to Bookstore</button>
        </form>
    </div>
  );
};
