
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Edit } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetBookQuery } from '../store/libraryApi';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center py-8">Error loading book details</div>;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="mb-6">
        <Link to="/books" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
              <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
            </div>
            <div className="flex space-x-3">
              <Link to={`/edit-book/${book._id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              {book.available && (
                <Link to={`/borrow/${book._id}`}>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Borrow
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Genre</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-1">
                  {book.genre}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                <p className="text-gray-900 mt-1 font-mono">{book.isbn}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                <div className="mt-1">
                  <div className="text-lg font-semibold text-gray-900">
                     {book.copies} available
                    {/* {book.availableCopies} / {book.copies} available */}
                  </div>
                  <div className={`text-sm font-medium ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                    {book.available ? 'Available for borrowing' : 'Currently unavailable'}
                  </div>
                </div>
              </div>
            </div>

            {book.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-900 leading-relaxed">{book.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
