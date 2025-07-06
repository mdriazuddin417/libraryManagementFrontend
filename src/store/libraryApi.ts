
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies?: number;
  createdAt?: string;
  updatedAt?: string;
  available?: boolean;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface UpdateBookRequest {
  id: string;
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies?: number;
  available?: boolean;
}

export interface BorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowResponse {
  success: boolean;
  data: {
    book?: string;
    quantity?: number;
    dueDate?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  message: string;
}


export interface BorrowSummary {
  title: string;
  isbn: string;
  totalQuantity: number;
}

export interface BorrowSummaryResponse {
  success: boolean;
  data: BorrowSummary[];
  message: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  data: null;
}





export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-omega-jade.vercel.app/api/' }),
  tagTypes: ['Book', 'BorrowSummary'],
  endpoints: (builder) => ({
    getBooks: builder.query<{success: boolean, data: Book[], message: string}, void>({
      query: () => 'books',
      providesTags: ['Book'],
    }),
    getBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ['Book'],
      transformResponse: (response: { success: boolean, data: Book, message: string }) => response.data
    }),
    createBook: builder.mutation<Book, CreateBookRequest>({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, UpdateBookRequest>({
      query: ({ id, ...book }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    borrowBook: builder.mutation<BorrowResponse, BorrowRequest>({
      query: (borrowRequest) => ({
        url: 'borrow',
        method: 'POST',
        body: borrowRequest,
      }),
      invalidatesTags: ['Book', 'BorrowSummary'],
    }),
    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => 'borrow',
      providesTags: ['BorrowSummary'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = libraryApi;
