import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "./BookContext";
import styles from "./Home.module.css";

export default function Home() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const { setTopic, setBook } = useContext(BookContext);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;
        
        setTopic(input);
        setBook(null);
        navigate('/book');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AuthorAI ✍️</h1>
            <p className={styles.description}>
                Enter a topic and let AI create a unique story just for you
            </p>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <input 
                    className={styles.input}
                    placeholder="Enter your story topic..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className={styles.buttonGroup}>
                    <button 
                        type="submit"
                        className={styles.button}
                        disabled={!input.trim()}
                    >
                        Generate Book
                    </button>
                    <button 
                        type="button"
                        className={styles.button}
                        onClick={() => navigate('/library')}
                    >
                        View Library
                    </button>
                </div>
            </form>
        </div>
    );
}