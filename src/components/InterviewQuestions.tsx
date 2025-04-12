import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const InterviewQuestions = ({ topic = 'JavaScript' }) => {
  const questions = [
    {
      id: 'q1',
      question: 'What is the difference between let, const, and var?',
      answer: `let, const, and var are all used for variable declaration in JavaScript, but they have different scoping rules and behaviors:

- var: Function-scoped, can be redeclared and updated, hoisted to the top of its scope.
- let: Block-scoped, can be updated but not redeclared within the same scope, not hoisted.
- const: Block-scoped, cannot be updated or redeclared, must be initialized at declaration, not hoisted.`,
      difficulty: 'Beginner',
    },
    {
      id: 'q2',
      question: 'Explain closures in JavaScript.',
      answer: `A closure is a function that has access to its own scope, the scope of the outer function, and global scope. It remembers the environment in which it was created, even after the outer function has returned.

Closures are useful for data privacy, creating function factories, and implementing the module pattern.

Example:
\\\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  }
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\\\`

In this example, the inner function maintains access to the count variable even after createCounter has finished executing.`,
      difficulty: 'Intermediate',
    },
    {
      id: 'q3',
      question: 'How does prototypal inheritance work in JavaScript?',
      answer: `In JavaScript, objects inherit properties and methods from a prototype. Every object has an internal link to another object called its prototype, which has its own prototype, forming a chain until reaching an object with null as its prototype.

When accessing a property of an object, JavaScript looks for the property in the object itself. If it doesn't find it, it looks in the object's prototype, and so on up the prototype chain.

Constructor functions create objects with their prototype set to the constructor's prototype property. The new keyword creates a new object, sets the prototype, and executes the constructor function with 'this' bound to the new object.

ES6 introduced class syntax as syntactic sugar over the prototypal inheritance model, making it easier to work with.`,
      difficulty: 'Advanced',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interview Questions for {topic}</h2>
        <p className="text-muted-foreground">
          Common interview questions to test your knowledge.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>
            Click on a question to reveal the answer. Try to answer each question before revealing the solution.
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
    </div>
  );
};