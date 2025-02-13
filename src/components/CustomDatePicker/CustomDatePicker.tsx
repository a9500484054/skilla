import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './CustomDatePicker.scss'
import { CustomDatePickerProps } from '../../type/type';


const CustomDatePicker = ({ 
  selectedDate, 
  setSelectedDate, 
  maxDate 
} : CustomDatePickerProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd.MM.yy"
        placeholderText="__.__.__"
        isClearable={false} 
        disabledKeyboardNavigation={true} 
        className='DatePicker__input'
        maxDate={maxDate}
      />
    </div>
  );
} 

export default CustomDatePicker