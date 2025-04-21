# AuthorAI ✍️

AuthorAI is a React-based web application that generates unique stories using AI. Users can input any topic, and the application will create a complete book with multiple chapters and pages.

## Features

- 📚 AI-powered story generation from any topic
- 📖 Book-like reading interface with page navigation
- 📱 Responsive design for various screen sizes
- 🌓 Dark/Light theme support
- 📚 Personal library to save and manage generated books
- 📑 Chapter-based navigation
- 🔍 Library search and sorting functionality
- 📊 Reading progress tracking
- ⚡ Font size customization

## Tech Stack

- React 19
- Vite 6
- React Router DOM 7
- CSS Modules for styling
- Local Storage for data persistence

### Backend Repository

The backend for this project is available at: [AuthorAI Backend](https://github.com/TejasVarshney/authorai-backend)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd authorai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API URL:
```env
VITE_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Generating a Book**
   - Enter a topic in the home page input field
   - Click "Generate Book" to create your story
   - Wait for the AI to generate your unique book

2. **Reading**
   - Navigate between pages using arrow keys or navigation buttons
   - Adjust font size using A+/A- controls
   - Toggle dark/light mode for comfortable reading
   - Jump to specific chapters using the chapter navigation

3. **Library Management**
   - Access your saved books from the library
   - Search books by title
   - Sort books by date added, title, or number of pages
   - Delete unwanted books from your collection

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable components
│   └── ...            # Page components
├── utils/              # Utility functions
└── assets/            # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with Vite's React template
- Utilizes React Router for navigation
- Uses local storage for data persistence
- Implements CSS Modules for scoped styling
