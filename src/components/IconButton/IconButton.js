import './IconButton.css';
const IconButton = ({ children, ...btnProps }) => {
    return (
        <button
            className="icon-btn"
            {...btnProps}
        >
            {children}
        </button>
    )
};

export default IconButton;

