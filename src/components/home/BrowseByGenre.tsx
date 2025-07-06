import { Card, CardContent } from '@/components/ui/card';

const BrowseByGenre = () => {
  const genres = [
    {
      name: "FANTASY",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-gradient-to-br from-pink-400 to-purple-500"
    },
    {
      name: "BIOGRAPHY",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-gradient-to-br from-blue-400 to-indigo-500"
    },
    {
      name: "HISTORY",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-gradient-to-br from-green-400 to-teal-500"
    },
    {
      name: "SCIENCE",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      name: "NON_FICTION",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "bg-gradient-to-br from-gray-400 to-gray-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse Books by Genre</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse collection organized by categories to find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {genres.map((genre, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 overflow-hidden py-0">
              <CardContent className="p-0">
                <div className="relative h-40 ">
                  <div className={`absolute inset-0 ${genre.color} opacity-90`} />
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg text-center px-4">
                      {genre.name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByGenre;
