import { createContext, useState, useEffect } from "react";

const BookContext = createContext();

export const BookProvider = ({children}) => {
    const [topic, setTopic] = useState("");
    const [book, setBook] = useState(null);
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

    const addToLibrary = (newBook) => {
        if (newBook && topic) {
            const bookEntry = {
                id: Date.now(),
                topic,
                content: newBook,
                dateAdded: new Date().toISOString()
            };
            setLibrary(prev => [...prev, bookEntry]);
        }
    };

    const removeFromLibrary = (bookId) => {
        setLibrary(prev => prev.filter(book => book.id !== bookId));
    };

    return (
        <BookContext.Provider value={{
            topic,
            setTopic,
            book,
            setBook,
            library,
            addToLibrary,
            removeFromLibrary
        }}>
            {children}
        </BookContext.Provider>
    );
};

export default BookContext;

