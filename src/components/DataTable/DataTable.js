import DeviceDetails from "./DeviceDetails/DeviceDetails";
import './DataTable.css'

const DataTable = ({devices}) => {
    return (
        <table className="device-table">
            <thead>
            <tr>
                <th>Device</th>
            </tr>
            </thead>
            <tbody>
            { devices.map((device) => {
                // don't display row if device details are missing
                if(!(device.system_name && device.hdd_capacity && device.type)) return false;
                return (
                <tr key={device.id}>
                    <td className="device-details">
                        <DeviceDetails name={device.system_name} type={device.type} capacity={device.hdd_capacity} />
                    </td>
                </tr>
            )})}
            </tbody>
        </table>
    )
};

export default DataTable;