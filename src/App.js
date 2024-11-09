import './App.css';
import DataTable from './components/DataTable/DataTable';

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
    <div className="App">
        <DataTable devices={devices}/>
    </div>
  );
}

export default App;
