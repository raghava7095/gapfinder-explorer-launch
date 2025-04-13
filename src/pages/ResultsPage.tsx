import { useState, useEffect } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { GapAnalysis } from '@/components/GapAnalysis';
import { ResourcesSection } from '@/components/ResourcesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AiResources } from '@/components/AiResources';
import { InterviewQuestions } from '@/components/InterviewQuestions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [aiOutput, setAiOutput] = useState<any>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    const state = location.state as { topic?: string; knowledgeInput?: string; aiOutput?: any } | null;

    const storedTopic = localStorage.getItem("gapfinder_topic");
    const storedKnowledge = localStorage.getItem("gapfinder_knowledgeInput");
    const storedOutput = localStorage.getItem("gapfinder_aiOutput");

    // Prefer state from navigation; fallback to localStorage if reloaded
    if (state?.topic) {
      setTopic(state.topic);
      localStorage.setItem("gapfinder_topic", state.topic);
    } else if (storedTopic) {
      setTopic(storedTopic);
      setShowPlaceholder(true); // fallback mode
    }

    if (state?.knowledgeInput) {
      setKnowledge(state.knowledgeInput);
      localStorage.setItem("gapfinder_knowledgeInput", state.knowledgeInput);
    } else if (storedKnowledge) {
      setKnowledge(storedKnowledge);
    }

    if (state?.aiOutput) {
      setAiOutput(state.aiOutput);
      localStorage.setItem("gapfinder_aiOutput", JSON.stringify(state.aiOutput));
    } else if (storedOutput) {
      try {
        setAiOutput(JSON.parse(storedOutput));
        setShowPlaceholder(true); // fallback mode
      } catch (err) {
        console.error("❌ Failed to parse stored AI output", err);
      }
    }
  }, [location.state]);

  const handleGoBack = () => {
    navigate('/topic-input');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* {showPlaceholder && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              You're viewing saved data from your last session. To start fresh, go back to the homepage.
            </AlertDescription>
          </Alert>
        )} */}

        <Routes>
          <Route path="/" element={<GapAnalysis topic={topic} knowledge={knowledge} aiOutput={aiOutput} />} />
          <Route path="/resources" element={<ResourcesSection topic={topic} aiOutput={aiOutput} />} />
          <Route path="/projects" element={<ProjectsSection topic={topic} />} />
          <Route path="/ai-resources" element={<AiResources topic={topic} />} />
          <Route path="/interview-questions" element={<InterviewQuestions topic={topic} />} />
          <Route path="*" element={<Navigate to="/results" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ResultsPage;
