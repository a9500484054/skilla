import './Source.scss'; 

const Source = ({ 
  source
} : {
  source:string
}) => {

  return (
      <div className='Source'>{source}</div>
  );
};

export default Source;

