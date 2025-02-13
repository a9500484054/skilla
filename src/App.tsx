import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { format } from 'date-fns'
import { fetchData } from './api/api';
import DropdownType from './components/DropdownType';
import DropdownDate from './components/DropdownDate';
import Table from './components/Table';

import './App.scss'

const options: string[] = ["Неделя", "Месяц", "Год"];
const optionsType: string[] = ["Все типы", "Входящие", "Исходящие"];

function App() {
    const data = useSelector((state: any) => state.date.dataArray); 
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState<string>('Все типы');
    
    const filteredData = useMemo(() => {
        if (data.results) {
            const currentValue = filterValue === 'Входящие' ? 1 : filterValue === 'Исходящие' ? 0 : 'Все типы';
            if (currentValue === "Все типы") {
                return data.results;
            } else {
                return data.results.filter((item: any) => item.in_out === currentValue);
            }
        }
        return [];
    }, [data, filterValue]);

    useEffect(() => {
        const fetchAndSetData = async () => {
          try {
              const fetchedData = await fetchData({ 
                  dateStart: format(new Date(), 'yyyy-MM-dd'),
                  dateEnd: format(new Date(), 'yyyy-MM-dd'),
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
        fetchAndSetData();
    }, [dispatch]);

    return (
        <>
          <div className='wrapper'>
            <div className='header'>
              <div className='header__type'>
                {data.results &&                
                  <DropdownType 
                    onTypeChange={(type: any) => setFilterValue(type)} 
                    optionsType={optionsType}
                  />
                }
              </div>
              <div className='header__date'>
                <DropdownDate 
                  optionsType={options}/>
              </div>
            </div>
            <div className='table'>
              {Array.isArray(filteredData) ? <Table data={filteredData} /> : <p>Нет данных для отображения</p>}
            </div>
          </div>
        </> 
    )
}

export default App;
