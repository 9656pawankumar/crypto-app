import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { RadialBarChart, RadialBar,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ReferenceLine,Line,LineChart} from 'recharts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
// Define the GraphQL query
const GET_TRANSACTION_DATA = gql`
query GetTransactionData($network: BitcoinNetwork!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    bitcoin(network: $network) {
      transactions(options: {asc: "date.date"}, date: {since: $from, till: $till}) {
        date {
          date(format: $dateFormat)
        }
        countBigInt
        totalFee: feeValue
        avgFee: feeValue(calculate: average)
      }
    }
  }
  
`;
const today = dayjs().format('YYYY-MM-DD');
const eightDaysAgo = dayjs().subtract(8, 'day').format('YYYY-MM-DD');

// TypeScript interfaces for the GraphQL query response and variables
interface Transaction {
  date: {
    date: string;
  };
  countBigInt: bigint;
  totalFee: number;
  avgFee: number;

}

interface BitcoinData {
  bitcoin: {
    transactions: Transaction[];
  };
}

interface QueryVariables {
  network: string;
  dateFormat: string;
  from: string;
  till: string;
}

// React component for visualizing Bitcoin transaction data
const BitcoinTransactionCharts: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
  const safeAddress = address || 'defaultAddress'; // Ensure address is defined
  
  const { loading, error, data } = useQuery<BitcoinData, QueryVariables>(GET_TRANSACTION_DATA, {
    variables: {
      network: "bitcoin",
      dateFormat: "%Y-%m-%d",
      from: eightDaysAgo,
      till: today,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  // Prepare the data for the charts
  

  // Prepare the data for the charts
  const chartData = data?.bitcoin.transactions.map(({ date, countBigInt, totalFee, avgFee }) => ({
    date: date.date,
    count: Number(countBigInt), // Convert BigInt to Number
    totalFee,
    avgFee,
  })) || [];

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };
  
  const CustomRadialBar: any = RadialBar;



  return (
    <div style={{ backgroundColor: '#efefef'}}>
  <h3 style={{ fontWeight: '900', color: '#333', textAlign: 'center'}}>Bitcoin Transaction Metrics</h3>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' , width:"40em" , margin:"20px" ,backgroundColor: '#fff'}}>
    {/* Transaction Count Chart */}
    <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em',marginRight: '5em' }}>
      <h4  style={{ fontWeight: '300', color: '#333', textAlign: 'left' , marginBottom: '0' , marginLeft: '1em'}}>Transaction Count by Date</h4>
    </div>
    <ResponsiveContainer width={500} height={300}>
      <BarChart data={chartData} stackOffset="sign" margin={{ top: 20, right: 40, left: 20, bottom: 5 }} 
        style={{ backgroundColor: '#fff', padding: '0rem', borderRadius: '8px' }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"}/>
        <YAxis stroke="#000" />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="count" fill="#71ace9" name="Transaction Count" />
      </BarChart>
    </ResponsiveContainer>

    {/* Total Fee Value Chart */}
    {/* Transaction Count Chart */}
    <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em',marginRight: '5em' }}>
      <h4  style={{ fontWeight: '300', color: '#333', textAlign: 'left' , marginBottom: '0' , marginLeft: '1em'}}>Total Fee(BTC) </h4>
    </div>
    <ResponsiveContainer width={500} height={300}>
      {/* <BarChart data={chartData} stackOffset="sign" margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
        style={{ backgroundColor: '#fff', padding: '0rem', borderRadius: '8px' }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"}/>
        <YAxis stroke="#000" />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="totalFee" fill="#82ca9d" name="Total Fee Value" />
      </BarChart> */}
      <LineChart width={500} height={300} data={chartData}  margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
    <Line type="monotone" dataKey="totalFee" stroke="#f25151" />
    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
    <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"}/>
        <YAxis stroke="#000" />
    <Tooltip />
  </LineChart>
    </ResponsiveContainer>

    {/* Total Average Fee Chart */}
    <div style={{ borderBottom: '1px solid darkgray', paddingBottom: '0.5rem', marginBottom: '1rem', width: '90%', marginLeft: '5em',marginRight: '5em' }}>
      <h4  style={{ fontWeight: '300', color: '#333', textAlign: 'left' , marginBottom: '0' , marginLeft: '1em'}}>Average Fee(BTC)</h4>
    </div>
    <LineChart width={500} height={300} data={chartData}  margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
    <Line type="monotone" dataKey="avgFee" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
    <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={110} stroke={"#000"}/>
        <YAxis stroke="#000" />
    <Tooltip />
  </LineChart>
  </div>
</div>

  );
};

export default BitcoinTransactionCharts;
