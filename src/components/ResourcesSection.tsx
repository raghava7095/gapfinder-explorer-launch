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

const subtopicDocumentation = [
  {
    subtopic: "Supervised Learning",
    github: {
      repo: "scikit-learn/scikit-learn",
      url: "https://github.com/scikit-learn/scikit-learn"
    },
    devdocs: "https://devdocs.io/#q=supervised learning",
    readme: "Scikit-learn is a machine learning library in Python that supports various supervised learning algorithms like decision trees, support vector machines, and linear models..."
  },
  {
    subtopic: "Unsupervised Learning",
    github: {
      repo: "scikit-learn/scikit-learn",
      url: "https://github.com/scikit-learn/scikit-learn"
    },
    devdocs: "https://devdocs.io/#q=unsupervised learning",
    readme: "This library includes unsupervised learning methods such as clustering (k-means, DBSCAN) and dimensionality reduction (PCA, t-SNE)..."
  },
  {
    subtopic: "Regression Analysis",
    github: {
      repo: "jbrownlee/Datasets",
      url: "https://github.com/jbrownlee/Datasets"
    },
    devdocs: "https://devdocs.io/#q=regression analysis",
    readme: "A collection of datasets used in regression modeling tutorials, helpful for building, testing, and evaluating regression models..."
  },
  {
    subtopic: "Classification",
    github: {
      repo: "tensorflow/models",
      url: "https://github.com/tensorflow/models"
    },
    devdocs: "https://devdocs.io/#q=classification",
    readme: "TensorFlow Models provides sample models for image and text classification tasks using neural networks..."
  },
  {
    subtopic: "Deep Learning",
    github: {
      repo: "keras-team/keras",
      url: "https://github.com/keras-team/keras"
    },
    devdocs: "https://devdocs.io/#q=deep learning",
    readme: "Keras is a high-level neural networks API that supports fast experimentation with deep learning models in TensorFlow..."
  },
  {
    subtopic: "Model Evaluation",
    github: {
      repo: "scikit-learn/scikit-learn",
      url: "https://github.com/scikit-learn/scikit-learn"
    },
    devdocs: "https://devdocs.io/#q=model evaluation",
    readme: "Scikit-learn includes tools for evaluating model performance such as cross-validation, precision/recall scoring, ROC curves, and confusion matrices..."
  }
];

const roadmaps = [
  {
    id: 1,
    title: 'Machine Learning Roadmap 2024',
    description: 'A step-by-step guide to becoming a Machine Learning Engineer.',
    steps: 18,
    url: '#',
  },
];

export const ResourcesSection = ({ topic = 'Machine Learning' }) => {
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

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          {subtopicDocumentation.map((doc, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{doc.subtopic}</CardTitle>
                <CardDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2">
                    <a href={doc.github.url} target="_blank" rel="noopener noreferrer" className="underline text-sm text-blue-500">
                      GitHub: {doc.github.repo}
                    </a>
                    <a href={doc.devdocs} target="_blank" rel="noopener noreferrer" className="underline text-sm text-blue-500">
                      DevDocs
                    </a>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{doc.readme}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={doc.github.url} target="_blank" rel="noopener noreferrer">Explore on GitHub</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        {/* Videos Tab */}
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

        {/* Roadmaps Tab */}
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
