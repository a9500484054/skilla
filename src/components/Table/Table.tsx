import './Table.scss'; 

import Call from './col/Call';
import Date from './col/Date';
import Person from './col/Person';
import Lead from './col/Lead';
import Source from './col/Source';
import Status from './col/Status';
import Time from './col/Time';
import ColSort from './col/ColSort';
import { useEffect, useState } from 'react';

const Table = ({ data } : {data: any[]}) => {

  const [loader, setLoader] = useState<boolean>(true)

  function getRandomFeedback() {
    const feedbacks = ["Отлично", "Хорошо", "Плохо"];
    const randomIndex = Math.floor(Math.random() * feedbacks.length);
    return feedbacks[randomIndex];
  }

  useEffect(()=>{
    setLoader(true)
  }, [])

  useEffect(()=>{
    setLoader(false)
  }, [data])

  return (
    <table className="Table">
      <thead>
        <tr className='row'>
          <th className='col col__call'>Тип</th>
          <th className='col col__date'>
            <ColSort 
              title='Время'
              sortBy='date'
            />
          </th>
          <th className='col col__person'>Сотрудник</th>
          <th className='col col__lead'>Звонок</th>
          <th className='col col__source'>Источник</th>
          <th className='col col__status'>Оценка</th>
          <th className='col col__time'>
            <ColSort 
              title='Длительность'
              sortBy='duration'
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {loader ? (
          <tr>
            <td 
              colSpan={7}
              style={{
                padding:'60px',
                textAlign:'center'
              }}>
                Загрузка....
              </td>
          </tr>
        ) : (
          data.map((item:any, index:number) => (
              <tr 
                className='row' 
                key={index}
              >
                <td className='col col__call'>
                  <Call 
                    status={item.status}
                    inOut={item.in_out} 
                  />
                </td>
                <td className='col col__date'>
                  <Date date={item.date}/>
                </td>  
                <td className='col col__person'>
                  <Person 
                    avatar={item.person_avatar}
                    name={item.person_name}
                    surname={item.person_surname}
                  />
                </td>
                <td className='col col__lead'>
                  <Lead
                    contactName={item.contact_name}
                    contactCompany={item.contact_company}
                    toNumber={item.to_number}
                  />
                </td>
                <td className='col col__source'>
                  <Source 
                    source={item.source}
                  />
                </td>
                <td className='col col__status'>
                  <Status 
                    error={item.errors}
                    status={getRandomFeedback()}
                  />
                </td>
                <td className='col col__time'>
                  <Time
                    time={item.time}
                    record={item.record}
                    partnershipId={item.partnership_id}
                  />
                </td>
              </tr>
          ))
        )
        }
      </tbody>
    </table>
  );
};

export default Table;

