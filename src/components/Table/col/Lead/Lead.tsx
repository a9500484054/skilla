import './Lead.scss'; 

const Lead = ({ 
  contactName,
  contactCompany,
  toNumber
 } : {
  contactName: string;
  contactCompany: string;
  toNumber: string;
 }) => {

  return (
    <div className='Lead'>
      <div className='Lead__name'>{contactName}</div>
      <div className='Lead__contact'>
        {contactCompany === "" && (
          <div className='Lead__phone'>{toNumber}</div>
        )}
        {toNumber === "" && (
          <div className='Lead__nameCompany'>{contactCompany}</div>
        )}
      </div>
    </div>
  );
};

export default Lead;

