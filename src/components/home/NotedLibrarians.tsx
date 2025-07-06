import { Card, CardContent } from '@/components/ui/card';

const NotedLibrarians = () => {
  const librarians = [
    {
      name: "MD. Riaz Uddin",
      title: "Chief Librarian",
      image: "https://simgbb.com/avatar/TcHyYX1XcQ9n.png",
      specialty: "Digital Archives"
    },
    {
      name: "Michael Chen",
      title: "Research Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      specialty: "Academic Resources"
    },
    {
      name: "Emily Davis",
      title: "Community Outreach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      specialty: "Public Programs"
    },
    {
      name: "Robert Wilson",
      title: "Technology Coordinator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      specialty: "Digital Innovation"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Librarians</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our dedicated team of librarians is here to help you discover, explore, and enjoy our vast collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {librarians.map((librarian, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img
                    src={librarian.image}
                    alt={librarian.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-white shadow-lg group-hover:ring-orange-200 transition-all duration-300"
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">{librarian.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{librarian.title}</p>
                <p className="text-gray-600 text-sm">{librarian.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotedLibrarians;
