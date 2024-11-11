import './DeleteModal.css';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const DeleteModal = ({ show, onClose, onDelete, deviceInfo }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(deviceInfo);
        onClose(); // Close modal after submission
    };

    if (!show) return false;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <div className="modal-header">
                <h2>Delete device?</h2>
                <div className="close-btn-wrapper">
                    <IconButton
                        onClick={onClose}
                        aria-label="close modal"
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="modal-body">
                You are about to delete the device <strong>{deviceInfo?.system_name}</strong>. This action cannot be undone.
            </div>
            <div className="delete-modal-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
    );
};

export default DeleteModal;