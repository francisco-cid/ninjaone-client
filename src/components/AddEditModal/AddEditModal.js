import CustomSelect from "../CustomSelect/CustomSelect";
import IconButton from "../IconButton/IconButton";
import { DEVICE_TYPES, MODAL_MODES } from "../../constants";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { useState, useEffect } from "react";
import "./AddEditModal.css";

const AddEditModal = ({ show, mode, initialValues, onClose, onSubmit }) => {
  const [systemName, setSystemName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [hddCapacity, setHddCapacity] = useState("");

  // set to true is user attempts to submit form before selecting a deviceType
  const [deviceTypeError, setDeviceTypeError] = useState(false);

  // clear form inputs
  const resetFormInputs = () => {
    setSystemName("");
    setDeviceType("");
    setHddCapacity("");
  };

  // Populate form fields when initialValues change
  useEffect(() => {
    if (mode === MODAL_MODES.EDIT && initialValues) {
      setSystemName(initialValues.system_name || "");
      setDeviceType(initialValues.type || "");
      setHddCapacity(initialValues.hdd_capacity || "");
    } else {
      resetFormInputs();
    }
  }, [mode, initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deviceType) {
      setDeviceTypeError(true);
      return;
    }
    const deviceData = {
      system_name: systemName,
      type: deviceType,
      hdd_capacity: hddCapacity,
    };
    // pass id only if editing device
    if (mode === MODAL_MODES.EDIT) deviceData.id = initialValues.id;
    onSubmit(deviceData);
    onClose(); // Close modal after submission
    resetFormInputs();
  };

  const handleClose = () => {
    resetFormInputs();
    onClose();
  };

  const deviceOptions = [
    { value: DEVICE_TYPES.WINDOWS, text: "Windows" },
    { value: DEVICE_TYPES.MAC, text: "Mac" },
    { value: DEVICE_TYPES.LINUX, text: "Linux" },
  ];

  if (!show) return false;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{mode === MODAL_MODES.EDIT ? "Edit device" : "Add device"}</h2>
          <div className="close-btn-wrapper">
            <IconButton onClick={handleClose} aria-label="close modal">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <label>System name *</label>
            <input
              type="text"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              required
            />
          </div>
          <div className="field-container">
            <label>Device type *</label>
            <CustomSelect
              options={deviceOptions}
              label=""
              onChange={(value) => {
                setDeviceTypeError(false);
                setDeviceType(value);
              }}
              selectedValue={deviceType}
              placeholder="Select a type"
            />
            {deviceTypeError && (
              <span className="error-message">Please select a device</span>
            )}
          </div>
          <div className="field-container">
            <label>HDD capacity (GB) *</label>
            <input
              type="number"
              value={hddCapacity}
              onChange={(e) => setHddCapacity(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
