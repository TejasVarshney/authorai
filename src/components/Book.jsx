import { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Book.module.css";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { Navigation } from "./common/Navigation";
import { PageContent } from "./common/PageContent";
import { 
    fetchBook, 
    calculateReadingTime, 
    getUniqueChapters,
    loadingMessages 
} from "../utils/bookUtils";

function Book() {
    const navigate = useNavigate();
    const { topic, book, setBook, addToLibrary, isDarkMode, toggleTheme } = useContext(BookContext);
    const [currentPage, setCurrentPage] = useState(() => {
        const saved = localStorage.getItem(`reading-progress-${topic}`);
        return saved ? parseInt(saved, 10) : 0;
    });
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    const [error, setError] = useState(null);
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('preferred-font-size');
        return saved ? parseFloat(saved) : 1.1;
    });
    const [showChapterList, setShowChapterList] = useState(false);

    // Save reading progress when page changes
    useEffect(() => {
        if (topic && currentPage !== undefined) {
            localStorage.setItem(`reading-progress-${topic}`, currentPage.toString());
        }
    }, [currentPage, topic]);

    // Save font size preference when it changes
    useEffect(() => {
        localStorage.setItem('preferred-font-size', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft' && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            } else if (e.key === 'ArrowRight' && currentPage < (book?.length || 0) - 1) {
                setCurrentPage(prev => prev + 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentPage, book?.length]);

    useEffect(() => {
        if (!topic) {
            navigate('/');
            return;
        }

        const messageInterval = setInterval(() => {
            setLoadingMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                return loadingMessages[(currentIndex + 1) % loadingMessages.length];
            });
        }, 3000);

        if (!book) {
            fetchBook(topic)
                .then(data => {
                    const flattenedPages = data.chapters.flatMap(ch => 
                        ch.chapter.map(page => ({
                            title: data.title,
                            chapter_name: page.chapter_name,
                            chapter_number: page.chapter_number,
                            content: page.content,
                            page_number: page.page_number
                        }))
                    );
                    setBook(flattenedPages);
                    addToLibrary({ ...flattenedPages[0], content: flattenedPages });
                })
                .catch(err => setError(err.message))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }

        return () => clearInterval(messageInterval);
    }, [topic, book, setBook, addToLibrary, navigate]);

    const adjustFontSize = (delta) => {
        setFontSize(prev => Math.min(Math.max(0.8, prev + delta), 1.6));
    };

    const chapters = useMemo(() => getUniqueChapters(book), [book]);

    const navigateToChapter = (chapterNumber) => {
        const pageIndex = book.findIndex(page => page.chapter_number === chapterNumber);
        if (pageIndex !== -1) {
            setCurrentPage(pageIndex);
            setShowChapterList(false);
        }
    };

    const readingTimeInfo = useMemo(() => {
        if (!book) return null;
        
        const totalMinutes = book.reduce((acc, page) => 
            acc + calculateReadingTime(page.content), 0
        );
        const remainingMinutes = book.slice(currentPage).reduce((acc, page) => 
            acc + calculateReadingTime(page.content), 0
        );
        
        return {
            total: totalMinutes,
            remaining: remainingMinutes
        };
    }, [book, currentPage]);

    if (isLoading) {
        return <LoadingSpinner message={loadingMessage} />;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <button className={styles.navButton} onClick={() => navigate('/')}>Try Again</button>
            </div>
        );
    }

    if (!book?.length) {
        return (
            <div className={styles.error}>
                <p>No book content available</p>
                <button className={styles.navButton} onClick={() => navigate('/')}>Create New Book</button>
            </div>
        );
    }
    
    return (
        <div className={isDarkMode ? styles.darkMode : ''}>
            <Navigation 
                onHome={() => navigate('/')}
                onLibrary={() => navigate('/library')}
                onFontSizeChange={adjustFontSize}
                onThemeToggle={toggleTheme}
                isDarkMode={isDarkMode}
                chapters={chapters}
                onChapterSelect={navigateToChapter}
                showChapterList={showChapterList}
                onChapterListToggle={() => setShowChapterList(!showChapterList)}
            />

            <h1 className={styles.title}>{book[0]?.title || topic}</h1>
            {readingTimeInfo && (
                <div className={styles.readingTime}>
                    <span title="Total reading time">
                        📚 {readingTimeInfo.total} min total
                    </span>
                    <span title="Time remaining">
                        ⏱️ {readingTimeInfo.remaining} min remaining
                    </span>
                </div>
            )}
            <div className={styles.progressBar}>
                <div 
                    className={styles.progressFill} 
                    style={{ width: `${((currentPage + 1) / book.length) * 100}%` }}
                />
            </div>
            
            <PageContent 
                currentPage={currentPage}
                book={book}
                fontSize={fontSize}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default Book;