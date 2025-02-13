import { useState } from 'react';
import './Time.scss'; 
import AudioPlayer from '../../../AudioPlayer';

const Time = ({ 
  time,
  record,
  partnershipId
} : {
  time: number
  record?:string
  partnershipId?:string
}) => {

  const [audioSrc, setAudioSrc] = useState(null);

  const convertSecondsToMinutes = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
      <div className='Time'>
      {time !== 0 && <div className="Time__time">{convertSecondsToMinutes(time)}</div>}
      {record && partnershipId && (
        <AudioPlayer
          audioSrc={audioSrc}
          setAudioSrc={setAudioSrc}
          record={record}
          partnershipId={partnershipId}
        />
      )}
      </div>
  );
};

export default Time;

