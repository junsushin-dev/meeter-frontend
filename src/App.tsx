import React from 'react';
import logo from './logo.svg';
import './App.css';

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const hours = new Array(24).fill(0).map((_, index) => index.toString().padStart(2, '0') + ":00");

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <div className='grid-column'>
        <div className='grid-cell' />
        {hours.map(hour => <div className='grid-cell'>{hour}</div>)}
      </div>
      {days.map(dayName => (
        <div key={dayName} className='grid-column'>
          <div className='grid-cell'>{dayName}</div>
          {hours.map(hour => <div className='grid-cell'/>)}
        </div>
      ))}
    </div>
  );
}

export default App;
