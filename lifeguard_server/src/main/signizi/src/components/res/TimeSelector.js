import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import './TimeSelector.css';

const format = 'HH:mm';

const TimeSelector = (props) => {
  const [time, setTime] = useState(moment());

  const handleTimeChange = (value) => {
    setTime(value);
    props.onTimeChange(value ? value.format(format) : null);
  };

  return (
    <div className='TimeSelector'>
        <TimePicker
          value={time}
          onChange={handleTimeChange}
          showSecond={false}
          defaultValue={moment()}
          format={format}
          inputReadOnly
        />
    </div>
    
  );
}

export default TimeSelector;
