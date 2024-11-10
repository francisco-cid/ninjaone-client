import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg'
import './CustomSelect.css'


const CustomSelect = ({ selectedValue, options, onChange, label }) => {
    return (
        <div className="select-container">
            <select
                className="select"
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option value={opt.value} key={opt.text}>
                        {selectedValue === opt.value ? `${label} ` : null}{opt.text}
                    </option>
                ))}
            </select>
            <ArrowIcon className="arrow-icon"/>
        </div>
    )
};

export default CustomSelect;