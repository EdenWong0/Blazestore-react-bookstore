import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookDetails } from '../types/bookTypes';

interface BooksState {
  books: BookDetails[];
}

const initialState: BooksState = {
  books: [],
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookDetails>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    updateBook: (state, action: PayloadAction<BookDetails>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;
