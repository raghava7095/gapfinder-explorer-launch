import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProjectsSection = ({ topic = 'JavaScript' }) => {
  const projects = [
    {
      id: 1,
      title: 'Build a Todo List App',
      description: 'Create a simple todo list application using vanilla JavaScript.',
      difficulty: 'Beginner',
      skills: ['DOM Manipulation', 'Event Handling', 'Local Storage'],
      url: '#',
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Build a weather dashboard that fetches data from a weather API.',
      difficulty: 'Intermediate',
      skills: ['API Requests', 'Async/Await', 'Data Visualization'],
      url: '#',
    },
    {
      id: 3,
      title: 'Full-Stack Note Taking App',
      description: 'Develop a complete note-taking application with user authentication.',
      difficulty: 'Advanced',
      skills: ['Node.js', 'Express', 'MongoDB', 'Authentication'],
      url: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Ideas for {topic}</h2>
        <p className="text-muted-foreground">
          Practice your skills by building these projects.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
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
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  View Project Details
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};