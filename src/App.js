import './App.css';
import DataTable from './components/DataTable/DataTable';
import NinjaHeader from './components/NinjaHeader/NinjaHeader';
import IconButton from './components/IconButton/IconButton';
import {ReactComponent as RefreshIcon} from './icons/refresh.svg';
import {ReactComponent as AddIcon} from './icons/add.svg';
import CustomSelect from './components/CustomSelect/CustomSelect'
import CustomSearch from './components/CustomSearch/CustomSearch';
import { deleteDevice, fetchDevices, postDevice } from './api/devices';
import { useState, useEffect } from 'react';
import { DEVICE_TYPES, SORT_OPTIONS, MODAL_MODES } from './constants';
import AddEditModal from './components/AddEditModal/AddEditModal';
import DeleteModal from './components/DeleteModal/DeleteModal';

function App() {

  const filterOptions = [
    {value: DEVICE_TYPES.ANY, text: "All" },
    {value: DEVICE_TYPES.WINDOWS, text: "Windows" },
    {value: DEVICE_TYPES.MAC, text: "Mac" },
    {value: DEVICE_TYPES.LINUX, text: "Linux"}
  ]

  const sortOptions = [
    {value: SORT_OPTIONS.CAP_DESCENDING, text: "HDD Capacity (Descending)"},
    {value: SORT_OPTIONS.CAP_ASCENDING, text: "HDD Capacity (Ascending)"},
    {value: SORT_OPTIONS.NAME_DESCENDING, text: "Name (Descending)"},
    {value: SORT_OPTIONS.NAME_ASCENDING, text: "Name (Ascending)"},
  ]

  const [selectedType, setSelectedType] = useState(DEVICE_TYPES.ANY)
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS.CAP_DESCENDING)

  const defaultDevices = [
    { id: '1', system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '128' },
    { id: '2', system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '64' },
    { id: '3', system_name: 'WINXP-125498HQ', type: 'WINDOWS', hdd_capacity: '64' },
    { id: '4', system_name: 'MAC-SMITH-JOHN', type: 'MAC', hdd_capacity: '64' },
    { id: '5', system_name: 'MAC-RODRIGUEZ-J', type: 'MAC', hdd_capacity: '32' },
    { id: '6', system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '32' },
    { id: '7', system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '32' },
    { id: '8', system_name: 'MAC-ADAMS-R', type: 'MAC', hdd_capacity: '32' },
  ];

  // latest list of devices retrieved from API
  const [devices, setDevices] = useState([])

  // fetch list of devices from API
  const loadDevices = async () => {
    const data = await fetchDevices();
    setDevices(data)
  };
  // runs on first load to get devices
  useEffect(() => {
    loadDevices();
  }, []);

  // handle refresh
  const handleRefresh = () => {
    // reset filters
    setSelectedType(DEVICE_TYPES.ANY)
    loadDevices();
  }

  // list of devices displayed on table
  const [displayedDevices, setDisplayedDevices] = useState(devices)

  // filter and sort displayed devices by selected category and order
  useEffect(() => {
    // filter devices base on selection
    const filteredDevices = selectedType === DEVICE_TYPES.ANY ? devices : devices.filter((device) => device.type === selectedType)
    // functions to sort devices based on selection
    const sortFunctions = {
      [SORT_OPTIONS.CAP_DESCENDING]: (a, b) => Number(b.hdd_capacity || 0) - Number(a.hdd_capacity || 0),
      [SORT_OPTIONS.CAP_ASCENDING]: (a, b) => Number(a.hdd_capacity || 0) - Number(b.hdd_capacity || 0),
      [SORT_OPTIONS.NAME_DESCENDING]: (a, b) => b.system_name?.localeCompare(a.system_name),
      [SORT_OPTIONS.NAME_ASCENDING]: (a, b) => a.system_name?.localeCompare(b.system_name),
    };
    // sort the already filtered devices list
    const sortedDevices = filteredDevices.slice().sort(sortFunctions[selectedSort])
    setDisplayedDevices(sortedDevices)
  }, [devices, selectedSort, selectedType])
  
  // add/edit modal controls
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState(MODAL_MODES.ADD); // ADD or EDIT

  // delete modal controls
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // add new device
  const addDevice = async (requestBody) => {
    await postDevice(requestBody);
    // re-fetch devices
    loadDevices();
  }

  // holds info for selected device in order to edit or delete it
  const [actionDeviceData, setActionDeviceData] = useState(null);

  // opens modal and sets actionDeviceData to that of the selected device
  // called when user clicks delete menu item
  const beginDelete = (deviceData) => {
    setActionDeviceData(deviceData);
    setShowDeleteModal(true);
  }

  // calls api function to delete device and refetches devices
  // called when user confirms device deletion
  const removeDevice = async () => {
    await deleteDevice(actionDeviceData);
    loadDevices();
  }
  
  return (
    <>
      <AddEditModal
        show={showAddModal}
        mode={modalMode}
        initialValues={actionDeviceData}
        onSubmit={(req) => addDevice(req)}
        onClose={()=>setShowAddModal(false)}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={removeDevice}
        deviceInfo={actionDeviceData}
      />
      <NinjaHeader/>
      <div className="page-wrapper">
      <div className="row">
        <p className="subtitle">Devices</p>
        <button className="add-btn" onClick={()  => setShowAddModal(true)}>
          <AddIcon fill="white" className="add-icon"/>
          <p className="btn-text">Add device</p>
        </button>
      </div>
      <div className="filters-row">
        <div className="filters">
          <CustomSearch
            placeholder="Search"
          />
          <CustomSelect
            label="Device Type:"
            options={filterOptions}
            onChange={setSelectedType}
            selectedValue={selectedType}
          />
          <CustomSelect
            label="Sort by:"
            options={sortOptions}
            onChange={setSelectedSort}
            selectedValue={selectedSort}
          />
        </div>
        <IconButton
          onClick={handleRefresh}
          aria-label="refresh devices list"
        >
          <RefreshIcon/>
        </IconButton>
      </div>
      <DataTable
        devices={displayedDevices}
        beginEdit={() => {}}
        beginDelete={beginDelete}
      />
  </div>
    </>
  );
}

export default App;
