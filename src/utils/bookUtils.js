export async function fetchBook(topic) {
    console.log('API URL:', import.meta.env.VITE_API_URL);
    const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(topic)
    });

    if (!response.ok) {
        throw new Error(`Failed to generate book: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data);
}

export function formatContent(content) {
    return content
        .replace(/\*/g, '\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
}

export function getUniqueChapters(book) {
    if (!book) return [];
    const uniqueChapters = new Map();
    book.forEach(page => {
        if (!uniqueChapters.has(page.chapter_number)) {
            uniqueChapters.set(page.chapter_number, {
                number: page.chapter_number,
                title: page.chapter_name
            });
        }
    });
    return Array.from(uniqueChapters.values()).sort((a, b) => a.number - b.number);
}

export const loadingMessages = [
    'Brewing creative ideas',
    'Crafting your story',
    'Weaving magical words',
    'Adding final touches',
    'Creating your masterpiece'
];