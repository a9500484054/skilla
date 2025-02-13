import './Date.scss'; 
import { format } from 'date-fns';

const Date = ({ 
  date
} : {
  date: string
}) => {

  return (
      <>
        {format(date, 'HH:mm')}
      </>
  );
};

export default Date;

