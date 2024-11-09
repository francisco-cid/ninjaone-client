import './App.css';
import DataTable from './components/DataTable/DataTable';
import NinjaHeader from './components/NinjaHeader/NinjaHeader';
import {ReactComponent as RefreshIcon} from './icons/refresh.svg';
import {ReactComponent as AddIcon} from './icons/add.svg';

function App() {
  const devices = [
    { id: 1, system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '128 GB' },
    { id: 2, system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '64 GB' },
    { id: 3, system_name: 'WINXP-125498HQ', type: 'WINDOWS', hdd_capacity: '64 GB' },
    { id: 4, system_name: 'MAC-SMITH-JOHN', type: 'MAC', hdd_capacity: '64 GB' },
    { id: 5, system_name: 'MAC-RODRIGUEZ-J', type: 'MAC', hdd_capacity: '32 GB' },
    { id: 6, system_name: 'DESKTOP-0VCBIFF', type: 'WINDOWS', hdd_capacity: '32 GB' },
    { id: 7, system_name: 'LINUX-SMITH-J', type: 'LINUX', hdd_capacity: '32 GB' },
    { id: 8, system_name: 'MAC-ADAMS-R', type: 'MAC', hdd_capacity: '32 GB' },
  ];
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
          <input/>
          <select name="type">
            <option>Mac</option>
            <option>Windows</option>
            <option>Linux</option>
          </select>
          <select name="capacity">
            <option>32</option>
            <option>64</option>
            <option>128</option>
          </select>
        </div>
        <button className="refresh-btn">
          <RefreshIcon/>
        </button>
      </div>
      <DataTable devices={devices}/>
  </div>
    </>
  );
}

export default App;
