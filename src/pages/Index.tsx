
import BrowseByGenre from '@/components/home/BrowseByGenre';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroBanner from '@/components/home/HeroBanner';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import NotedLibrarians from '@/components/home/NotedLibrarians';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BookOpen, Clock, Shield, Users } from 'lucide-react';
import { useGetBooksQuery, useGetBorrowSummaryQuery } from '../store/libraryApi';

const Index = () => {
  const { data: books } = useGetBooksQuery();
  const { data: borrowSummary,isLoading: isLoadingBorrowSummary } = useGetBorrowSummaryQuery();

  const totalBooks = books?.data?.length || 0;
  const availableBooks = books?.data?.filter(book => book.available).length || 0;
  const totalBorrowed = borrowSummary?.data?.reduce((sum, item) => sum + item.totalQuantity, 0) || 0;

  if (isLoadingBorrowSummary) return (
    <div className='flex justify-center items-center h-[calc(100vh-15.5rem)]'>
      <LoadingSpinner />
    </div>
  );

  return (
    <div className=" bg-white">

      {/* Hero Section */}
      <HeroBanner/>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalBooks}</div>
          <div className="text-gray-600">Total Books</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{availableBooks}</div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalBorrowed}</div>
          <div className="text-gray-600">Total Borrowed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{borrowSummary?.data.length || 0}</div>
          <div className="text-gray-600">Unique Titles</div>
        </div>
      </div>
      <BrowseByGenre/>
      <FeaturedBooks/>
      <NotedLibrarians/>
      <NewsletterSignup/>


      

    </div>
  );
};

export default Index;
