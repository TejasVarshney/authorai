import styles from '../Book.module.css';
import { formatContent } from '../../utils/bookUtils';

export function PageContent({ 
    currentPage,
    book,
    fontSize,
    onPageChange,
}) {
    const showChapterTitle = currentPage === 0 || 
        book[currentPage].chapter_number !== book[currentPage - 1]?.chapter_number;

    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                {showChapterTitle && (
                    <h3 className={styles.pageTitle}>
                        Chapter {book[currentPage].chapter_number}: {book[currentPage].chapter_name}
                    </h3>
                )}
                <p 
                    className={styles.pageContent}
                    style={{ fontSize: `${fontSize}rem` }}
                    dangerouslySetInnerHTML={{ 
                        __html: formatContent(book[currentPage].content) 
                    }}
                />
                <div className={styles.keyboardHint}>
                    Use ← → arrow keys to navigate between pages
                </div>
            </div>
            <div className={styles.navigation}>
                <button 
                    className={styles.navButton}
                    onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    title="Previous page (Left arrow key)"
                >
                    ← Previous
                </button>
                <span className={styles.pageNumber}>
                    Page {currentPage + 1} of {book.length}
                </span>
                <button 
                    className={styles.navButton}
                    onClick={() => onPageChange(Math.min(book.length - 1, currentPage + 1))}
                    disabled={currentPage === book.length - 1}
                    title="Next page (Right arrow key)"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}