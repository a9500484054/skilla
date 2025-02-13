import { useState } from 'react';
import './ColSort.scss'; 
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '../../../../type/type';
import { fetchData } from '../../../../api/api';
import { ArrowMiniIcon } from '../../../../ui/icon';

const ColSort = ({ 
  title,
  sortBy
} : {
  title:string,
  sortBy: "date" | "duration" 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentDate = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();
  
  const toggleDropdown = (): void => {
    setIsOpen(prevState => !prevState);
    fetchAndSetData();
  };

  const fetchAndSetData = async () => {
    let dateStart: string = format(currentDate, 'yyyy-MM-dd')
    let dateEnd: string = format(new Date(), 'yyyy-MM-dd');
      try {
          const fetchedData = await fetchData({ 
              dateStart: dateStart,
              dateEnd: dateEnd,
              sortBy: sortBy,
          });
          dispatch({ type: 'ADD_DATA', payload: fetchedData });
      } catch (err: unknown) {
          if (err instanceof Error) {
              throw new Error(err.message);
          } else {
              throw new Error('Произошла неизвестная ошибка');
          }
      }
  };

  return (
      <div
        onClick={toggleDropdown} 
        className='ColSort'>
        <div className='ColSort__title'>
          {title}
          <div className={`ColSort__arrow ${isOpen ? 'ColSort__arrow--active' : ''}`}>
            <ArrowMiniIcon
              width={9}
              height={6}
              fill={isOpen ? '#002CFB' : '#ADBFDF'}
              rotate={isOpen ? 0 : 180}
            />
          </div>
        </div>
      </div>
  );
};

export default ColSort;

