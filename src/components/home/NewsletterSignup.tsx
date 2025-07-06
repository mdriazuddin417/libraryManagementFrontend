import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <Mail className="h-16 w-16 text-white mx-auto" />
            <h2 className="text-4xl font-bold text-white">
              Don't miss news from BookHaven Library
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new book arrivals, 
              special events, and exclusive reading recommendations.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/90 border-0 text-gray-900 placeholder-gray-500 flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-[48px]">
                Subscribe
              </Button>
            </div>
            <p className="text-cyan-100 text-sm mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
