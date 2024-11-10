import './App.css';
import DataTable from './components/DataTable/DataTable';
import NinjaHeader from './components/NinjaHeader/NinjaHeader';
import {ReactComponent as RefreshIcon} from './icons/refresh.svg';
import {ReactComponent as AddIcon} from './icons/add.svg';
import CustomSelect from './components/CustomSelect/CustomSelect'
import CustomSearch from './components/CustomSearch/CustomSearch';
import { fetchDevices } from './api/devices';
import { useState, useEffect } from 'react';

function App() {
  // TODO move to constants file
  const filterOptions = [
    {value: "ALL", text: "All" },
    {value: "WINDOWS", text: "Windows" },
    {value: "MAC", text: "Mac" },
    {value: "LINUX", text: "Linux"}
  ]

  const sortOptions = [
    {value: "CAP,DESC", text: "HDD Capacity (Descending)"},
    {value: "CAP,ASC", text: "HDD Capacity (Ascending)"},
    {value: "NAME,DESC", text: "Name (Descending)"},
    {value: "NAME,ASC", text: "Name (Ascending)"},
  ]

  const [selectedType, setSelectedType] = useState("ALL")
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value)

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
    console.log('data', data)
    setDevices(data)
  };
  // runs on first load to get devices
  useEffect(() => {
    loadDevices();
  }, []);

  // handle refresh
  const handleRefresh = () => {
    // reset filters
    setSelectedType("ALL")
    loadDevices();
  }

  // list of devices displayed on table
  const [displayedDevices, setDisplayedDevices] = useState(devices)

  // filter displayed devices by selectedType
  useEffect(() => {
    if(selectedType === 'ALL'){
      setDisplayedDevices(devices)
    } else {
      setDisplayedDevices(devices.filter((device) => device.type === selectedType))
    }
  }, [devices, selectedType])

  // sort displayed devices by selected category and order
  useEffect(() => {
    // todo move to utils?
    const sortFunctions = {
      'CAP,DESC': (a, b) => Number(b.hdd_capacity || 0) - Number(a.hdd_capacity || 0),
      'CAP,ASC': (a, b) => Number(a.hdd_capacity || 0) - Number(b.hdd_capacity || 0),
      'NAME,DESC': (a, b) => b.system_name.localeCompare(a.system_name),
      'NAME,ASC': (a, b) => a.system_name.localeCompare(b.system_name),
    };
    const sortedDevices = devices.slice().sort(sortFunctions[selectedSort])
    setDisplayedDevices(sortedDevices)
  }, [devices, selectedSort])


  
  return (
    <>
      <NinjaHeader/>
      <div className="page-wrapper">
      <div className="row">
        <p className="subtitle">Devices</p>
        <button className="add-btn">
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
        <button
        className="refresh-btn"
        onClick={handleRefresh}
        aria-label="refresh devices list"
        >
          <RefreshIcon/>
        </button>
      </div>
      <DataTable devices={displayedDevices}/>
  </div>
    </>
  );
}

export default App;
