import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Book.module.css";

async function fetchBook(topic) {
    const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(topic)
    });

    if (!response.ok) {
        throw new Error(`Failed to generate book: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data);
}

function formatContent(content) {
    return content
        .replace(/\*/g, '\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function Book() {
    const navigate = useNavigate();
    const { topic, book, setBook, addToLibrary } = useContext(BookContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Creating your masterpiece');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!topic) {
            navigate('/');
            return;
        }

        const messages = [
            'Brewing creative ideas',
            'Crafting your story',
            'Weaving magical words',
            'Adding final touches',
            'Creating your masterpiece'
        ];

        const messageInterval = setInterval(() => {
            setLoadingMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                return messages[(currentIndex + 1) % messages.length];
            });
        }, 3000);

        if (!book) {
            fetchBook(topic)
                .then(data => {
                    // Flatten chapters array for easier navigation
                    const flattenedPages = data.chapters.flatMap(ch => 
                        ch.chapter.map(page => ({
                            title: page.chapter_name,
                            chapter_number: page.chapter_number,
                            content: page.content,
                            page_number: page.page_number
                        }))
                    );
                    setBook(flattenedPages);
                    addToLibrary(flattenedPages);
                })
                .catch(err => setError(err.message))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }

        return () => clearInterval(messageInterval);
    }, [topic, book, setBook, addToLibrary, navigate]);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingBook}>
                    <div className={styles.bookPage}></div>
                    <div className={styles.bookCover}></div>
                </div>
                <div className={styles.loadingText}>
                    {loadingMessage}
                    <span className={styles.loadingDots}>
                        <span className={styles.dot}>.</span>
                        <span className={styles.dot}>.</span>
                        <span className={styles.dot}>.</span>
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <button className={styles.navButton} onClick={() => navigate('/')}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!book?.length) {
        return (
            <div className={styles.error}>
                <p>No book content available</p>
                <button className={styles.navButton} onClick={() => navigate('/')}>
                    Create New Book
                </button>
            </div>
        );
    }
    
    return (
        <div>
            <h1 className={styles.title}>{topic}</h1>
            <div className={styles.container}>
                <div className={styles.pageContainer}>
                    <h3 className={styles.pageTitle}>Chapter {book[currentPage].chapter_number}: {book[currentPage].title}</h3>
                    <p 
                        className={styles.pageContent}
                        dangerouslySetInnerHTML={{ 
                            __html: formatContent(book[currentPage].content) 
                        }}
                    />
                </div>
                <div className={styles.navigation}>
                    <button 
                        className={styles.navButton}
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                    >
                        ← Previous
                    </button>
                    <span className={styles.pageNumber}>
                        Page {currentPage + 1} of {book.length}
                    </span>
                    <button 
                        className={styles.navButton}
                        onClick={() => setCurrentPage(prev => Math.min(book.length - 1, prev + 1))}
                        disabled={currentPage === book.length - 1}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Book