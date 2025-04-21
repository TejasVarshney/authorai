import { createContext, useState, useEffect } from "react";

const BookContext = createContext();

export const BookProvider = ({children}) => {
    const [topic, setTopic] = useState("");
    const [book, setBook] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('dark-mode');
            return saved === 'true';
        } catch {
            return false;
        }
    });
    const [library, setLibrary] = useState(() => {
        try {
            const saved = localStorage.getItem('bookLibrary');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('bookLibrary', JSON.stringify(library));
    }, [library]);

    useEffect(() => {
        localStorage.setItem('dark-mode', isDarkMode.toString());
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const addToLibrary = (newBook) => {
        if (newBook && topic) {
            const bookEntry = {
                id: Date.now(),
                title: topic,
                content: newBook,
                dateAdded: new Date().toISOString()
            };
            setLibrary(prev => [...prev, bookEntry]);
        }
    };

    const removeFromLibrary = (bookId) => {
        setLibrary(prev => prev.filter(book => book.id !== bookId));
    };

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <BookContext.Provider value={{
            topic,
            setTopic,
            book,
            setBook,
            library,
            addToLibrary,
            removeFromLibrary,
            isDarkMode,
            toggleTheme
        }}>
            {children}
        </BookContext.Provider>
    );
};

export default BookContext;

