const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const fetchDevices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/devices`)
        // return empty list of devices
        if(!response.ok) throw new Error('Network response was not ok')
        return response.json();
    } catch (error) {
        console.error('Fetch devices failed:', error);
        // return empty list in case of error
        return [];
    }
};