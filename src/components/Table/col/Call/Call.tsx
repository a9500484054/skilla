import './Call.scss'; 
import { ArrowIcon } from '../../../../ui/icon';

const Call = ({ 
  status, 
  inOut 
} : {
  status: string;
  inOut: number 
}) => {

  const colorArrow = status === 'Не дозвонился' || status === 'Пропущенный' ? '#EA1A4F' : inOut ? '#002CFB' : '#28A879';

  return (
      <>
        <ArrowIcon 
            rotate={inOut ? 0 : 180}
            fill={colorArrow}
          />
      </>
  );
};

export default Call;

