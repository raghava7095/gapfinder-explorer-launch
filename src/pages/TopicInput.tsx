
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Brain, Search } from "lucide-react";
import { motion } from "framer-motion";

const TopicInput = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [knowledgeInput, setKnowledgeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeClick = () => {
    if (!topic.trim() || !knowledgeInput.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you'd pass this data to the backend
      navigate("/analysis-results", { 
        state: { 
          topic,
          knowledgeInput
        } 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-gapfinder-600" />
          <h1 className="text-xl font-bold text-gapfinder-800">GapFinder</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Tell us what you want to learn</CardTitle>
              <CardDescription>
                Enter a topic you're interested in and what you already know about it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">
                  Topic you want to explore
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="topic"
                    className="pl-10"
                    placeholder="e.g. Machine Learning, Guitar, Spanish Language..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="knowledge" className="text-sm font-medium">
                  What do you already know about this topic?
                </label>
                <Textarea
                  id="knowledge"
                  placeholder="List the concepts, skills, or information you're already familiar with..."
                  className="min-h-[150px] resize-none"
                  value={knowledgeInput}
                  onChange={(e) => setKnowledgeInput(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAnalyzeClick}
                disabled={!topic.trim() || !knowledgeInput.trim() || isLoading}
                className="w-full bg-gapfinder-600 hover:bg-gapfinder-700"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Knowledge Gaps <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <footer className="w-full py-6 px-4 border-t text-center text-muted-foreground">
        <p className="text-sm">© 2025 GapFinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TopicInput;
