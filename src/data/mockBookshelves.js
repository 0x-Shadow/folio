// The three shelves a reader can keep a book on.
// The string values are what get saved in localStorage, so never change them
// without a migration — existing shelves would stop matching the filters.
//
// NOTE: keep this filename lowercase. Linux CI imports it case-sensitively.
export const bookshelfTypes = {
  READ: 'read',
  READING: 'currently-reading',
  WANT_TO_READ: 'want-to-read',
};

// The same shelves written out for people to read (toasts, labels).
export const bookshelfLabels = {
  [bookshelfTypes.READ]: 'Read',
  [bookshelfTypes.READING]: 'Currently reading',
  [bookshelfTypes.WANT_TO_READ]: 'Want to read',
};

// Starting shelves for a brand-new account, so the app is useful on first run.
export const mockBookshelves = [
  { userId: 1, bookId: 1, shelf: bookshelfTypes.READ },
  { userId: 1, bookId: 2, shelf: bookshelfTypes.READ },
  { userId: 1, bookId: 3, shelf: bookshelfTypes.READING },
  { userId: 1, bookId: 4, shelf: bookshelfTypes.WANT_TO_READ },
];
