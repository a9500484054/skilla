import './DropdownDate.scss';
import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import {
  format,
  addDays,
  differenceInDays,
  addWeeks,
  addMonths,
  addYears
} from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownDateProps, RootState } from '../../type/type';
import { fetchData } from '../../api/api';
import { ArrowMiniIcon, CalendarIcon } from '../../ui/icon';




const DropdownDate: React.FC<DropdownDateProps> = ({ optionsType }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state: RootState) => state.date.currentDate);
  const startDate = useSelector((state: RootState) => state.date.startDate);
  const endDate = useSelector((state: RootState) => state.date.endDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('Все типы');

  const toggleDropdown = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const handlePreviousDay = (): void => {
    const newDate = addDays(currentDate, -1);
    dispatch({ type: 'SET_CURRENT_DATE', payload: newDate });
  };

  const handleNextDay = (): void => {
    const newDate = addDays(currentDate, 1);
    const today = new Date();
    
    if (newDate <= today) {
      dispatch({ type: 'SET_CURRENT_DATE', payload: newDate });
    } else {
      console.log('Cannot set a date beyond today.');
    }
  };

  const fetchAndSetData = async (dateStart: string, dateEnd: string): Promise<void> => {
    try {
      const fetchedData = await fetchData({
        dateStart,
        dateEnd,
      });
      dispatch({ type: 'ADD_DATA', payload: fetchedData });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const declension = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const extractNumbers = (str:string) => {
    const match = str.match(/\d+/);
    return match ? match[0] : '';
  }

  useEffect(() => {
    const today = new Date();
    const diff = differenceInDays(currentDate, today);
    if (diff === 0) {
      setCurrentValue('сегодня');
    } else if (diff === -1) {
      setCurrentValue('Вчера');
    } else if (diff === -2) {
      setCurrentValue('Позавчера');
    } else {
      setCurrentValue(`${Math.abs(diff)} ${declension(Math.abs(diff), ['день', 'дня', 'дней'])}`);
    }
  }, [currentDate]);

  useEffect(() => {
    let dateStart: string;
    let dateEnd: string = format(new Date(), 'yyyy-MM-dd');

    switch (currentValue) {
      case 'Неделя':
        dateStart = format(addWeeks(new Date(), -1), 'yyyy-MM-dd');
        break;
      case 'Месяц':
        dateStart = format(addMonths(new Date(), -1), 'yyyy-MM-dd');
        break;
      case 'Год':
        dateStart = format(addYears(new Date(), -1), 'yyyy-MM-dd');
        break;
      case 'Вчера':
        dateStart = format(addDays(new Date(), -1), 'yyyy-MM-dd');
        break;
      case 'Позавчера':
        dateStart = format(addDays(new Date(), -2), 'yyyy-MM-dd');
        break;
      default:
        dateStart = format(addDays(new Date(), -extractNumbers(currentValue)), 'yyyy-MM-dd');
    }

    if(currentValue.length === 19 && (startDate && endDate) ) {
      dateStart = format(startDate, 'yyyy-MM-dd')
      dateEnd = format(endDate, 'yyyy-MM-dd')
    }
    
    fetchAndSetData(dateStart, dateEnd);

  }, [currentValue]);

  useEffect(() => {
    if (startDate && endDate) {
      setCurrentValue(`${format(startDate, 'dd.MM.yy')} - ${format(endDate, 'dd.MM.yy')}`);
    }
  }, [startDate, endDate]);


  return (
    <div className='DropdownDate'>
      <button type='button' onClick={handlePreviousDay} className='DropdownDate__btn'>
        <ArrowMiniIcon width={9} height={6} rotate={-90} fill={`currentColor`} />
      </button>
      <div className='DropdownDate__dropdown'>
        <CalendarIcon 
          style={{ marginRight: '8px' }} 
          fill='currentColor'
        />
        <Dropdown
          options={optionsType}
          dateBlock={true}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          style={{
            width: '203px',
            right: '-39px'
          }}
        />
      </div>
      <button type='button' onClick={handleNextDay} className='DropdownDate__btn'>
        <ArrowMiniIcon width={9} height={6} fill={`currentColor`} rotate={90} />
      </button>
    </div>
  );
};

export default DropdownDate;
