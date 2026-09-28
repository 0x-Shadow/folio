<div align="center">

# 📚 Folio

**A sophisticated book review platform for discovering, reviewing, and organizing your reading journey.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-102a43?style=for-the-badge&logo=github)](https://0x-shadow.github.io/folio)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

**[🌐 Live Demo](https://0x-shadow.github.io/folio)** · **[Report a Bug](https://github.com/0x-Shadow/folio/issues)** · **[Request a Feature](https://github.com/0x-Shadow/folio/issues)**

</div>

---

## ✨ Features

- **🔍 Advanced Search & Filtering** — Find books by title, author, genre, and minimum rating
- **📖 Detailed Book Pages** — Full descriptions, metadata, rating distribution charts, and reviews
- **💡 Smart Recommendations** — Genre-based *"Readers Also Enjoyed"* suggestions on every book page
- **📚 Personal Bookshelves** — Organize books into *Read*, *Currently Reading*, and *Want to Read*
- **⭐ Review System** — Read community reviews with 5-star ratings and helpfulness counts
- **📱 Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- **🎨 Sophisticated Design** — Deep navy + amber literary aesthetic with serif typography

## 📸 Screenshots

### Home — Featured, Trending & Top Rated

![Folio home page](./screenshots/home.png)

### Explore — Search, Filter & Sort

![Folio explore page](./screenshots/explore.png)

### Book Details — Description, Ratings & Recommendations

![Folio book detail page](./screenshots/book_detail.png)

### My Books — Personal Bookshelves

![Folio my books page](./screenshots/my_books.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://reactjs.org/) | UI library |
| [Vite 7](https://vitejs.dev/) | Build tooling & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling with custom design tokens |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon set |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [date-fns](https://date-fns.org/) | Date formatting utilities |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm (comes with Node.js)

```bash
node --version
npm --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/0x-Shadow/folio.git

# 2. Navigate into the project
cd folio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser and visit **http://localhost:5173**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

## 💻 Usage

### Browse Books

Go to the **Explore** page and narrow the collection by:

- Genre (Fiction, Science Fiction, Mystery, …)
- Minimum rating (1–5 stars)
- Sort order (Highest rated, Most reviews, Recently added, Title A–Z)

### View Book Details

Click any book card to see:

- Full description and metadata (pages, year, language, ISBN)
- Star rating with total ratings & review counts
- Rating distribution chart
- *Readers Also Enjoyed* recommendations
- Community reviews and shelf actions

### Manage Your Library

Use the **My Books** page to organize your reading:

- Track finished books on the *Read* shelf
- Monitor progress on *Currently Reading*
- Build your *Want to Read* list

### Search

Use the header search bar to find books instantly by title, author, or genre.

## 📁 Project Structure

```
folio/
├── public/                 # Static assets
├── screenshots/            # README screenshots
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── books/          # BookCard, BookGrid, FilterPanel
│   │   ├── common/         # Button, Card, Badge, Rating, Avatar
│   │   ├── layout/         # Header, Footer, PageContainer
│   │   └── reviews/        # ReviewCard
│   ├── data/               # Mock data (books, reviews, shelves)
│   ├── pages/              # Home, Explore, BookDetail, MyBooks, Search
│   ├── App.jsx             # Routes & app shell
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind + custom design tokens
├── index.html
├── vite.config.js
└── package.json
```

## 🗺️ Roadmap

- [ ] Real backend API + database
- [ ] User authentication & profiles
- [ ] Write-a-review form with persistence
- [ ] Reading goals & challenges
- [ ] Social features (follow readers, activity feed)
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! This project is intentionally structured to be easy to contribute to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please run `npm run lint` and `npm run build` before submitting a PR.

## 👤 Author

**0x-Shadow**

- GitHub: [@0x-Shadow](https://github.com/0x-Shadow)
- Project link: [https://github.com/0x-Shadow/folio](https://github.com/0x-Shadow/folio)
- Live demo: [https://0x-shadow.github.io/folio](https://0x-shadow.github.io/folio)

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
