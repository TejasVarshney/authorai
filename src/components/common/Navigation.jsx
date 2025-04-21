import styles from '../Book.module.css';
import { ChapterList } from './ChapterList';

export function Navigation({ 
    onHome, 
    onLibrary, 
    onFontSizeChange, 
    onThemeToggle,
    isDarkMode,
    chapters,
    onChapterSelect,
    showChapterList,
    onChapterListToggle
}) {
    return (
        <nav className={styles.topNav}>
            <button className={styles.navButton} onClick={onHome}>← Home</button>
            <div className={styles.controls}>
                <button 
                    className={styles.controlButton} 
                    onClick={() => onFontSizeChange(-0.1)}
                    title="Decrease font size"
                >
                    A-
                </button>
                <button 
                    className={styles.controlButton}
                    onClick={() => onFontSizeChange(0.1)}
                    title="Increase font size"
                >
                    A+
                </button>
                <button
                    className={`${styles.controlButton} ${styles.themeButton}`}
                    onClick={onThemeToggle}
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <div className={styles.chapterNav}>
                    <button
                        className={`${styles.controlButton} ${showChapterList ? styles.active : ''}`}
                        onClick={onChapterListToggle}
                        title="Navigate to chapter"
                    >
                        Chapters
                    </button>
                    <ChapterList 
                        chapters={chapters}
                        onSelect={onChapterSelect}
                        show={showChapterList}
                    />
                </div>
            </div>
            <button className={styles.navButton} onClick={onLibrary}>Library</button>
        </nav>
    );
}