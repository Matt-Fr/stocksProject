# StockLens

**StockLens** is a dashboard application that allows users to visualize and compare American stocks/trackers, read articles about stocks, and manage their favorite trackers. Built with **Angular 18**, **PrimeNG**, **RxJS** and **Signals**, the application delivers a user-friendly and interactive experience for stock enthusiasts.

## Features

- **Stock Visualization**: View detailed information and performance metrics of stocks and trackers.
- **Interactive Graphs**: Dynamic and responsive charts using **ECharts**.
- **News Articles**: Stay updated with the latest stock-related news.
- **Favorites Management**: Save and quickly access favorite stocks or trackers.
- **Error Handling**: Friendly error messages for scenarios like `Ticker Not Found` or rate-limiting issues.

## Demo

https://stocklens-six.vercel.app/

## Technologies Used

- **Framework**: Angular 18
- **Charts**: ngx-echarts with ECharts
- **UI Components**: PrimeNG, PrimeFlex
- **State Management**: RxJS and Signals
- **Styling**: CSS and PrimeFlex

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v18 or higher)

### Steps

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/your-username/stocklens.git && cd stocklens
   npm install
   npm start
   ```
2. Install the project dependencies:
   npm install

3. Start the development server:
   ng serve
4. Open the application in your browser:
   http://localhost:4200

markdown
Copier le code

### Additional Setup

Ensure you have an `environment.development.ts` file in a folder named `environments` with the following content:

```typescript
export const environment = {
  production: false,
  apiKeyPolygon: "your key"
  apiKeyPolygon2: "your key"
  apiKeyTickerNews: "your key"
};

You will need to obtain one of each of these API keys to run the project successfully. The keys can be obtained from the respective API providers:

2 keys from Polygon API: https://polygon.io
1 from Marketaux (the ticker news) : https://www.marketaux.com/documentation

If you have any questions or need assistance setting up the environment, feel free to ask.
```
