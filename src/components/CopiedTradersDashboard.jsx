import React from 'react';
import { mockCopiedTraders } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const CopiedTradersDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Copied Traders</h1>

      {mockCopiedTraders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCopiedTraders.map(trader => (
            <Card key={trader.id} className="bg-gray-800 text-white border-gray-700">
              <CardHeader>
                <CardTitle>{trader.username}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2"><strong>Allocated Capital:</strong> ${trader.allocatedCapital.toLocaleString()}</p>
                <p className="mb-4"><strong>Current P&L:</strong> <span className={trader.currentPnl >= 0 ? 'text-green-400' : 'text-red-400'}>${trader.currentPnl.toLocaleString()}</span></p>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Pause Copying</Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Add Funds</Button>
                  <Button variant="destructive">Stop Copying</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          You are not currently copying any traders.
        </div>
      )}
    </div>
  );
};

export default CopiedTradersDashboard;


