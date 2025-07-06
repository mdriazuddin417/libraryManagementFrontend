import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FeaturedBooks = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "Digital Innovation",
      author: "Sarah Mitchell",
      category: "SCIENCE",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Creative Mindset",
      author: "David Chen",
      category: "HISTORY",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-yellow-500"
    },
    {
      id: 3,
      title: "Future Vision",
      author: "Maria Rodriguez",
      category: "Science",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Modern Stories",
      author: "James Wilson",
      category: "BIOGRAPHY",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-red-500"
    }
  ];
  const navigation = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Discover Your Next Book</h2>
            <p className="text-gray-600 text-lg">Handpicked recommendations from our collection</p>
          </div>
          <Button onClick={()=>{
            navigation('/books')
          }} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <Card onClick={()=>{
             navigation('/books')
            }} key={book.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white py-0">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${book.color}`}>
                    {book.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-3">by {book.author}</p>
                  
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
