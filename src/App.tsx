import './App.css';
import TimeSlot from './TimeSlot';

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
          {hours.map(hour => <TimeSlot />)}
        </div>
      ))}
    </div>
  );
}

export default App;
