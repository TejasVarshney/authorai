import styles from '../Book.module.css';

export function ChapterList({ chapters, onSelect, show }) {
    if (!show) return null;

    return (
        <div className={styles.chapterList}>
            {chapters.map(chapter => (
                <button
                    key={chapter.number}
                    className={styles.chapterItem}
                    onClick={() => onSelect(chapter.number)}
                >
                    Chapter {chapter.number}: {chapter.title}
                </button>
            ))}
        </div>
    );
}