
import { BarChart3 } from 'lucide-react';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetBorrowSummaryQuery } from '../store/libraryApi';

const BorrowSummary: React.FC = () => {
  const { data: borrowSummary, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center py-8">Error loading borrow summary</div>;

  const totalBooksBorrowed = borrowSummary?.data?.reduce((sum, item) => sum + item.totalQuantity, 0) || 0;



  return (
    <div className="space-y-6 min-h-[calc(100vh-15.5rem)] max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{borrowSummary?.data?.length || 0}</div>
          <div className="text-gray-600">Unique Books Borrowed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{totalBooksBorrowed}</div>
          <div className="text-gray-600">Total Copies Borrowed</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">
            {totalBooksBorrowed > 0 ? (totalBooksBorrowed / (borrowSummary?.data?.length || 1)).toFixed(1) : '0'}
          </div>
          <div className="text-gray-600">Average per Book</div>
        </div>
      </div>

      {borrowSummary && borrowSummary?.data.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Borrowed Books Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Quantity Borrowed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowSummary?.data
                 
                  ?.map((item, index) => (
                    <tr key={item.isbn} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">{item.isbn}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600">
                          {item.totalQuantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  borrowSummary?.data && borrowSummary.data.length > 0
                                    ? (item.totalQuantity / Math.max(...borrowSummary.data.map(s => s.totalQuantity))) * 100
                                    : 0
                                }%`
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books borrowed yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start borrowing books to see the summary here.</p>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
