import { useCallback } from 'react';
import { FormSkrining } from '@site/src/components/FormSkrining';
import { INIT, UPDATE_CORE, UPDATE_DATA } from  '@jsonforms/core';
import schema from './schema.json';
import uischema from './uischema.json';

import {
	differenceInDays,
	differenceInMonths,
	differenceInWeeks,
	differenceInYears
} from "date-fns";

export const FormTB = () => {
  const middleware = useCallback((state, action, defaultReducer) => {
    const newState = defaultReducer(state, action);
    function calculateAge (date) {
      const today = new Date();
      const dateObject = new Date(date.split('-').reverse());
      const ageYears = differenceInYears(today, dateObject);
      const ageMonths = differenceInMonths(today, dateObject);
      const ageDays = differenceInDays(today, dateObject);
      const ageWeeks = differenceInWeeks(today, dateObject);
      if(ageYears){
        return `${ageYears} tahun`
      }
      if(ageMonths > 0){
        return `${ageMonths} bulan`
      }
      if(ageWeeks > 0){
        return `${ageWeeks} minggu`
      }
      if(ageDays > 0){
        return `${ageDays} hari`
      }
    };
    switch (action.type) {
      case INIT:
      case UPDATE_CORE:
      case UPDATE_DATA: {
        if(newState.data.tanggal_lahir){
          newState.data.usia = calculateAge(newState.data.tanggal_lahir);
          return newState;
        }
      }
      default:
        return newState;
    }
  }, []);

  return <FormSkrining
    judul={'Skrining TB'}
    schema={schema}
    uischema={uischema}
    middleware={ middleware}
  />

};