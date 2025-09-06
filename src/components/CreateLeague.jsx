import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ArrowLeft, Plus, X, Info } from 'lucide-react';

const CreateLeague = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false,
    entryFee: '0',
    currency: 'PROPHET',
    duration: '',
    startDate: '',
    maxParticipants: '100',
    marketSelection: 'category',
    selectedMarkets: [],
    prizeStructure: 'standard'
  });

  const [selectedMarkets, setSelectedMarkets] = useState([]);

  // Mock available markets
  const availableMarkets = [
    { id: 1, title: 'BTC > $100k by EOY', category: 'Crypto' },
    { id: 2, title: 'ETH > $5k by Q1 2025', category: 'Crypto' },
    { id: 3, title: 'SOL > $200 by EOY', category: 'Crypto' },
    { id: 4, title: 'Monaco GP Winner', category: 'Sports' },
    { id: 5, title: 'British GP Winner', category: 'Sports' },
    { id: 6, title: 'Presidential Election Winner', category: 'Politics' },
    { id: 7, title: 'Senate Control 2024', category: 'Politics' },
    { id: 8, title: 'AAPL Q4 Earnings Beat', category: 'Finance' },
    { id: 9, title: 'GOOGL Q4 Earnings Beat', category: 'Finance' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMarketToggle = (market) => {
    setSelectedMarkets(prev => {
      const exists = prev.find(m => m.id === market.id);
      if (exists) {
        return prev.filter(m => m.id !== market.id);
      } else {
        return [...prev, market];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    console.log('Creating league with data:', { ...formData, selectedMarkets });
    // For now, just go back to the leagues page
    onBack();
  };

  const prizeStructures = {
    standard: { first: 50, second: 30, third: 20 },
    winner_takes_all: { first: 100, second: 0, third: 0 },
    top_heavy: { first: 70, second: 20, third: 10 },
    balanced: { first: 40, second: 30, third: 20, fourth: 10 }
  };

  return (
    <div className="min-h-screen predictbase-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leagues
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Create New League</h1>
            <p className="text-gray-300">Set up a prediction league for you and your community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                  <CardDescription className="text-gray-300">
                    Give your league a name and description
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">League Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Crypto Majors Q4 Showdown"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe what your league is about..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-white">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crypto">Crypto</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="politics">Politics</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="private"
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => handleInputChange('isPrivate', checked)}
                    />
                    <Label htmlFor="private" className="text-white">
                      Make this league private (invite-only)
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* League Settings */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">League Settings</CardTitle>
                  <CardDescription className="text-gray-300">
                    Configure entry fees, duration, and participant limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entryFee" className="text-white">Entry Fee</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="entryFee"
                          type="number"
                          value={formData.entryFee}
                          onChange={(e) => handleInputChange('entryFee', e.target.value)}
                          placeholder="0"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          min="0"
                        />
                        <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                          <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PROPHET">$PROPHET</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="maxParticipants" className="text-white">Max Participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                        placeholder="100"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        min="2"
                        max="1000"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration" className="text-white">Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1_week">1 Week</SelectItem>
                          <SelectItem value="2_weeks">2 Weeks</SelectItem>
                          <SelectItem value="1_month">1 Month</SelectItem>
                          <SelectItem value="3_months">3 Months</SelectItem>
                          <SelectItem value="6_months">6 Months</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="startDate" className="text-white">Start Date</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Selection */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Market Selection</CardTitle>
                  <CardDescription className="text-gray-300">
                    Choose which markets will be included in your league
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={formData.marketSelection} 
                    onValueChange={(value) => handleInputChange('marketSelection', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="category" id="category" />
                      <Label htmlFor="category" className="text-white">
                        All markets in selected category
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="text-white">
                        Hand-pick specific markets
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.marketSelection === 'custom' && (
                    <div className="space-y-3">
                      <Label className="text-white">Select Markets:</Label>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {availableMarkets.map(market => (
                          <div key={market.id} className="flex items-center space-x-2 p-2 bg-white/5 rounded">
                            <Checkbox
                              checked={selectedMarkets.some(m => m.id === market.id)}
                              onCheckedChange={() => handleMarketToggle(market)}
                            />
                            <div className="flex-1">
                              <span className="text-white text-sm">{market.title}</span>
                              <span className="text-gray-400 text-xs ml-2">({market.category})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-300">
                        Selected: {selectedMarkets.length} markets
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Prize Structure */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Prize Structure</CardTitle>
                  <CardDescription className="text-gray-300">
                    How should the prize pool be distributed?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.prizeStructure} 
                    onValueChange={(value) => handleInputChange('prizeStructure', value)}
                    className="space-y-3"
                  >
                    {Object.entries(prizeStructures).map(([key, structure]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="text-white flex-1">
                          <div className="flex justify-between items-center">
                            <span className="capitalize">{key.replace('_', ' ')}</span>
                            <span className="text-sm text-gray-300">
                              1st: {structure.first}%
                              {structure.second > 0 && `, 2nd: ${structure.second}%`}
                              {structure.third > 0 && `, 3rd: ${structure.third}%`}
                              {structure.fourth && `, 4th: ${structure.fourth}%`}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 border-white/20 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    League Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 text-sm">Name:</Label>
                    <p className="text-white font-medium">{formData.name || 'Untitled League'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300 text-sm">Category:</Label>
                    <p className="text-white">{formData.category || 'Not selected'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300 text-sm">Entry Fee:</Label>
                    <p className="text-white">
                      {formData.entryFee === '0' ? 'Free' : `${formData.entryFee} ${formData.currency}`}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300 text-sm">Max Participants:</Label>
                    <p className="text-white">{formData.maxParticipants}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300 text-sm">Duration:</Label>
                    <p className="text-white">{formData.duration.replace('_', ' ') || 'Not selected'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300 text-sm">Privacy:</Label>
                    <p className="text-white">{formData.isPrivate ? 'Private' : 'Public'}</p>
                  </div>
                  
                  {formData.marketSelection === 'custom' && (
                    <div>
                      <Label className="text-gray-300 text-sm">Markets:</Label>
                      <p className="text-white">{selectedMarkets.length} selected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
            >
              Create League
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeague;

