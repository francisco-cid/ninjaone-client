const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const fetchDevices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/devices`)
        if(!response.ok) throw new Error('Network response was not ok')
        return response.json();
    } catch (error) {
        console.error('Fetch devices failed:', error);
        // return empty list in case of error
        return [];
    }
};

export const postDevice = async (requestBody) => {
    try {
        const response = await fetch(`${BASE_URL}/devices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Set header to indicate JSON data
            },
            body: JSON.stringify({
                "system_name": requestBody.systemName,
                "type": requestBody.deviceType,
                "hdd_capacity": requestBody.hddCapacity
            })
        })
        if(!response.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('POST to add device failed:', error)
    }
}