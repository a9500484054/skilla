import { useEffect, useRef, useCallback } from 'react';
import './Dropdown.scss';
import CustomDatePicker from '../CustomDatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarIcon } from '../../ui/icon';
import { DropdownProps } from '../../type/type';


const Dropdown = ({
  options,
  dateBlock,
  isOpen,
  toggleDropdown,
  currentValue,
  setCurrentValue,
  style
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const currentData = new Date();
  const startDate = useSelector((state: any) => state.date.startDate);
  const endDate = useSelector((state: any) => state.date.endDate);

  const handleOptionClick = (option: string): void => {
    setCurrentValue(option);
    toggleDropdown();
  };

  const handleClickOutside = useCallback((event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      toggleDropdown();
    }
  }, [toggleDropdown]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div className='dropdown' ref={dropdownRef}>
      <div
        className={`dropdown__toggle ${currentValue !== 'Все типы' ? 'active' : ''}`}
        onClick={toggleDropdown}
      >
        {currentValue}
      </div>
      {isOpen && (
        <div className='dropdown__menu' style={style}>
          <ul className='dropdown__list'>
            {options.map((option:any, index:number) => (
              <li
                key={index}
                className={`dropdown__item ${currentValue === option ? 'active' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          {dateBlock && (
            <div className='dropdown__date'>
              <div className='dropdown__date-title'>Указать даты</div>
              <div className='dropdown__date-wrap'>
                <CustomDatePicker
                  selectedDate={startDate || null}
                  setSelectedDate={(date) => dispatch({ type: 'SET_START_DATE', payload: date })}
                  maxDate={endDate || null}
                />
                <div style={{ margin: '0px 4px 0 0' }}>-</div>
                <CustomDatePicker
                  selectedDate={endDate || null}
                  setSelectedDate={(date) => dispatch({ type: 'SET_END_DATE', payload: date })}
                  maxDate={currentData}
                />
                <div className='dropdown__date-icon'>
                  <CalendarIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
