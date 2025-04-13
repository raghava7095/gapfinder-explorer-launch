'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';

type Project = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  skills: string[];
  url: string;
  topic?: string;
  error?: string;
};

type AIOutput = {
  all_topics: string[];
  covered_topics: string[];
  gap_topics: string[];
  study_roadmap: string[];
};

type ProjectsSectionProps = {
  aiOutput?: AIOutput;
  topic?: string;
};

export const ProjectsSection = ({ aiOutput: propAiOutput, topic }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiOutput, setAiOutput] = useState<AIOutput | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('gapfinder_aiOutput');
    const parsed = stored ? JSON.parse(stored) : null;
    setAiOutput(propAiOutput || parsed);
  }, [propAiOutput]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!aiOutput?.gap_topics?.length) return;

      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/generate-projects', {
          topics: aiOutput.gap_topics,
        });

        const results: Project[] = response.data.projects || [];
        setProjects(results.filter((p) => !p.error));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [aiOutput]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Project Ideas{topic ? ` for ${topic}` : ''}
        </h2>
        <p className="text-muted-foreground">
          Practice your skills by building these projects.
        </p>
      </div>

      {loading && <p className="text-muted-foreground">Loading project ideas...</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer hover:ring-2 ring-blue-500 transition"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{project.title}</CardTitle>
                <Badge>{project.difficulty}</Badge>
              </div>
              <CardDescription className="mt-1.5">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                  View Project Details
                {/* <a href={project.url} target="_blank" rel="noopener noreferrer">
                </a> */}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal for Selected Project */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-lg w-full shadow-lg space-y-4 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold">{selectedProject.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            {/* <div className="flex justify-end">
              <Button variant="default" asChild>
                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                  View Full Project
                </a>
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
