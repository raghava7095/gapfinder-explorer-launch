'use client';

import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

type Question = {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

export const InterviewQuestions = ({ topic = 'JavaScript' }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generate-interview-questions', {
          topic,
        });

        setQuestions(response.data.questions);
      } catch (err: any) {
        console.error('Error fetching AI questions:', err);
        setError('Failed to load AI interview questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interview Questions for {topic}</h2>
        <p className="text-muted-foreground">AI-generated questions to test your knowledge.</p>
      </div>

      {loading && <p className="text-muted-foreground">Loading questions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Card>
          <CardHeader>
            <CardTitle>Practice Questions</CardTitle>
            <CardDescription>
              Click a question to reveal the answer. Try to answer it yourself first!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((q) => (
                <AccordionItem key={q.id} value={q.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span>{q.question}</span>
                      <Badge className="ml-4">{q.difficulty}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="whitespace-pre-line bg-secondary p-4 rounded-md mt-2">
                      {q.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
