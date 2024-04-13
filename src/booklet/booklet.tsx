import React, { useState, useEffect } from 'react';

interface BookletProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (bookDetails: BookDetails) => void;
  bookDetails?: BookDetails | null; 
}

interface BookDetails {
  name: string;
  price: string;
  category: string;
  description: string;
}

const Booklet: React.FC<BookletProps> = ({ show, bookDetails: initialBookDetails, onClose, onSubmit }) => {
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    if (initialBookDetails) {
      setBookDetails(initialBookDetails);
    } else {
      setBookDetails({ name: '', price: '', category: '', description: '' });
    }
  }, [initialBookDetails]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(bookDetails);
    onClose(); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const isEditing = initialBookDetails !== undefined;

  return (
    <div onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        <span onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={bookDetails.name} onChange={handleChange} placeholder="Book Name" required />
          <input type="text" name="price" value={bookDetails.price} onChange={handleChange} placeholder="Price" required />
          <input type="text" name="category" value={bookDetails.category} onChange={handleChange} placeholder="Category" />
          <textarea name="description" value={bookDetails.description} onChange={handleChange} placeholder="Description" />
          <button type="submit">{isEditing ? 'Update Book' : 'Add Book'}</button>
        </form>
      </div>
    </div>
  );
};

export default Booklet;
