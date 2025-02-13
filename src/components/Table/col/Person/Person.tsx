import './Person.scss'; 

const Person = ({ 
  avatar,
  name,
  surname
} : {
  avatar: string;
  name: string;
  surname: string;
}) => {
  const fio = `${name} ${surname}`

  return (
      <div className='Avatar'>
        <img src={avatar} alt={fio} />
      </div>
  );
};

export default Person;

