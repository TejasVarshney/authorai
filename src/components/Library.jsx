import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Library.module.css";

function BookCard({ book, onRead, onDelete }) {
    const displayTitle = book.content[0]?.title || book.title || book.topic;
    return (
        <div className={styles.book}>
            <h2 className={styles.bookTitle}>{displayTitle}</h2>
            <p className={styles.bookInfo}>
                {book.content ? `${book.content.length} pages • ` : ''}{new Date(book.dateAdded).toLocaleDateString()}
            </p>
            <div className={styles.buttonGroup}>
                <button 
                    className={styles.button}
                    onClick={() => onRead(book)}
                    title="Read this book"
                >
                    Read Book
                </button>
                <button 
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => onDelete(book.id)}
                    title="Remove from library"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default function Library() {
    const navigate = useNavigate();
    const { library, removeFromLibrary, setTopic, setBook, isDarkMode, toggleTheme } = useContext(BookContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleReadBook = (book) => {
        setTopic(book.title || book.topic);
        setBook(Array.isArray(book.content) ? book.content : [{ content: book.content }]);
        navigate('/book');
    };

    const filteredAndSortedBooks = useMemo(() => {
        return library
            .filter(book => {
                const bookTitle = book.title || book.topic; // fallback to topic if title doesn't exist
                return bookTitle.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .sort((a, b) => {
                const getTitleValue = (book) => book.title || book.topic;
                if (sortBy === 'date') {
                    return sortOrder === 'desc' 
                        ? new Date(b.dateAdded) - new Date(a.dateAdded)
                        : new Date(a.dateAdded) - new Date(b.dateAdded);
                } else if (sortBy === 'title') {
                    return sortOrder === 'desc'
                        ? getTitleValue(b).localeCompare(getTitleValue(a))
                        : getTitleValue(a).localeCompare(getTitleValue(b));
                } else if (sortBy === 'pages') {
                    return sortOrder === 'desc'
                        ? (b.content?.length || 0) - (a.content?.length || 0)
                        : (a.content?.length || 0) - (b.content?.length || 0);
                }
                return 0;
            });
    }, [library, searchTerm, sortBy, sortOrder]);

    if (!library.length) {
        return (
            <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
                <button
                    className={`${styles.button} ${styles.themeButton}`}
                    onClick={toggleTheme}
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <h1 className={styles.title}>Your Library</h1>
                <p className={styles.empty}>Your library is empty. Generate some books to see them here!</p>
                <button 
                    className={styles.button}
                    onClick={() => navigate('/')}
                    title="Create your first book"
                >
                    Create a Book
                </button>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
            <nav className={styles.topNav}>
                <button 
                    className={styles.button}
                    onClick={() => navigate('/')}
                    title="Return to home"
                >
                    ← Home
                </button>
                <button
                    className={`${styles.button} ${styles.themeButton}`}
                    onClick={toggleTheme}
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>
            <h1 className={styles.title}>Your Library</h1>
            <div className={styles.controls}>
                <input
                    type="search"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search books"
                />
                <div className={styles.sortControls}>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.select}
                        aria-label="Sort by"
                    >
                        <option value="date">Date Added</option>
                        <option value="title">Title</option>
                        <option value="pages">Pages</option>
                    </select>
                    <button
                        className={`${styles.button} ${styles.sortButton}`}
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        title={`Currently ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>
            <div className={styles.grid}>
                {filteredAndSortedBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onRead={handleReadBook}
                        onDelete={removeFromLibrary}
                    />
                ))}
            </div>
            {filteredAndSortedBooks.length === 0 && (
                <p className={styles.empty}>No books match your search.</p>
            )}
        </div>
    );
}