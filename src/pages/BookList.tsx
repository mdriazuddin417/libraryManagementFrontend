
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import LoadingSpinner from '../components/LoadingSpinner';
import { useDeleteBookMutation, useGetBooksQuery } from '../store/libraryApi';

const BookList: React.FC = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);


  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      
      toast.success('Book deleted successfully');
      setDeleteConfirm(null);
    } catch {
      
      toast.error('Failed to delete book');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center py-8">Error loading books</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
        <Link to="/create-book">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New Book
          </Button>
        </Link>
      </div>

      {books && books?.data?.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books?.data?.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">by {book.author}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.isbn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {book.copies} available
                        {/* {book.availableCopies} / {book.copies} available */}
                      </div>
                      <div className={`text-xs ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                        {book.available ? 'Available' : 'Not Available'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/books/${book._id}`}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(book._id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {book.available && (
                        <Link
                          to={`/borrow/${book._id}`}
                          className="text-green-600 hover:text-green-900 inline-flex items-center cursor-pointer"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new book.</p>
          <div className="mt-6">
            <Link to="/create-book">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Add New Book
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed backdrop-blur-sm inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Book</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
