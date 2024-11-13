import "./App.css";
import DataTable from "./components/DataTable/DataTable";
import NinjaHeader from "./components/NinjaHeader/NinjaHeader";
import IconButton from "./components/IconButton/IconButton";
import { ReactComponent as RefreshIcon } from "./icons/refresh.svg";
import { ReactComponent as AddIcon } from "./icons/add.svg";
import CustomSelect from "./components/CustomSelect/CustomSelect";
import CustomSearch from "./components/CustomSearch/CustomSearch";
import {
  deleteDevice,
  editDevice,
  fetchDevices,
  postDevice,
} from "./api/devices";
import { useState, useEffect } from "react";
import {
  DEVICE_TYPES,
  SORT_OPTIONS,
  MODAL_MODES,
  FILTER_DROPDOWN_OPTIONS,
  SORT_DROPDOWN_OPTIONS,
} from "./constants";
import AddEditModal from "./components/AddEditModal/AddEditModal";
import DeleteModal from "./components/DeleteModal/DeleteModal";

function App() {
  // selections for filter and sort options
  const [selectedType, setSelectedType] = useState(DEVICE_TYPES.ANY);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS.CAP_DESCENDING);

  // latest list of devices retrieved from API
  const [devices, setDevices] = useState([]);

  // fetch list of devices from API
  const loadDevices = async () => {
    console.log("calling api");
    const data = await fetchDevices();
    console.log("loading devices", data);
    setDevices(data);
  };
  // runs on first load to get devices
  useEffect(() => {
    loadDevices();
  }, []);

  // handle refresh
  const handleRefresh = () => {
    // reset filters
    setSelectedType(DEVICE_TYPES.ANY);
    loadDevices();
  };

  // list of devices displayed on table
  const [displayedDevices, setDisplayedDevices] = useState(devices);

  // filter and sort displayed devices by selected category and order
  useEffect(() => {
    // filter devices base on selection
    const filteredDevices =
      selectedType === DEVICE_TYPES.ANY
        ? devices
        : devices.filter((device) => device.type === selectedType);
    // functions to sort devices based on selection
    const sortFunctions = {
      [SORT_OPTIONS.CAP_DESCENDING]: (a, b) =>
        Number(b.hdd_capacity) - Number(a.hdd_capacity),
      [SORT_OPTIONS.CAP_ASCENDING]: (a, b) =>
        Number(a.hdd_capacity) - Number(b.hdd_capacity),
      [SORT_OPTIONS.NAME_DESCENDING]: (a, b) =>
        b.system_name?.localeCompare(a.system_name),
      [SORT_OPTIONS.NAME_ASCENDING]: (a, b) =>
        a.system_name?.localeCompare(b.system_name),
    };
    // sort the already filtered devices list
    const sortedDevices = filteredDevices
      .slice()
      .sort(sortFunctions[selectedSort]);
    setDisplayedDevices(sortedDevices);
  }, [devices, selectedSort, selectedType]);

  // add/edit modal controls
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState(MODAL_MODES.ADD); // ADD or EDIT

  // delete modal controls
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // add new device
  const addDevice = async (deviceData) => {
    await postDevice(deviceData);
    // re-fetch devices
    loadDevices();
  };

  // opens add modal
  // called when user clicks add button
  const beginAdd = (deviceData) => {
    setModalMode(MODAL_MODES.ADD);
    setShowAddModal(true);
  };

  // holds info for selected device in order to edit or delete it
  const [actionDeviceData, setActionDeviceData] = useState(null);

  // opens modal and sets actionDeviceData to that of the selected device
  // called when user clicks delete menu item
  const beginDelete = (deviceData) => {
    setActionDeviceData(deviceData);
    setShowDeleteModal(true);
  };

  // calls api function to delete device and refetches devices
  // called when user confirms device deletion
  const removeDevice = async () => {
    await deleteDevice(actionDeviceData);
    loadDevices();
  };

  // opens edit modal and sets actionDeviceData to that of selected device
  // called when user clicks edit button
  const beginEdit = (deviceData) => {
    setActionDeviceData(deviceData);
    setModalMode(MODAL_MODES.EDIT);
    setShowAddModal(true);
  };

  // calls api function to edit device and refetches devices
  // called when user submits edit form
  const updateDevice = async (deviceData) => {
    await editDevice(deviceData);
    loadDevices();
  };

  return (
    <>
      <AddEditModal
        show={showAddModal}
        mode={modalMode}
        initialValues={actionDeviceData}
        onSubmit={
          modalMode === MODAL_MODES.ADD
            ? (req) => addDevice(req)
            : (req) => updateDevice(req)
        }
        onClose={() => setShowAddModal(false)}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={removeDevice}
        deviceInfo={actionDeviceData}
      />
      <NinjaHeader />
      <div className="page-wrapper">
        <div className="row">
          <p className="subtitle">Devices</p>
          <button className="add-btn" onClick={beginAdd}>
            <AddIcon fill="white" className="add-icon" />
            <p className="btn-text">Add device</p>
          </button>
        </div>
        <div className="filters-row">
          <div className="filters">
            <CustomSearch placeholder="Search" />
            <CustomSelect
              label="Device Type:"
              options={FILTER_DROPDOWN_OPTIONS}
              onChange={setSelectedType}
              selectedValue={selectedType}
              aria-label="filter devices"
            />
            <CustomSelect
              label="Sort by:"
              options={SORT_DROPDOWN_OPTIONS}
              onChange={setSelectedSort}
              selectedValue={selectedSort}
              aria-label="sort devices"
            />
          </div>
          <IconButton onClick={handleRefresh} aria-label="refresh devices">
            <RefreshIcon />
          </IconButton>
        </div>
        <DataTable
          devices={displayedDevices}
          beginEdit={beginEdit}
          beginDelete={beginDelete}
        />
      </div>
    </>
  );
}

export default App;
