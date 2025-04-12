import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Youtube, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allVideos = [
  {
    topic: "Machine Learning",
    title: "Machine Learning | What Is Machine Learning? | Introduction To Machine Learning | 2024 | Simplilearn",
    creator: "Simplilearn",
    url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
    thumbnail: "https://i.ytimg.com/vi/ukzFI9rgwfU/mqdefault.jpg",
    duration: "15:30"
  },
  {
    topic: "Machine Learning",
    title: "Machine Learning Explained in 100 Seconds",
    creator: "Fireship",
    url: "https://www.youtube.com/watch?v=PeMlggyqz0Y",
    thumbnail: "https://i.ytimg.com/vi/PeMlggyqz0Y/mqdefault.jpg",
    duration: "01:40"
  },
  {
    topic: "Cloud Security",
    title: "Cloud Security Tutorial | Cloud Security Fundamentals | Edureka",
    creator: "Edureka",
    url: "https://www.youtube.com/watch?v=0lw4KU5wHsk",
    thumbnail: "https://i.ytimg.com/vi/0lw4KU5wHsk/mqdefault.jpg",
    duration: "45:00"
  },
  {
    topic: "Prompt Engineering",
    title: "Prompt Engineering Tutorial – Master ChatGPT and LLM Responses",
    creator: "FreeCodeCamp",
    url: "https://www.youtube.com/watch?v=_ZvnD73m40o",
    thumbnail: "https://i.ytimg.com/vi/_ZvnD73m40o/mqdefault.jpg",
    duration: "30:00"
  },
  
];

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

  const roadmaps = [
    {
      id: 1,
      title: 'JavaScript Developer Roadmap 2023',
      description: 'A step-by-step guide to becoming a JavaScript developer.',
      steps: 12,
      url: '#',
    },
  ];

  // ✅ Filter videos by selected topic
  const videos = allVideos.filter(video => video.topic === topic);

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

        {/* Articles */}
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

        {/* Videos */}
        <TabsContent value="videos" className="space-y-4">
          {videos.map((video, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>By {video.creator} • {video.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-4 w-full max-w-sm" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">Watch Video</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
          {videos.length === 0 && (
            <p className="text-muted-foreground">No videos available for this topic.</p>
          )}
        </TabsContent>

        {/* Roadmaps */}
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
