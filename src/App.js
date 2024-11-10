import './App.css';
import DataTable from './components/DataTable/DataTable';
import NinjaHeader from './components/NinjaHeader/NinjaHeader';
import {ReactComponent as RefreshIcon} from './icons/refresh.svg';
import {ReactComponent as AddIcon} from './icons/add.svg';
import CustomSelect from './components/CustomSelect/CustomSelect'
import CustomSearch from './components/CustomSearch/CustomSearch';
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
    { id: 1, system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '128 GB' },
    { id: 2, system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '64 GB' },
    { id: 3, system_name: 'WINXP-125498HQ', type: 'WINDOWS', hdd_capacity: '64 GB' },
    { id: 4, system_name: 'MAC-SMITH-JOHN', type: 'MAC', hdd_capacity: '64 GB' },
    { id: 5, system_name: 'MAC-RODRIGUEZ-J', type: 'MAC', hdd_capacity: '32 GB' },
    { id: 6, system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '32 GB' },
    { id: 7, system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '32 GB' },
    { id: 8, system_name: 'MAC-ADAMS-R', type: 'MAC', hdd_capacity: '32 GB' },
  ];

  const [devices, setDevices] = useState(defaultDevices)

  const [displayedDevices, setDisplayedDevices] = useState(devices)

  useEffect(() => {
    if(selectedType === 'ALL'){
      setDisplayedDevices(devices)
    } else {
      setDisplayedDevices(devices.filter((device) => device.type == selectedType))
    }
  }, [devices, selectedType])


  
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
        <button className="refresh-btn">
          <RefreshIcon/>
        </button>
      </div>
      <DataTable devices={displayedDevices}/>
  </div>
    </>
  );
}

export default App;
