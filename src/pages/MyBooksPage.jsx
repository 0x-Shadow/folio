import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BookCard from '../components/books/BookCard';
import { mockBooks } from '../data/mockBooks';
import { mockBookshelves, bookshelfTypes } from '../data/mockBookshelves';

const MyBooksPage = () => {
  const [activeShelf, setActiveShelf] = useState('all');

  const shelves = [
    { id: 'all', name: 'All Books', count: mockBookshelves.length },
    { id: bookshelfTypes.READ, name: 'Read', count: mockBookshelves.filter(b => b.shelf === bookshelfTypes.READ).length },
    { id: bookshelfTypes.READING, name: 'Currently Reading', count: mockBookshelves.filter(b => b.shelf === bookshelfTypes.READING).length },
    { id: bookshelfTypes.WANT_TO_READ, name: 'Want to Read', count: mockBookshelves.filter(b => b.shelf === bookshelfTypes.WANT_TO_READ).length },
  ];

  const getFilteredBooks = () => {
    let filtered = mockBookshelves;
    if (activeShelf !== 'all') {
      filtered = filtered.filter(b => b.shelf === activeShelf);
    }
    return filtered.map(shelf => {
      const book = mockBooks.find(b => b.id === shelf.bookId);
      return { ...book, shelfInfo: shelf };
    });
  };

  const filteredBooks = getFilteredBooks();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">My Books</h1>
        <p className="text-navy-600">Organize and track your reading journey</p>
      </div>

      <div className="mb-8 border-b border-cream-200">
        <div className="flex gap-1 overflow-x-auto">
          {shelves.map(shelf => (
            <button
              key={shelf.id}
              onClick={() => setActiveShelf(shelf.id)}
              className={`px-5 py-3 font-medium whitespace-nowrap transition text-sm ${
                activeShelf === shelf.id
                  ? 'border-b-2 border-navy-800 text-navy-800'
                  : 'text-navy-500 hover:text-navy-900'
              }`}
            >
              {shelf.name}
              <span className="ml-2 text-xs bg-cream-200 text-navy-600 px-2 py-0.5 rounded-full">
                {shelf.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              {book.shelfInfo?.progress && (
                <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg p-3 shadow-md border border-cream-200">
                  <div className="flex justify-between text-xs text-navy-600 mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium">{book.shelfInfo.progress}%</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2">
                    <div
                      className="bg-navy-700 h-2 rounded-full transition-all"
                      style={{ width: `${book.shelfInfo.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream-100 rounded-lg">
          <p className="text-navy-600">No books in this shelf yet.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default MyBooksPage;
