let url: string = 'http://10.0.0.237:8000/searchmeal/';

export const sendSearch = async (search:any) => {
    try {

        let searchMessage = search;
        url += searchMessage;

        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataJSON: any = await response.json();
        //const dataObj: any = JSON.parse(dataJSON);
        return dataJSON;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}