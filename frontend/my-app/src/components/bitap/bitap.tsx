// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LineChart,Line,ResponsiveContainer,ReferenceLine } from 'recharts';
// import { useParams } from 'react-router-dom'; 
// import dayjs from 'dayjs';

// const today = dayjs().format('YYYY-MM-DD');
// const eightDaysAgo = dayjs().subtract(8, 'day').format('YYYY-MM-DD');

// interface TransactionData {
//     date: string;
//     inputValue: number;
//     outputValue: number;
//   }
  
//   interface BitcoinTransactionsChartProps {
//     data: TransactionData[];
//   }
  

// const BitcoinTransactionsChart: React.FC<BitcoinTransactionsChartProps> = ({ data }) => (
    

    
// <BarChart
// width={500}
// height={400}
// data={data}
// stackOffset="sign"
// margin={{
//   top: 20,
//   right: 40,
//   left: 0,
//   bottom: 5,
// }}
// style={{ backgroundColor: '#121a27', padding: '1em', borderRadius: '8px' }} // Set the background color here
// >
// <CartesianGrid strokeDasharray="3 3" stroke="#555" /> // Adjust grid line color for visibility
// <XAxis dataKey="date" angle={-90} textAnchor="end" interval={0} height={100} stroke={"#ccc"}/><YAxis stroke="#ccc" /> // Adjust text color for visibility
// <Tooltip />
// <Legend
//         formatter={(value) => {
//           const newLabels: { [key: string]: string } = {
//             inputValue: "Received BTC",
//             outputValue: "Sent BTC",
//           };
//           return newLabels[value as keyof typeof newLabels] || value;
//         }}
//        /> // Adjust legend text color for visibility
// <ReferenceLine y={0} stroke="#000" />
// <Bar dataKey="inputValue" fill="#249d24" stackId="stack" />
// <Bar dataKey="outputValue" fill="#e73635" stackId="stack" />
// </BarChart>


//    /* <LineChart width={500} height={300} data={data} margin={{ top: 20,right: 30,left: 20,bottom: 5,}}>
//   <XAxis dataKey="name"/>
//   <YAxis/>
//   <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
//   <Line type="monotone" dataKey="inputValue" stroke="#249d24" />
//   <Line type="monotone" dataKey="outputValue" stroke="#e73635" />
// </LineChart>  */

//   );
// // Define TypeScript interfaces for the GraphQL query response and variables
// interface BitcoinData {
//   bitcoin: {
//     inputs: Array<{
//       date: {
//         date: string;
//       };
//       value: string;
//     }>;
//     outputs: Array<{
//       date: {
//         date: string;
//       };
//       value: string;
//     }>;
//   };
// }

// interface QueryVariables {
//   network: string;
//   address: string;
//   dateFormat: string;
//   from: string;
//   till: string;
// }

// // Define the GraphQL query
// const GET_BITCOIN_DATA = gql`
//   query GetBitcoinData($network: BitcoinNetwork!, $address: String!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
//     bitcoin(network: $network) {
//       inputs(
//         date: {since: $from, till: $till}
//         inputAddress: {is: $address}
//         options: {asc: "date.date"}
//       ) {
//         date {
//           date(format: $dateFormat)
//         }
//         value
//       }
//       outputs(
//         date: {since: $from, till: $till}
//         outputAddress: {is: $address}
//         options: {asc: "date.date"}
//       ) {
//         date {
//           date(format: $dateFormat)
//         }
//         value
//       }
//     }
//   }
// `;

// // React component using TypeScript
// const BitcoinDataFetcher: React.FC = () => {
//     const { address } = useParams<{ address?: string }>(); // Note that address is potentially undefined
//     const safeAddress = address || 'defaultAddress';
//   const { loading, error, data } = useQuery<BitcoinData, QueryVariables>(GET_BITCOIN_DATA, {
//     variables: {
//       network: "bitcoin",
//       address: safeAddress,
//       dateFormat: "%Y-%m-%d",
//       from: eightDaysAgo,
//       till: today,
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :( {error.message}</p>;
//   console.log(error)


//   const allDates = [
//     ...(data?.bitcoin.inputs?.map(input => input.date.date) || []),
//     ...(data?.bitcoin.outputs?.map(output => output.date.date) || [])
//   ];
  
//   const uniqueDates = Array.from(new Set(allDates));
//   uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  
//   // Now, map over these unique dates to construct the chart data
//   const chartData = uniqueDates.map(date => {
//     const input = data?.bitcoin.inputs?.find(input => input.date.date === date);
//     const output = data?.bitcoin.outputs?.find(output => output.date.date === date);
  
//     return {
//       date: date,
//       outputValue: input ? -Math.abs(parseFloat(input.value)) : 0,
//       inputValue: output ? (parseFloat(output.value)) : 0
//     };
//   }); // Add an empty array as a fallback
  

//   return (
//     <div>
//       <h3>Bitcoin Transactions </h3>
//       {loading && <p>Loading...</p>} {/* Loading state */}
//       {error && <p>Error: {error}</p>} {/* Error state */}
//       {!loading && !error && <BitcoinTransactionsChart data={chartData} />}
//     </div>
//   );
// };

// export default BitcoinDataFetcher;
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,Legend } from 'recharts';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
const eightDaysAgo = dayjs().subtract(8, 'day').format('YYYY-MM-DD');

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

// TypeScript interfaces for the GraphQL query response and variables
interface TransactionData {
  date: string;
  inputValue: number;
  outputValue: number;
}

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

interface BitcoinTransactionsChartProps {
  data: TransactionData[];
}

const BitcoinTransactionsChart: React.FC<BitcoinTransactionsChartProps> = ({ data }) => (
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
);

const BitcoinDataFetcher: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
  const safeAddress = address || 'defaultAddress';
  const refetchInterval = 60 * 5 * 1000; // 5 minutes in milliseconds

  const { loading, error, data, refetch } = useQuery<BitcoinData>(GET_BITCOIN_DATA, {
    variables: {
      network: "bitcoin",
      address: safeAddress,
      dateFormat: "%Y-%m-%d",
      from: eightDaysAgo,
      till: today,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, refetchInterval);
    return () => clearInterval(intervalId);
  }, [refetch, refetchInterval]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const chartData: TransactionData[] = data ? data.bitcoin.inputs.map(input => {
    const output = data.bitcoin.outputs.find(out => out.date.date === input.date.date);
    return {
      date: input.date.date,
      outputValue: -Math.abs(parseFloat(input.value)),
      inputValue: output ? (parseFloat(output.value)) : 0,
    };
  }) : [];

  return (
    <div>
      <h3>Bitcoin Transactions</h3>
      <BitcoinTransactionsChart data={chartData} />
    </div>
  );
};

export default BitcoinDataFetcher;
