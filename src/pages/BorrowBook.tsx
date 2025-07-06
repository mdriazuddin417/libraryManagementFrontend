import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBorrowBookMutation, useGetBookQuery } from '../store/libraryApi';

const BorrowBook: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  // Set default due date to 2 weeks from now
  useEffect(() => {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    setFormData(prev => ({
      ...prev,
      dueDate: twoWeeksFromNow.toISOString().split('T')[0],
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.quantity || !formData.dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.quantity > (book?.copies || 0)) {
      toast.error('Quantity exceeds available copies');
      return;
    }

    try {
      await borrowBook({
        book: bookId!,
        quantity: formData.quantity,
        dueDate: new Date(formData.dueDate).toISOString(),
      }).unwrap();

      toast.success('Book borrowed successfully');
      navigate('/borrow-summary');
    } catch {
      toast.error('Failed to borrow book');
    }
  };

  if (isLoadingBook) return <LoadingSpinner />;
  if (!book) return <div className="text-center py-8">Book not found</div>;
  if (!book.available)
    return (
      <div className="text-center py-8">
        This book is not available for borrowing
      </div>
    );

  return (
    <div className=" max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  h-[calc(100vh-15.5rem)] flex justify-center items-center">
      <div className="bg-white shadow-sm rounded-lg w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Borrow Book</h1>
        </div>
        
        <div className="p-6">
          {/* Book Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500 mt-2">
              Available copies: {book.copies}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="quantity">Quantity to Borrow</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max={book.copies}
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum available: {book.copies}
              </p>
            </div>
            
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex gap-4">
              <Button type="submit" disabled={isBorrowing} className="bg-green-600 hover:bg-green-700">
                {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;

