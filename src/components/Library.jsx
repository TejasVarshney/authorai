import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Library.module.css";

function BookCard({ book, onRead, onDelete }) {
    return (
        <div className={styles.book}>
            <h2 className={styles.bookTitle}>{book.topic}</h2>
            <p className={styles.bookInfo}>
                {book.content ? `${book.content.length} pages • ` : ''}{new Date(book.dateAdded).toLocaleDateString()}
            </p>
            <div className={styles.buttonGroup}>
                <button 
                    className={styles.button}
                    onClick={() => onRead(book)}
                >
                    Read Book
                </button>
                <button 
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => onDelete(book.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default function Library() {
    const navigate = useNavigate();
    const { library, removeFromLibrary, setTopic, setBook } = useContext(BookContext);

    const handleReadBook = (book) => {
        setTopic(book.topic);
        // For older books without flattened structure, we'll keep the old format
        // For new books, we'll use the flattened pages array
        setBook(Array.isArray(book.content) ? book.content : [{ content: book.content }]);
        navigate('/book');
    };

    if (!library.length) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Your Library</h1>
                <p className={styles.empty}>Your library is empty. Generate some books to see them here!</p>
                <button 
                    className={styles.button}
                    onClick={() => navigate('/')}
                >
                    Create a Book
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Library</h1>
            <div className={styles.grid}>
                {library.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onRead={handleReadBook}
                        onDelete={removeFromLibrary}
                    />
                ))}
            </div>
        </div>
    );
}