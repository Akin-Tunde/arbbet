import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Eye,
  AlertTriangle,
  DollarSign,
  Clock,
  Info
} from 'lucide-react';

const AdvancedAnalytics = ({ market }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [slippageAmount, setSlippageAmount] = useState('');

  // Mock data for charts
  const priceData = useMemo(() => {
    const basePrice = 0.65;
    const data = [];
    const events = [
      { time: 6, event: "Major news announcement", impact: 0.08 },
      { time: 14, event: "Expert analysis published", impact: -0.03 },
      { time: 20, event: "Social media buzz", impact: 0.05 }
    ];
    
    for (let i = 0; i < 24; i++) {
      let price = basePrice + (Math.random() - 0.5) * 0.1;
      const event = events.find(e => e.time === i);
      if (event) {
        price += event.impact;
      }
      
      data.push({
        time: `${i}:00`,
        price: Math.max(0.1, Math.min(0.9, price)),
        volume: Math.floor(Math.random() * 50000) + 10000,
        ma7: price * 0.98,
        ma30: price * 1.02,
        event: event?.event || null
      });
    }
    return data;
  }, []);

  const depthData = useMemo(() => {
    const currentPrice = 0.65;
    const buyOrders = [];
    const sellOrders = [];
    
    // Generate buy orders (below current price)
    for (let i = 0; i < 20; i++) {
      const price = currentPrice - (i * 0.01);
      const volume = Math.floor(Math.random() * 10000) + 1000;
      buyOrders.push({ price: price.toFixed(3), volume, cumulative: 0 });
    }
    
    // Generate sell orders (above current price)
    for (let i = 0; i < 20; i++) {
      const price = currentPrice + (i * 0.01);
      const volume = Math.floor(Math.random() * 10000) + 1000;
      sellOrders.push({ price: price.toFixed(3), volume, cumulative: 0 });
    }
    
    // Calculate cumulative volumes
    let cumBuy = 0;
    buyOrders.reverse().forEach(order => {
      cumBuy += order.volume;
      order.cumulative = cumBuy;
    });
    
    let cumSell = 0;
    sellOrders.forEach(order => {
      cumSell += order.volume;
      order.cumulative = cumSell;
    });
    
    return { buyOrders: buyOrders.reverse(), sellOrders, currentPrice };
  }, []);

  const holderData = useMemo(() => {
    return [
      { name: 'Top 10 Holders', value: 45, color: '#3B82F6' },
      { name: 'Next 50 Holders', value: 30, color: '#10B981' },
      { name: 'Remaining Holders', value: 25, color: '#F59E0B' }
    ];
  }, []);

  const topHolders = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      shares: Math.floor(Math.random() * 50000) + 10000,
      value: Math.floor((Math.random() * 50000 + 10000) * 0.65),
      change24h: (Math.random() - 0.5) * 20
    }));
  }, []);

  const tradeHistory = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
      side: Math.random() > 0.5 ? 'Buy' : 'Sell',
      price: (0.6 + Math.random() * 0.1).toFixed(3),
      quantity: Math.floor(Math.random() * 5000) + 100,
      total: Math.floor((0.6 + Math.random() * 0.1) * (Math.random() * 5000 + 100))
    }));
  }, []);

  const whaleActivity = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${7-i}`,
      netChange: (Math.random() - 0.5) * 100000,
      whaleCount: Math.floor(Math.random() * 5) + 3
    }));
  }, []);

  const calculateSlippage = (amount) => {
    if (!amount || amount <= 0) return null;
    
    const basePrice = 0.65;
    const slippageRate = Math.min(amount / 100000, 0.1); // Max 10% slippage
    const finalPrice = basePrice * (1 - slippageRate);
    const slippagePercent = (slippageRate * 100).toFixed(2);
    
    return {
      originalPrice: basePrice,
      finalPrice: finalPrice.toFixed(4),
      slippage: slippagePercent,
      totalCost: (amount * finalPrice).toFixed(2)
    };
  };

  const slippageResult = calculateSlippage(parseFloat(slippageAmount));

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Advanced Analytics & Charting
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Professional Tools
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="chart" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Interactive Chart
            </TabsTrigger>
            <TabsTrigger value="depth" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Market Depth
            </TabsTrigger>
            <TabsTrigger value="holders" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Holder Analysis
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Trade History
            </TabsTrigger>
          </TabsList>

          {/* Interactive Chart Tab */}
          <TabsContent value="chart" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant={selectedTimeframe === '1h' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedTimeframe('1h')}
                >
                  1H
                </Button>
                <Button 
                  variant={selectedTimeframe === '24h' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedTimeframe('24h')}
                >
                  24H
                </Button>
                <Button 
                  variant={selectedTimeframe === '7d' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedTimeframe('7d')}
                >
                  7D
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% (24h)
                </Badge>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" domain={[0.4, 0.8]} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-blue-600">Price: {payload[0].value.toFixed(3)}</p>
                            <p className="text-gray-600">Volume: {data.volume.toLocaleString()}</p>
                            {data.event && (
                              <p className="text-orange-600 text-sm mt-1">
                                <AlertTriangle className="h-3 w-3 inline mr-1" />
                                {data.event}
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma7" 
                    stroke="#10B981" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ma30" 
                    stroke="#F59E0B" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Current Price</div>
                <div className="text-lg font-bold text-blue-600">0.652</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">24h High</div>
                <div className="text-lg font-bold text-green-600">0.698</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-sm text-gray-600">24h Low</div>
                <div className="text-lg font-bold text-red-600">0.612</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-800">Event Timeline Active</div>
                  <div className="text-yellow-700">Hover over chart points to see correlated real-world events that may have influenced price movements.</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Market Depth Tab */}
          <TabsContent value="depth" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Order Book Depth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[...depthData.buyOrders.slice(-10), ...depthData.sellOrders.slice(0, 10)]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="price" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="stepAfter" 
                        dataKey="cumulative" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Slippage Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trade Size (shares)
                    </label>
                    <Input
                      type="number"
                      value={slippageAmount}
                      onChange={(e) => setSlippageAmount(e.target.value)}
                      placeholder="Enter number of shares"
                      className="w-full"
                    />
                  </div>
                  
                  {slippageResult && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Original Price:</span>
                        <span className="font-medium">{slippageResult.originalPrice.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Final Avg Price:</span>
                        <span className="font-medium">{slippageResult.finalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Slippage:</span>
                        <span className={`font-medium ${parseFloat(slippageResult.slippage) > 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {slippageResult.slippage}%
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium text-gray-800">Total Cost:</span>
                        <span className="font-bold text-blue-600">${slippageResult.totalCost}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Market Liquidity Analysis</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Buy Wall Strength:</span>
                  <span className="font-medium ml-2">Strong</span>
                </div>
                <div>
                  <span className="text-blue-600">Sell Wall Strength:</span>
                  <span className="font-medium ml-2">Moderate</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Holder Analysis Tab */}
          <TabsContent value="holders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Holder Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={holderData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {holderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Whale Activity (7 Days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={whaleActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'netChange' ? `${value > 0 ? '+' : ''}${value.toLocaleString()}` : value,
                          name === 'netChange' ? 'Net Position Change' : 'Active Whales'
                        ]}
                      />
                      <Bar 
                        dataKey="netChange" 
                        fill={(entry) => entry > 0 ? '#10B981' : '#EF4444'}
                        name="netChange"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Top Holders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Rank</th>
                      <th className="text-left p-2">Address</th>
                      <th className="text-right p-2">Shares</th>
                      <th className="text-right p-2">Value ($)</th>
                      <th className="text-right p-2">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topHolders.slice(0, 10).map((holder) => (
                      <tr key={holder.rank} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">#{holder.rank}</td>
                        <td className="p-2 font-mono text-xs">{holder.address}</td>
                        <td className="p-2 text-right">{holder.shares.toLocaleString()}</td>
                        <td className="p-2 text-right">${holder.value.toLocaleString()}</td>
                        <td className={`p-2 text-right font-medium ${holder.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holder.change24h >= 0 ? '+' : ''}{holder.change24h.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Trade History Tab */}
          <TabsContent value="trades" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Live Trade Feed</h3>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
            </div>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b">
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Side</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Quantity</th>
                    <th className="text-right p-2">Total ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeHistory.map((trade) => (
                    <tr key={trade.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-xs text-gray-600">{trade.time}</td>
                      <td className="p-2">
                        <Badge 
                          variant="outline" 
                          className={trade.side === 'Buy' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                        >
                          {trade.side}
                        </Badge>
                      </td>
                      <td className="p-2 text-right font-mono">{trade.price}</td>
                      <td className="p-2 text-right">{trade.quantity.toLocaleString()}</td>
                      <td className="p-2 text-right font-medium">${trade.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Order Flow Summary (Last Hour)</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-bold text-lg">{tradeHistory.filter(t => t.side === 'Buy').length}</div>
                  <div className="text-gray-600">Buy Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-red-600 font-bold text-lg">{tradeHistory.filter(t => t.side === 'Sell').length}</div>
                  <div className="text-gray-600">Sell Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">
                    ${tradeHistory.reduce((sum, t) => sum + t.total, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Volume</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;

