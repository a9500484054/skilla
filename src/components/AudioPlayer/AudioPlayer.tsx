import { useRef, useState } from 'react';


import './AudioPlayer.scss'
import { fetchRecordData } from '../../api/api';
import { CloseIcon, DownloadIcon, PauseIcon, PlayIcon } from '../../ui/icon';

const AudioPlayer = ({ 
  audioSrc,
  setAudioSrc,
  record,
  partnershipId
} : {
  audioSrc: any;
  setAudioSrc: any;
  record: string;
  partnershipId: string;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');

  const handlePlayPause = async () => {
    try {
      if (!audioSrc) {
        const fetchedData = await fetchRecordData({
          record: record,
          partnershipId: partnershipId,
        });
        setAudioSrc(fetchedData);
      }

      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current?.pause();
        } else {
          audioRef.current?.play();
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
      alert('Произошла ошибка при загрузке или воспроизведении аудио. Пожалуйста, попробуйте позже.');
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTimeInSeconds = audioRef.current.currentTime;
      const formattedTime = convertSecondsToMinutes(currentTimeInSeconds);
      setCurrentTime(formattedTime);
      const duration = audioRef.current.duration;
      setProgress((currentTimeInSeconds / duration) * 100);
    }
  };

  const convertSecondsToMinutes = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="CustomAudioPlayer">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      >
        {audioSrc && <source src={audioSrc} type="audio/mpeg" />}
      </audio>
      <div className="CustomAudioPlayer__controls">
        <div className="CustomAudioPlayer__time">{currentTime}</div>
        <button
          className="CustomAudioPlayer__play"
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <div className="CustomAudioPlayer__progress-bar">
        <div
          className="CustomAudioPlayer__progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <a
        href={audioSrc}
        download
        className="CustomAudioPlayer__download"
      >
        <DownloadIcon />
      </a>
      <button>
        <CloseIcon width={14} height={14} fill='#002CFB'/>
      </button>
    </div>
  );
};

export default AudioPlayer;
