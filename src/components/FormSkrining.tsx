import { useMemo, useState, cloneElement } from 'react';
import { JsonForms } from '@jsonforms/react';
import { BoundData } from '@site/src/components/BoundData';
import Button from '@mui/material/Button';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

const renderers = [
  ...materialRenderers,
];

export const FormSkrining = ({ judul, schema, uischema, middleware }) => {

  const [data, setData] = useState<object>({});
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <div>

      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        middleware={ middleware}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />

      {Object.keys(data).length ? <Button
        style={{marginBottom: 20}}
        onClick={clearData}
        color="primary"
        variant="contained"
        data-testid="clear-data">
        Clear data
      </Button> : null}

      <BoundData judul={ judul } stringifiedData={ stringifiedData}/>
      
      {/* { cloneElement( children, { stringifiedData }) } */}

    </div>
  );
};