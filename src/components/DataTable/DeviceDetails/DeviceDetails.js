import { ReactComponent as WindowsIcon} from '../../../icons/windows.svg'
import { ReactComponent as LinuxIcon} from '../../../icons/linux.svg'
import { ReactComponent as MacIcon} from '../../../icons/mac.svg'
import { DEVICE_TYPES } from '../../../constants'
import './DeviceDetails.css'

const DeviceDetails = ({name, type, capacity}) => {
    const OSIcon = () => {
        const key = type
        switch(key) {
            case DEVICE_TYPES.MAC:
                return <MacIcon/>
            case DEVICE_TYPES.WINDOWS:
                return <WindowsIcon/>
            default:
                return <LinuxIcon/>
        }
    }
    return(
        <div className="device-details">
            <div className={'icon-name-row'}>
                <OSIcon/>
                {name}
            </div>
            {type && capacity && 
            <div className="device-info">{`${type.charAt(0) + type.slice(1).toLowerCase()} workstation - ${capacity} GB`}</div>
            }    
        </div>
    )
};

export default DeviceDetails;