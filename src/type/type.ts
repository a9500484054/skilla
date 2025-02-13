export type FetchParams = {
    dateStart: string;
    dateEnd: string;
    inOut?: string | number;
    sortBy?: 'date' |'duration';
}

export type FetchRecordParams = {
    record: any;
    partnershipId: any;    
}

export type DropdownDateProps = {
    optionsType: string[];
  }
  
export type RootState = {
    date: {
      currentDate: Date;
      startDate: Date | null;
      endDate: Date | null;
    };
  }

export type CustomDatePickerProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  maxDate?: Date;
}


export type DropdownProps = {
  options: string[];
  dateBlock: boolean;
  isOpen: boolean;
  toggleDropdown: () => void;
  currentValue: any;
  setCurrentValue: (value: string) => void;
  endDate?: any;
  startDate?: any;
  style?: any;
}

export type DropdownTypeProps = {
  optionsType: any
  onTypeChange: (type: string) => void;
}