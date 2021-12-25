import React, { useState } from 'react';
import Staff from './staffsList/StaffListComponent';
import { STAFFS } from './shared/staffs';
import './App.css';
import Nav from './components/Nav';

function App()  {

  const [info] = useState(STAFFS);

  return (
    <div className="App">
      <Nav />
      <Staff staffs={info}/>
    </div>
  );
}

export default App;