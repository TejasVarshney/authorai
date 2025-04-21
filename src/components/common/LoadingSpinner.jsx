import styles from '../Book.module.css';

export function LoadingSpinner({ message }) {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingBook}>
                <div className={styles.bookPage}></div>
                <div className={styles.bookCover}></div>
            </div>
            <div className={styles.loadingText}>
                {message}
                <span className={styles.loadingDots}>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                </span>
            </div>
        </div>
    );
}