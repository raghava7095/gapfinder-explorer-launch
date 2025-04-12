import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const GapAnalysis = ({ topic = 'JavaScript', knowledge = '' }) => {
  // In a real app, this would be generated based on the user's input
  // and a backend analysis
  const gaps = [
    {
      id: 1,
      area: 'Advanced Concepts',
      description: 'Closures, Promises, and Async/Await',
      priority: 'High',
    },
    {
      id: 2,
      area: 'Design Patterns',
      description: 'Common JavaScript patterns like Module, Observer, and Singleton',
      priority: 'Medium',
    },
    {
      id: 3,
      area: 'Performance Optimization',
      description: 'Memory management and performance best practices',
      priority: 'Medium',
    },
    {
      id: 4,
      area: 'Testing',
      description: 'Unit testing with frameworks like Jest',
      priority: 'High',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Knowledge Gap Analysis for {topic}</h2>
        <p className="text-muted-foreground">
          Based on your current knowledge, here are the areas you should focus on next.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {gaps.map((gap) => (
          <Card key={gap.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{gap.area}</CardTitle>
              <CardDescription>Priority: {gap.priority}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{gap.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};