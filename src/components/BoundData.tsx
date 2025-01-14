import Typography from '@mui/material/Typography';

export const BoundData = ({ stringifiedData }) => {
  return (
    <div>

      <Typography variant={'h4'}>Bound data</Typography>

      <div style={{ width: '100%' }}>
        <pre id="boundData">{stringifiedData}</pre>
      </div>

    </div>
  );
};