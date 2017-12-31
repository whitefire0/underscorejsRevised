/**
 * How to read source code
Why it’s important

Most of your time will be spent reading, not writing.
Simulates working at a company or open source project.
It's the fastest way to learn and improve.
Learn how to ignore large parts of a codebase and get a piece-by-piece understanding.
Before you start

Read the docs (if they exist).
Run the code.
Play with the code to see how it behaves.
Think about how the code might be implemented.
Get the code into an editor so that you can modify it.
 * The process

Look at the file structure.
Get a sense for the vocabulary.
Keep a note of unfamiliar concepts that you'll need to research later.
Do a quick read-through without diving into concepts from #3.
Test one feature with the debugger.
Document and add comments to confusing areas.
Research items in #3 only if required.
Repeat.

Next level
Replicate parts of the app by hand (in the console). Make small changes and see what happens. Add a new feature. */


/**Look for functions with the least dependencies, the least helper functions, and the least things that you don't know. You are looking for relative complexity, as the first time you run through it you might not understand any of it.
 * When you see a function that is dependent on another functions, its probably because it uses this helper function in many over cases. Abstract it to that case alone - a helper function that has 10 different scenarios has 9 scenarios that are essentially dead at this point. Trust that you don't know them and you will encounter them sequentially through actual usage. If you don't use this process reading this level of approach is literally impossible.
 */


/**Unfamiliar Concepts
 * 1) functions as return objects
 * 2) void (null?)
 */
