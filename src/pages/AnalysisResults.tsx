
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, LightbulbIcon } from "lucide-react";
import { motion } from "framer-motion";

const AnalysisResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, knowledgeInput } = location.state || {};

  if (!topic || !knowledgeInput) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Missing Information</CardTitle>
            <CardDescription>
              No topic or knowledge input was provided. Please return to the previous page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/topic-input")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Input
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // This would be replaced with real data from backend
  const placeholderGaps = [
    "Advanced concepts in differentiating between related topics",
    "Structured methodology for comprehensive learning",
    "Practical application techniques in real-world scenarios"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-gapfinder-600" />
          <h1 className="text-xl font-bold text-gapfinder-800">GapFinder</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/topic-input")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to input
        </Button>
      </header>

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Knowledge Gap Analysis</h1>
            <p className="text-muted-foreground">
              Here's what we found about your knowledge of <span className="font-medium text-gapfinder-700">{topic}</span>
            </p>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-gapfinder-500" />
                    Identified Knowledge Gaps
                  </CardTitle>
                  <CardDescription>
                    Based on what you already know, we recommend focusing on these areas:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {placeholderGaps.map((gap, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-md"
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gapfinder-100 text-gapfinder-600 flex items-center justify-center mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{gap}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 text-center p-4 border border-dashed rounded-lg border-muted-foreground/30">
                    <p className="text-muted-foreground">
                      This is a placeholder for backend integration. In a complete implementation, 
                      this would connect to an API that analyzes your knowledge and provides personalized gap recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 border-t text-center text-muted-foreground">
        <p className="text-sm">© 2025 GapFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AnalysisResults;
