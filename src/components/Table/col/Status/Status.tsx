import './Status.scss'; 

const Status = ({ 
  status, error 
}: { 
  status?: string;
   error: string[] 
}) => {
  const checkStatus = (key: string) => {
    switch (key) {
      case "Отлично":
        return 'Status__badge--success';
      case "Хорошо":
        return 'Status__badge--good';
      case "Плохо":
        return 'Status__badge--bad';
      default:
        return ''; // Если статус не определен или неизвестен
    }
  };

  const errorValue = error.length > 0;

  return (
    <div className='Status'>
      {!errorValue && status && (
        <div className={`Status__badge ${checkStatus(status)}`}>
          {status}
        </div>
      )}
      {errorValue && (
        <div className='Status__error'>
          {error[0]}
        </div>
      )}
    </div>
  );
};


export default Status;

