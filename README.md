# Bitcoin Transaction Visualization Tool

## Overview

This tool provides a comprehensive visualization of Bitcoin transaction data, offering insights into transaction counts, total fees, and average fees over time. It's designed to assist users, analysts, and enthusiasts in understanding Bitcoin's transaction dynamics through interactive and informative charts.

## Features

- **Transaction Count Chart**: Visualizes the number of Bitcoin transactions per day, allowing users to identify trends and patterns in transaction activity over time.
- **Total Fee Chart**: Displays the total fee value in BTC for transactions per day, providing insights into the economic aspects of the Bitcoin network.
- **Average Fee Chart**: Shows the average fee per transaction in BTC, offering a perspective on the cost of Bitcoin transactions and network congestion.

## Getting Started

To use this tool, simply navigate to the web interface and enter the Bitcoin address you wish to analyze. The tool will fetch transaction data for the past eight days and present it in a series of interactive charts.

## Screenshots

### Transaction Count Chart, Total Fee Chart, Average Fee Chart
(/Users/pawankumarkrishnan/Desktop/crypto/crypto-app/frontend/my-app/src/transaction.png)

This chart illustrates the daily transaction count, highlighting the fluctuations in Bitcoin network activity.
The total fees in BTC collected each day, reflecting the economic throughput of the Bitcoin network.
The average transaction fee in BTC, providing insights into the cost of transactions and network congestion levels.

### 
![Total Fee Chart](/Users/pawankumarkrishnan/Desktop/crypto/crypto-app/frontend/my-app/src/transaction.png)

 

## Technical Details

- **Data Fetching**: Utilizes Apollo Client to fetch data from a GraphQL endpoint, ensuring real-time and accurate information.
- **Charting Library**: Employs Recharts for rendering interactive and responsive charts, enhancing the user experience with customizable visualizations.
- **Date Handling**: Leverages Day.js for date manipulation and formatting, ensuring consistent and localized date representations.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Start the development server with `npm start`.
4. Access the tool via `http://localhost:3000` or `http://localhost:3000/:{BTCaddress}`  in your web browser.


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
