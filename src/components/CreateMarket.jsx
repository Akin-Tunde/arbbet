import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const CreateMarket = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    deadline: null,
    category: '',
    tags: '',
    initialLiquidity: 100
  });

  const totalSteps = 5;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Market created:', formData);
    // Here you would typically send the data to your backend
    alert('Market created successfully!');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">Create.</h2>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Predict.</h2>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">Earn.</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  🔮
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">MarketVision</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-white text-lg">What do you want to create a prediction market about?</Label>
              <Input
                placeholder="e.g. Will Ethereum reach $10K by 2026?"
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                className="bg-white/10 border-teal-400/30 text-white placeholder-gray-300 rounded-xl focus:border-teal-400 focus:ring-teal-400"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-white text-lg">Select Market Deadline (Your local time)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/10 border-teal-400/30 text-white hover:bg-white/20 rounded-xl"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? format(formData.deadline, "PPP") : "Select a deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/10 border-teal-400/30 backdrop-blur-lg">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={(date) => handleInputChange('deadline', date)}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-white text-lg">Market Description</Label>
              <Textarea
                placeholder="Provide additional context and details about your prediction market..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white/10 border-teal-400/30 text-white placeholder-gray-300 min-h-[120px] rounded-xl focus:border-teal-400 focus:ring-teal-400"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-white text-lg">Category & Tags</Label>
              <Input
                placeholder="e.g. Cryptocurrency, Technology, Finance"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="bg-white/10 border-teal-400/30 text-white placeholder-gray-300 rounded-xl focus:border-teal-400 focus:ring-teal-400"
              />
              <Label className="text-white text-sm">Tags (comma separated)</Label>
              <Input
                placeholder="e.g. ethereum, crypto, price prediction"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="bg-white/10 border-teal-400/30 text-white placeholder-gray-300 rounded-xl focus:border-teal-400 focus:ring-teal-400"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <Label className="text-white text-lg">Initial Liquidity</Label>
              <Input
                type="number"
                placeholder="100"
                value={formData.initialLiquidity}
                onChange={(e) => handleInputChange('initialLiquidity', parseInt(e.target.value))}
                className="bg-white/10 border-teal-400/30 text-white placeholder-gray-300 rounded-xl focus:border-teal-400 focus:ring-teal-400"
              />
              <p className="text-gray-300 text-sm">
                This determines the initial trading pool for your market
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-teal-400/20">
              <h3 className="text-white font-semibold mb-4">Market Summary</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-200"><span className="text-teal-300 font-medium">Question:</span> {formData.question}</p>
                <p className="text-gray-200"><span className="text-teal-300 font-medium">Deadline:</span> {formData.deadline ? format(formData.deadline, "PPP") : 'Not set'}</p>
                <p className="text-gray-200"><span className="text-teal-300 font-medium">Category:</span> {formData.category || 'Not set'}</p>
                <p className="text-gray-200"><span className="text-teal-300 font-medium">Initial Liquidity:</span> {formData.initialLiquidity} tokens</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-teal-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white/10 border-teal-500/30 backdrop-blur-lg shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">
              Step {currentStep} of {totalSteps}
            </CardTitle>
            <div className="w-full bg-gray-700/50 rounded-full h-3 mt-4">
              <div 
                className="bg-gradient-to-r from-teal-400 to-emerald-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="bg-white/10 border-gray-400/30 text-white hover:bg-white/20 disabled:opacity-50 rounded-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg rounded-xl"
                >
                  Create Market
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg rounded-xl"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMarket;

