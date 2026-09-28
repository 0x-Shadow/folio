# Folio

A sophisticated book review platform for discovering, reviewing, and organizing your reading journey.

## Features

- **Advanced Search & Filtering** — Find books by title, author, genre, and ratings
- **Detailed Book Pages** — Comprehensive information including ratings distribution, reviews, and related books
- **Personal Bookshelves** — Organize books into "Read", "Currently Reading", and "Want to Read" shelves
- **Review System** — Read and write detailed reviews with 5-star ratings
- **Recommendations** — Genre-based "Readers Also Enjoyed" suggestions
- **Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** — Clean, intuitive design with a sophisticated literary aesthetic

## Built With

- [React](https://reactjs.org/) — JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) — Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [React Router](https://reactrouter.com/) — Declarative routing for React
- [React Icons](https://react-icons.github.io/react-icons/) — Popular icon library
- [React Toastify](https://fkhadra.github.io/react-toastify/) — Toast notifications
- [date-fns](https://date-fns.org/) — Modern JavaScript date utility library

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

```
node --version
npm --version
```

### Installation

1. Clone the repository
```
git clone <your-repository-url>
```

2. Navigate to the project directory
```
cd folio
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Usage

### Browse Books
Navigate to the **Explore** page to browse the book collection. Use filters to narrow down by:
- Genre (Fiction, Science Fiction, Mystery, etc.)
- Minimum rating (1-5 stars)
- Sort order (Highest rated, Most reviews, etc.)

### View Book Details
Click on any book card to view:
- Full description and metadata
- Rating distribution chart
- Related books recommendations
- User reviews
- Add to bookshelf options

### Manage Your Library
Use the **My Books** page to organize your reading:
- Track books you've read
- Monitor current reading progress
- Build your want-to-read list

### Search Functionality
Use the search bar in the header to quickly find books by:
- Title
- Author
- Genre

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── books/        # Book-related components
│   ├── common/       # Shared UI components
│   ├── layout/       # Layout components (Header, Footer)
│   └── reviews/      # Review components
├── pages/            # Page components
├── data/             # Mock data
├── App.jsx           # Main application component
├── main.jsx          # Entry point
└── index.css         # Global styles and design tokens
```

## License

This project is licensed under the MIT License.
