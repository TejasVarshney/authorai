import { useState, useContext, useEffect } from "react";
import BookContext from "./BookContext";
import styles from "./Book.module.css";

async function fetchBook(topic) {
    try {
        const response = await fetch("http://127.0.0.1:8000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(topic)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return JSON.parse(data);

    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
}

function Book() {
    const [topic, setTopic, book, setBook] = useContext(BookContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchBook(topic);
                setBook(data.response);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadBook();
    }, [topic, setBook]);

    if (isLoading) {
        return <div className={styles.loadingSpinner}>Creating your masterpiece... 📚✨</div>;
    }

    if (error) {
        return <div className={styles.error}>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
        </div>;
    }

    if (!book || !book.length) {
        return <div className={styles.error}>No book content available</div>;
    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{topic}</h1>
            <div className={styles.pageContainer}>
                <h3 className={styles.pageTitle}>{book[currentPage].content_title}</h3>
                <p className={styles.pageContent}>{book[currentPage].content}</p>
            </div>
            <div className={styles.navigation}>
                <button 
                    className={styles.navButton}
                    onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
                    disabled={currentPage === 0}
                >
                    ← Previous
                </button>
                <span className={styles.pageNumber}>Page {currentPage + 1} of {book.length}</span>
                <button 
                    className={styles.navButton}
                    onClick={() => setCurrentPage(currentPage < book.length - 1 ? currentPage + 1 : currentPage)}
                    disabled={currentPage === book.length - 1}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

export default Book