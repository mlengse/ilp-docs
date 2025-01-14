import { useMemo, useState, cloneElement } from 'react';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

const initialData = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const renderers = [
  ...materialRenderers,
];

export const Formku = ({ schema, uischema, children }) => {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <div>
      <Typography variant={'h4'}>Rendered form</Typography>
      <Button
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
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />

      { cloneElement( children, { stringifiedData }) }

    </div>
  );
};