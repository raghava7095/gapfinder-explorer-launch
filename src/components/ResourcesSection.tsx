import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Youtube, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ResourcesSection = ({ topic = 'JavaScript' }) => {
  const articles = [
    {
      id: 1,
      title: 'Understanding JavaScript Closures',
      source: 'MDN Web Docs',
      url: '#',
      description: 'A comprehensive guide to JavaScript closures and their practical applications.',
    },
    {
      id: 2,
      title: 'Promises in JavaScript: An Introduction',
      source: 'JavaScript.info',
      url: '#',
      description: 'Learn how to use promises for asynchronous operations in JavaScript.',
    },
  ];
  
  const videos = [
    {
      id: 1,
      title: 'JavaScript Promises In 10 Minutes',
      creator: 'Web Dev Simplified',
      url: '#',
      duration: '10:30',
    },
    {
      id: 2,
      title: 'Async/Await in JavaScript - Full Tutorial',
      creator: 'freeCodeCamp',
      url: '#',
      duration: '26:55',
    },
  ];
  
  const roadmaps = [
    {
      id: 1,
      title: 'JavaScript Developer Roadmap 2023',
      description: 'A step-by-step guide to becoming a JavaScript developer.',
      steps: 12,
      url: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Learning Resources for {topic}</h2>
        <p className="text-muted-foreground">
          Recommended resources to help you fill your knowledge gaps.
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
        
        <TabsContent value="articles" className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>Source: {article.source}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{article.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read Article</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>By {video.creator} • {video.duration}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Video</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="roadmaps" className="space-y-4">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.id}>
              <CardHeader>
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.steps} steps to master {topic}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{roadmap.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={roadmap.url} target="_blank" rel="noopener noreferrer">View Roadmap</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};