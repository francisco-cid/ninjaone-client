import { ReactComponent as WindowsIcon} from '../../../icons/windows.svg'
import { ReactComponent as LinuxIcon} from '../../../icons/linux.svg'
import { ReactComponent as MacIcon} from '../../../icons/mac.svg'
import './DeviceDetails.css'

const DeviceDetails = ({name, type, capacity}) => {
    const OSIcon = () => {
        const key = type.split(' ')[0].toLowerCase()
        switch(key) {
            case 'mac':
                return <MacIcon/>
            case 'windows':
                return <WindowsIcon/>
            default:
                return <LinuxIcon/>
        }
    }

    return(
        <div className="device-details">
            <div className={'icon-name-row'}>
                <OSIcon/>
                <strong>{name}</strong>
            </div>
            <div className="device-info">{`${type.charAt(0) + type.slice(1).toLowerCase()} workstation - ${capacity}`}</div>
        </div>
    )
};

export default DeviceDetails;