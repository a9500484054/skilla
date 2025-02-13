import axios from 'axios';
import { FetchParams, FetchRecordParams } from '../type/type';

export const fetchData = async ({
    dateStart, 
    dateEnd, 
    inOut = '', 
    sortBy 
} : FetchParams) => {
  const url = "https://api.skilla.ru/mango/getList";
  const params = {
    date_start: dateStart,
    date_end: dateEnd,
    in_out: inOut,
    sort_by: sortBy
  };
  const headers = {
    'Authorization': 'Bearer testtoken',
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(url, params, { headers });
    return response.data; 
  } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Произошла неизвестная ошибка');
      }
  }
};

export const fetchRecordData = async ({
  record, 
  partnershipId, 
} : FetchRecordParams) => {
  const url = "https://api.skilla.ru/mango/getRecord";
  const params = {
    record: record,
    partnership_id: partnershipId,
  };
  const headers = {
    'Authorization': 'Bearer testtoken',
    'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
    'Content-Transfer-Encoding': 'binary',
    'Content-Disposition' : 'filename="record.mp3"'
  };

  try {
    const response = await axios.post(url, params, { headers });
    return response.data; 
  } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Произошла неизвестная ошибка');
      }
  }
};
