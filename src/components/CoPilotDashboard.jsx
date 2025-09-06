import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, BarChart3, MessageSquare } from 'lucide-react';

const CoPilotDashboard = ({ market }) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Mock data for the dashboard
  const executiveSummary = {
    briefing: "Current market sentiment is leaning positive due to the recent launch of the 'Odyssey' campaign. However, network congestion remains a key risk factor.",
    keyDrivers: [
      { text: "New 'Odyssey' Campaign Launch", trend: "up", impact: "high" },
      { text: "Major dApp Integration Announced", trend: "up", impact: "medium" },
      { text: "Concerns over high gas fees during peak times", trend: "down", impact: "medium" }
    ],
    impliedProbability: 68
  };

  const socialSentiment = {
    score: 72,
    trending: ["arbitrum", "odyssey", "layer2", "ethereum", "scaling"],
    recentPosts: [
      { author: "@crypto_analyst", content: "Arbitrum's new campaign is driving massive adoption", engagement: "2.1k" },
      { author: "@defi_researcher", content: "Transaction costs still a concern for retail users", engagement: "856" },
      { author: "@blockchain_news", content: "Major protocols announcing Arbitrum integration", engagement: "1.3k" }
    ]
  };

  const riskAnalysis = {
    bullCase: [
      "Strong developer ecosystem growth",
      "Increasing institutional adoption",
      "Technical improvements reducing fees",
      "Major partnerships announced"
    ],
    bearCase: [
      "Network congestion during peak times",
      "Competition from other L2 solutions",
      "Regulatory uncertainty",
      "Market volatility affecting user confidence"
    ]
  };

  const getSentimentColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getSentimentLabel = (score) => {
    if (score >= 70) return "Bullish";
    if (score >= 40) return "Neutral";
    return "Bearish";
  };

  return (
    <Card className="w-full mt-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Activity className="h-5 w-5 text-blue-600" />
          Co-Pilot Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="summary" className="text-sm font-medium">
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="text-sm font-medium">
              Social Sentiment
            </TabsTrigger>
            <TabsTrigger value="data" className="text-sm font-medium">
              Historical Data
            </TabsTrigger>
            <TabsTrigger value="risks" className="text-sm font-medium">
              Risks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-6">
            <div className="space-y-6">
              {/* AI Briefing */}
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 leading-relaxed">
                  {executiveSummary.briefing}
                </p>
              </div>

              {/* Key Drivers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Drivers</h3>
                <div className="space-y-3">
                  {executiveSummary.keyDrivers.map((driver, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {driver.trend === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 flex-1">{driver.text}</span>
                      <Badge variant={driver.impact === 'high' ? 'destructive' : 'secondary'}>
                        {driver.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implied Probability */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Implied Probability</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {executiveSummary.impliedProbability}%
                </div>
                <Progress value={executiveSummary.impliedProbability} className="w-full max-w-xs mx-auto" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="mt-6">
            <div className="space-y-6">
              {/* Sentiment Score */}
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Sentiment Score</h3>
                  <div className={`text-4xl font-bold mb-2 ${getSentimentColor(socialSentiment.score)}`}>
                    {socialSentiment.score}/100
                  </div>
                  <div className={`text-lg font-medium ${getSentimentColor(socialSentiment.score)}`}>
                    {getSentimentLabel(socialSentiment.score)}
                  </div>
                  <Progress value={socialSentiment.score} className="w-full mt-3" />
                </div>
              </div>

              {/* Trending Keywords */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Trending Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {socialSentiment.trending.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      #{keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Posts</h3>
                <div className="space-y-3">
                  {socialSentiment.recentPosts.map((post, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-800">{post.author}</span>
                            <span className="text-sm text-gray-500">{post.engagement} engagements</span>
                          </div>
                          <p className="text-gray-700">{post.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <div className="space-y-6">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Historical Data & Precedent</h3>
                <p className="text-gray-600">
                  Interactive charts and historical performance data would be displayed here.
                  This includes price movements, on-chain metrics, and key events timeline.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bull Case */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-700">Bull Case</h3>
                </div>
                <div className="space-y-3">
                  {riskAnalysis.bullCase.map((point, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bear Case */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-700">Bear Case</h3>
                </div>
                <div className="space-y-3">
                  {riskAnalysis.bearCase.map((point, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CoPilotDashboard;

