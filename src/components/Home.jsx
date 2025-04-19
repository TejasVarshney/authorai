import { useState, useContext } from "react";
import BookContext from "./BookContext";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    const [input, setInput] = useState('');
    const [topic, setTopic] = useContext(BookContext);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AuthorAI ✍️</h1>
            <p className={styles.description}>
                Enter a topic and let AI create a unique story just for you
            </p>
            <div className={styles.inputContainer}>
                <input 
                    className={styles.input}
                    placeholder="Enter your story topic..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && input.trim()) {
                            setTopic(input);
                            document.querySelector('.generate-button').click();
                        }
                    }}
                />
                <Link to="/book">
                    <button 
                        className={styles.button}
                        onClick={() => setTopic(input)}
                        disabled={!input.trim()}
                    >
                        Generate Book
                    </button>
                </Link>
            </div>
        </div>
    );
}