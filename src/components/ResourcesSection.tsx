'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Youtube, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

type Video = {
  topic: string;
  title: string;
  channel: string;
  videoId: string;
  url: string;
  thumbnail: string;
};

type Documentation = {
  topic: string;
  github: {
    repo: string;
    url: string;
  } | null;
  devdocs: string;
  readme: string | null;
  error?: string;
};

type AIOutput = {
  all_topics: string[];
  covered_topics: string[];
  gap_topics: string[];
  study_roadmap: string[];
};

export const ResourcesSection = ({
  topic,
  aiOutput,
}: {
  topic: string;
  aiOutput: AIOutput;
}) => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllResources = async () => {
      setLoading(true);
      try {
        const topics = aiOutput.gap_topics || [];
        console.log(aiOutput.gap_topics)
        const [videosRes, docsRes] = await Promise.all([
          axios.post('https://backend-fawn-nine-74.vercel.app/getvideos', { topics, max: 2 }),
          axios.post('https://backend-fawn-nine-74.vercel.app/fetch-docs', { topics }),
        ]); 
        console.log('Videos Response:', videosRes.data);
        console.log('Docs Response:', docsRes.data);

        setVideos(videosRes.data || []);
        setDocs(docsRes.data.documentation || []);
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResources();
  }, [aiOutput]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Learning Resources</h2>
        <p className="text-muted-foreground">
          Tailored content based on your current knowledge gaps.
        </p>
      </div>

      <Tabs defaultValue="articles">
        <TabsList className="mb-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Youtube className="h-4 w-4" /> Videos
          </TabsTrigger>
          <TabsTrigger value="roadmaps" className="flex items-center gap-2">
            <Book className="h-4 w-4" /> Roadmaps
          </TabsTrigger>
        </TabsList>

        {/* Articles */}
        <TabsContent value="articles" className="space-y-4">
          {docs.map((doc, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{doc.topic}</CardTitle>
                <CardDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2">
                    {doc.github && (
                      <a
                        href={doc.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sm text-blue-500"
                      >
                        GitHub: {doc.github.repo}
                      </a>
                    )}
                    <a
                      href={doc.devdocs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm text-blue-500"
                    >
                      DevDocs
                    </a>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: doc.readme ? marked(doc.readme) : '<p>No README available.</p>',
                  }}
                />
              </CardContent>
              {doc.github && (
                <CardFooter>
                  <Button variant="outline" asChild>
                    <a href={doc.github.url} target="_blank" rel="noopener noreferrer">
                      Explore on GitHub
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* Videos */}
        <TabsContent value="videos" className="space-y-4">
          {videos.map((video, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>By {video.channel}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-4 w-full max-w-sm" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
          {videos.length === 0 && !loading && (
            <p className="text-muted-foreground">No videos found for the selected topics.</p>
          )}
        </TabsContent>

        {/* Roadmaps */}
        <TabsContent value="roadmaps" className="space-y-4">
          {aiOutput.study_roadmap.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Step {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: marked(step) }} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
