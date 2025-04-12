import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const AiResources = ({ topic = 'JavaScript' }) => {
  const resources = [
    {
      id: 1,
      title: 'Understanding Scope in JavaScript',
      content: `Scope in JavaScript refers to the current context of code, which determines the accessibility of variables. There are three types of scope:

1. Global Scope: Variables declared outside of any function are globally scoped and can be accessed from anywhere.

2. Function Scope: Variables declared within a function can only be accessed from within that function.

3. Block Scope: Introduced in ES6, variables declared with let and const are block-scoped, meaning they can only be accessed within the block they're defined in.

Understanding scope is crucial for preventing variable leaks and unexpected behavior in your applications.`,
    },
    {
      id: 2,
      title: 'Asynchronous JavaScript Explained',
      content: `JavaScript is single-threaded, but asynchronous operations allow it to handle tasks without blocking execution. Key concepts include:

1. Callbacks: Functions passed as arguments to be executed after another function completes.

2. Promises: Objects representing the eventual completion or failure of an asynchronous operation, allowing better error handling and chaining.

3. Async/Await: Syntactic sugar on top of promises, making asynchronous code look more like synchronous code.

These patterns are essential for handling operations like API calls, timers, and event handlers efficiently.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">AI-Generated Resources for {topic}</h2>
        <Lightbulb className="h-5 w-5 text-yellow-500" />
      </div>
      
      <p className="text-muted-foreground">
        Custom explanations generated based on your knowledge gaps.
      </p>
      
      <div className="space-y-6">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription>AI-generated explanation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-sm">
                {resource.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};