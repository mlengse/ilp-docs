import { useMemo, useState, cloneElement, useCallback } from 'react';
import { JsonForms } from '@jsonforms/react';
import { INIT, UPDATE_CORE, UPDATE_DATA } from  '@jsonforms/core'
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import {
	differenceInDays,
	// differenceInHours,
	// differenceInMinutes,
	differenceInMonths,
	// differenceInSeconds,
	differenceInWeeks,
	differenceInYears
}
	from "date-fns";

// const initialData = {
//   name: 'Send email to Adrian',
//   description: 'Confirm if you have passed the subject\nHereby ...',
//   done: true,
//   recurrence: 'Daily',
//   rating: 3,
// };

const renderers = [
  ...materialRenderers,
];

export const Formku = ({ schema, uischema, children }) => {
  const middleware = useCallback((state, action, defaultReducer) => {
    const newState = defaultReducer(state, action);
    function calculateAge (date) {
      const today = new Date();
      const dateObject = new Date(date.split('-').reverse());
      const ageYears = differenceInYears(today, dateObject);
      const ageMonths = differenceInMonths(today, dateObject);
      const ageDays = differenceInDays(today, dateObject);
      const ageWeeks = differenceInWeeks(today, dateObject);
      // const ageHours = differenceInHours(today, dateObject);
      // const ageMinutes = differenceInMinutes(today, dateObject);
      // const ageSeconds = differenceInSeconds(today, dateObject);
      // console.log(ageYears, ageMonths, ageWeeks, ageDays)
      if(ageYears){
        return `${ageYears} tahun`
      }
      if(ageMonths > 0){
        return `${ageMonths} bulan`
      }
      if(ageDays > 0){
        return `${ageDays} hari`
      }
      if(ageWeeks > 0){
        return `${ageWeeks} minggu`
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

  const [data, setData] = useState<object>({});
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <div>
      {/* <Typography variant={'h4'}>Rendered form</Typography> */}
      <Button
        style={{marginBottom: 20}}
        onClick={clearData}
        color="primary"
        variant="contained"
        data-testid="clear-data">
        Clear data
      </Button>

      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        middleware={ middleware}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />

      { cloneElement( children, { stringifiedData }) }

    </div>
  );
};