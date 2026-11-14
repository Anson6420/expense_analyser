1.What did you predict for Warmup.js, and what did it print?

I guessed it would print undefined, 99 1, 3 and true false, and it did.

The first line prints undefined because JavaScript moves var a to the top before running the code. So a exists, but it has no value yet. The = 5 only runs later.

In Part B, console.log(b) gives ReferenceError: Cannot access 'b' before initialization. let is also moved up, but you can’t use it until the line where it’s declared has run. If you try, you get an error instead of undefined.


2.Why did Loop finished print before Async read finished? Who did the reading while your loop was running?

fs.readFile does not block. Node hands the file read to the operating system / libuv thread pool and immediately moves on to the next line, so the 1,000,000-iteration loop and Loop finished run on the main thread first. When the read completes, the callback is placed in the event queue, and it only runs once the main thread is free. So the reading was done by libuv's background thread pool, not by my JavaScript code.


3.How does tracker remember spent after createBudgetTracker has returned?

The function returned by createBudgetTracker is a closure: it keeps a reference to the scope it was created in, including limit and spent. Even after createBudgetTracker finishes, that scope stays alive because the returned function still uses it. Each call to tracker(...) updates the same spent variable, and each tracker created has its own private spent.

4.What does the ^ in front of the lodash version in package.json mean, and why is package-lock.json created?

The ^ means a compatible-version range: npm may install any newer version with the same major number (for ^4.18.1, anything from 4.18.1 up to but not including 5.0.0), so minor and patch updates are allowed but breaking major updates are not. package-lock.json is created to record the exact version of lodash (and any dependencies) that was actually installed, so that everyone who runs npm install gets the same versions even though package.json allows a range.