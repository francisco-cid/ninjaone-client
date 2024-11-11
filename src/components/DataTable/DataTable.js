import DeviceDetails from './DeviceDetails/DeviceDetails';
import { useState } from 'react';
import './DataTable.css'
import ToggleMenu from '../ToggleMenu/ToggleMenu';

const DataTable = ({devices, beginEdit, beginDelete }) => {
    // determines which row if any should display action menu
    const [hoveredRow, setHoveredRow] = useState(null)
    return (
        <table className="device-table">
            <thead>
            <tr>
                <th>Device</th>
                <th/> {/* Empty header for the action column */}
            </tr>
            </thead>
            <tbody>
            { devices.map((device) => {
                // don't display row if device details are missing
                if(!(device.system_name && device.hdd_capacity && device.type)) return false;
                return (
                <tr key={device.id}
                    className="device-row"
                    onMouseEnter={() => setHoveredRow(device.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    <td>
                        <DeviceDetails name={device.system_name} type={device.type} capacity={device.hdd_capacity} />
                    </td>
                    <td className="action-cell">
                    {hoveredRow === device.id && (
                            <ToggleMenu
                                onEdit={() => beginEdit(device)}
                                onDelete={() => beginDelete(device)}
                            />
                    )}
                     </td>
                    
                </tr>
            )})}
            </tbody>
        </table>
    )
};

export default DataTable;