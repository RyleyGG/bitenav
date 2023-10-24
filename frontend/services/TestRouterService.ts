const url: string = 'http://localhost:8000/';

export const getTest = async () => {
    try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}