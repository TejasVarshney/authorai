import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Home.module.css";

export default function Home() {
    const [input, setInput] = useState('');
    const [charCount, setCharCount] = useState(0);
    const navigate = useNavigate();
    const { setTopic, setBook, isDarkMode, toggleTheme } = useContext(BookContext);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;
        
        setTopic(input);
        setBook(null);
        navigate('/book');
    };

    const handleInput = (e) => {
        const value = e.target.value;
        setInput(value);
        setCharCount(value.length);
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${styles.themeButton}`}
                onClick={toggleTheme}
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <h1 className={styles.title}>AuthorAI ✍️</h1>
            <p className={styles.description}>
                Enter a topic and let AI create a unique story just for you
            </p>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <input 
                        className={styles.input}
                        placeholder="Try 'A magical adventure in space' or 'A detective solving mysteries in Paris'..."
                        value={input}
                        onChange={handleInput}
                        aria-label="Story topic input"
                    />
                    <span className={styles.charCount}>{charCount}/200</span>
                </div>
                <div className={styles.buttonGroup}>
                    <button 
                        type="submit"
                        className={styles.button}
                        disabled={!input.trim()}
                        title={!input.trim() ? "Please enter a topic first" : "Generate your story"}
                    >
                        Generate Book
                    </button>
                    <button 
                        type="button"
                        className={styles.button}
                        onClick={() => navigate('/library')}
                        title="View your saved books"
                    >
                        View Library
                    </button>
                </div>
            </form>
        </div>
    );
}