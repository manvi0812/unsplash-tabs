/* eslint-disable react/prop-types */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Charts = ({ data, xLabel, yLabel }) => {
  return (
    <>
      <ResponsiveContainer width='100%' height='35%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={xLabel} />
          <YAxis dataKey={yLabel} />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey={yLabel}
            stroke='#ffe187'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;
