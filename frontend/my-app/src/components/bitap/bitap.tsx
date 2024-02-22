import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LineChart,Line,ResponsiveContainer,ReferenceLine } from 'recharts';
import { useParams } from 'react-router-dom'; 

interface TransactionData {
    date: string;
    inputValue: number;
    outputValue: number;
  }
  
  interface BitcoinTransactionsChartProps {
    data: TransactionData[];
  }
  
//   const BitcoinTransactionsChart: React.FC<BitcoinTransactionsChartProps> = ({ data }) => (
//     <BarChart
//       width={500} // Increase width to accommodate vertical dates
//       height={300}
//       data={data}
//       margin={{
//         top: 20,
//         right: 30,
//         left: 20,
//         bottom: 20, // Increase bottom margin for vertical dates
//       }}
//       barGap={0} // Removes the gap between bars in a stack
//       barCategoryGap={3} // Minimal gap between each category (date)
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={100} />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="inputValue" stackId="a" fill="#249d24" name="Input Value" />
//       <Bar dataKey="outputValue" stackId="a" fill="#e73635" name="Output Value" />
//     </BarChart>
//   );
const BitcoinTransactionsChart: React.FC<BitcoinTransactionsChartProps> = ({ data }) => (
    
//     <BarChart
//     width={500}
//     height={300}
//     data={data}
//     stackOffset="sign"
//     margin={{
//       top: 5,
//       right: 30,
//       left: 20,
//       bottom: 5,
//     }}
//   >
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//     <ReferenceLine y={0} stroke="#000" />
//     <Bar dataKey="inputValue" fill="#249d24" stackId="stack" />
//     <Bar dataKey="outputValue" fill="#e73635" stackId="stack" />
//   </BarChart>
    
<BarChart
width={500}
height={400}
data={data}
stackOffset="sign"
margin={{
  top: 20,
  right: 40,
  left: 0,
  bottom: 5,
}}
style={{ backgroundColor: '#121a27', padding: '1em', borderRadius: '8px' }} // Set the background color here
>
<CartesianGrid strokeDasharray="3 3" stroke="#555" /> // Adjust grid line color for visibility
<XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={100} stroke={"#ccc"}/><YAxis stroke="#ccc" /> // Adjust text color for visibility
<Tooltip />
<Legend
        formatter={(value) => {
          const newLabels: { [key: string]: string } = {
            inputValue: "Received BTC",
            outputValue: "Sent BTC",
          };
          return newLabels[value as keyof typeof newLabels] || value;
        }}
       /> // Adjust legend text color for visibility
<ReferenceLine y={0} stroke="#000" />
<Bar dataKey="inputValue" fill="#249d24" stackId="stack" />
<Bar dataKey="outputValue" fill="#e73635" stackId="stack" />
</BarChart>


   /* <LineChart width={500} height={300} data={data} margin={{ top: 20,right: 30,left: 20,bottom: 5,}}>
  <XAxis dataKey="name"/>
  <YAxis/>
  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
  <Line type="monotone" dataKey="inputValue" stroke="#249d24" />
  <Line type="monotone" dataKey="outputValue" stroke="#e73635" />
</LineChart>  */

  );
// Define TypeScript interfaces for the GraphQL query response and variables
interface BitcoinData {
  bitcoin: {
    inputs: Array<{
      date: {
        date: string;
      };
      value: string;
    }>;
    outputs: Array<{
      date: {
        date: string;
      };
      value: string;
    }>;
  };
}

interface QueryVariables {
  network: string;
  address: string;
  dateFormat: string;
  from: string;
  till: string;
}

// Define the GraphQL query
const GET_BITCOIN_DATA = gql`
  query GetBitcoinData($network: BitcoinNetwork!, $address: String!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    bitcoin(network: $network) {
      inputs(
        date: {since: $from, till: $till}
        inputAddress: {is: $address}
        options: {asc: "date.date"}
      ) {
        date {
          date(format: $dateFormat)
        }
        value
      }
      outputs(
        date: {since: $from, till: $till}
        outputAddress: {is: $address}
        options: {asc: "date.date"}
      ) {
        date {
          date(format: $dateFormat)
        }
        value
      }
    }
  }
`;

// React component using TypeScript
const BitcoinDataFetcher: React.FC = () => {
    const { address } = useParams<{ address?: string }>(); // Note that address is potentially undefined
    const safeAddress = address || 'defaultAddress';
  const { loading, error, data } = useQuery<BitcoinData, QueryVariables>(GET_BITCOIN_DATA, {
    variables: {
      network: "bitcoin",
      address: safeAddress,
      dateFormat: "%Y-%m-%d",
      from: "2024-02-11",
      till: "2024-02-18T23:59:59",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;
  console.log(error)


const chartData = data?.bitcoin.inputs.map(input => {
    const output = data.bitcoin.outputs.find(out => out.date.date === input.date.date);
    return {
      date: input.date.date,
      inputValue: parseFloat(input.value),
      outputValue: output ? -Math.abs(parseFloat(output.value)) : 0
    };
  }) || []; // Add an empty array as a fallback
  

  return (
    <div>
      <h3>Bitcoin Transactions </h3>
      {loading && <p>Loading...</p>} {/* Loading state */}
      {error && <p>Error: {error}</p>} {/* Error state */}
      {!loading && !error && <BitcoinTransactionsChart data={chartData} />}
    </div>
  );
};

export default BitcoinDataFetcher;
