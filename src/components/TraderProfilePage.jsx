import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TraderProfilePage = ({ trader, onBack, onCopyTrader }) => {
  return (
    <div className="container mx-auto px-4 py-6 text-white">
      <Button onClick={onBack} className="mb-4 bg-gray-600 hover:bg-gray-700">← Back to Leaderboard</Button>
      
      <h1 className="text-3xl font-bold mb-6">{trader.username}'s Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trader.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#374151', border: 'none' }}
                  labelStyle={{ color: '#e5e7eb' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Key Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>P&L:</strong> <span className="text-green-400">${trader.pnl.toLocaleString()}</span></p>
            <p className="mb-2"><strong>Rank:</strong> #{trader.rank}</p>
            <p className="mb-2"><strong>Risk Score:</strong> <span className={`font-semibold ${
                trader.riskScore === 'Low' ? 'text-green-500' :
                trader.riskScore === 'Medium' ? 'text-yellow-500' :
                'text-red-500'
              }`}>{trader.riskScore}</span></p>
            <p className="mb-2"><strong>Copiers:</strong> {trader.copiers}</p>
            <p className="mb-2"><strong>Win Rate:</strong> {trader.stats.winRate}%</p>
            <p className="mb-2"><strong>Avg. Bet Size:</strong> ${trader.stats.avgBetSize.toLocaleString()}</p>
            <p className="mb-2"><strong>Most Profitable Categories:</strong> {trader.stats.profitableCategories.join(', ')}</p>
            <p className="mb-2"><strong>Biggest Win:</strong> <span className="text-green-400">${trader.stats.biggestWin.toLocaleString()}</span></p>
            <p className="mb-2"><strong>Biggest Loss:</strong> <span className="text-red-400">${trader.stats.biggestLoss.toLocaleString()}</span></p>
            <Button onClick={() => onCopyTrader(trader)} className="mt-4 w-full bg-green-600 hover:bg-green-700">Copy Trader</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Current Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            {trader.currentPortfolio.length > 0 ? (
              <ul>
                {trader.currentPortfolio.map((position, index) => (
                  <li key={index} className="mb-1">Market ID: {position.marketId}, Position: {position.position}, Amount: ${position.amount.toLocaleString()}</li>
                ))}
              </ul>
            ) : (
              <p>No open positions.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Recent Trade History</CardTitle>
          </CardHeader>
          <CardContent>
            {trader.tradeHistory.length > 0 ? (
              <ul>
                {trader.tradeHistory.map((trade, index) => (
                  <li key={index} className="mb-1">Market ID: {trade.marketId}, Outcome: {trade.outcome}, Profit: <span className={trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}>${trade.profit.toLocaleString()}</span>, Date: {trade.date}</li>
                ))}
              </ul>
            ) : (
              <p>No recent trade history.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TraderProfilePage;


