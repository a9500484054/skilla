import { useState, useEffect } from 'react';
import './DropdownType.scss'
import Dropdown from '../Dropdown/Dropdown';
import { DropdownTypeProps } from '../../type/type';
import { ArrowMiniIcon, CloseIcon } from '../../ui/icon';


const DropdownType = ({
  optionsType,
  onTypeChange
}: DropdownTypeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClearBtn, setIsClearBtn] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('Все типы');

  const toggleDropdown = (): void => {
    setIsOpen(prevState => !prevState);
  };

  const clearDropdown = (): void => {
    setCurrentValue('Все типы');
  };

  useEffect(() => {
    if(currentValue === 'Все типы') {
      setIsClearBtn(false);
      onTypeChange(currentValue)
    } else {
      setIsClearBtn(true);
      onTypeChange(currentValue)
    }

  },[currentValue])



  return (
    <div className='DropdownType'>
      <div className='DropdownType__dropdown'>
        <Dropdown                   
          options={optionsType}
          dateBlock={false}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          style={{
            left: '0'
          }}/>
      </div>
      <div className={`DropdownType__arrow ${isOpen ? 'DropdownType__arrow--active' : ''}`}>
        <ArrowMiniIcon
          width={9}
          height={6}
          fill={isOpen ? '#002CFB' : '#ADBFDF'}
          rotate={isOpen ? 0 : 180}
        />
      </div>
      {isClearBtn && 
        <button 
          type='button'
          className='DropdownType__clear'
          onClick={clearDropdown} >
            Сбросить фильтры
           <CloseIcon /> 
        </button>
      }
    </div>
  );
} 

export default DropdownType