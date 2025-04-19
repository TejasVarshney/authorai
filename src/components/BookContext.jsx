import { createContext, useState } from "react";

const BookContext = createContext();
export default BookContext;

export const BookProvider = ({children}) => {
    const [topic, setTopic] = useState("A boy with no name");
    const [book, setBook] = useState(null);

    return (
        <BookContext.Provider value={[topic, setTopic,book, setBook]}>
            {children}
        </BookContext.Provider>
    )
}

