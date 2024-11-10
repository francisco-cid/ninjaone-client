import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import './CustomSearch.css'

const CustomSearch = ({ placeholder, onChange=() =>{}, type="text" }) => {
    return (
        <div className="search-input-container">
            <SearchIcon className="search-icon" />
            <input
                type={type}
                placeholder={placeholder}
                className="search-input"
                onChange={onChange}
            />
        </div>
    )
};

export default CustomSearch;