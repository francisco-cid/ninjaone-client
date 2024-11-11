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

export const postDevice = async (deviceData) => {
    try {
        const response = await fetch(`${BASE_URL}/devices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Set header to indicate JSON data
            },
            body: JSON.stringify({
                "system_name": deviceData.systemName,
                "type": deviceData.deviceType,
                "hdd_capacity": deviceData.hddCapacity
            })
        })
        if(!response.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('POST call to add device failed:', error)
    }
};

export const deleteDevice = async (deviceData) => {
    try {
        const response = await fetch(`${BASE_URL}/devices/${deviceData.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  // Set header to indicate JSON data
            },
            body: JSON.stringify({
                "system_name": deviceData.system_name,
                "type": deviceData.type,
                "hdd_capacity": deviceData.hdd_capacity
            })
        })
        if (!response.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('DELETE call to add device failed:', error)
    }
};