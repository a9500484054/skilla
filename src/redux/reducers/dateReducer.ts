const initialState = {
  currentDate: new Date(),
  startDate: null,
  endDate: null,
  dataArray: [], // Инициализация массива данных
};

const dateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_DATE':
      return {
        ...state,
        currentDate: action.payload,
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.payload,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.payload,
      };
    case 'ADD_DATA':
      return {
        ...state,
        dataArray: action.payload,
      };
    case 'CLEAR_DATA':
      return {
        ...state,
        dataArray: [],
      };
    default:
      return state;
  }
};

export default dateReducer;