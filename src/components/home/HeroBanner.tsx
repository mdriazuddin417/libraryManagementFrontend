import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigation = useNavigate();
  return (
    <section className="relative bg-gradient-to-r from-blue-100 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-blue-600 font-medium text-lg">Discover Stories</p>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                The new collection from
                <span className="block text-blue-600">Digital Library</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore thousands of books, discover new authors, and manage your reading journey 
                with our comprehensive library management system.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={()=>{
                navigation('/books')
              }} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={()=>{
                navigation('/books')
              }} size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Featured Book Collection"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Digital Reading Experience</h3>
                <p className="text-gray-600">Access your favorite books anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;