// analyser.js - Expense Analyser
const fs = require('fs');
const _ = require('lodash');   // installed in Step 1 with: npm install lodash (not used further)

// GIVEN: turns the text of the file into an array of objects
// like { category: 'food', amount: 250 }
const parseExpenses = (text) => {
  return text.trim().split('\n').map((line) => {
    const parts = line.trim().split(',');
    return { category: parts[0], amount: Number(parts[1]) };
  });
};

// ---------- Step 3: read the file synchronously ----------
console.time('sync read');
const text = fs.readFileSync('expenses.txt', 'utf8');
console.timeEnd('sync read');
const expenses = parseExpenses(text);
console.log('First expense:', expenses[0]);

// ---------- Step 4: higher-order functions ----------
const totalSpent  = expenses.reduce((acc, curr) => acc + curr.amount, 0);
const bigExpenses = expenses.filter((e) => e.amount > 500);
const withFee = expenses.map((e) => ({ ...e, amount: e.amount + 50 }));

console.log('Total spent:', totalSpent );
console.log('Big expenses (> Rs 500):', bigExpenses.length, bigExpenses);
console.log('First with fee:', withFee[0].amount, '| original:', expenses[0].amount);

// ---------- Step 5: totals per category ----------
const totalsByCategory = {};
for (const e of expenses) {
  if (totalsByCategory[e.category] === undefined) {
    totalsByCategory[e.category] = 0;
  }
  totalsByCategory[e.category] += e.amount;
}
console.log('Totals by category:', totalsByCategory);

// ---------- Step 6: switch and ternary ----------
function budgetNote(category) {
  switch (category) {
    case 'food':
      return 'Daily need';
    case 'travel':
      return 'Commute';
    case 'books':
      return 'Study';
    default:
      return 'Other';
  }
}

const categories = ['food', 'travel', 'books', 'entertainment'];
categories.forEach((category) => {
  const total = totalsByCategory[category];
  const status = total > 1500 ? 'OVER 1500' : 'OK';
  console.log(`${category} (${budgetNote(category)}): Rs ${total} - ${status}`);
});

// ---------- Step 7: closure ----------
function createBudgetTracker(limit) {
  let spent = 0;
  return function spend(amount) {
    spent += amount;
    return spent <= limit
      ? `Remaining: ${limit - spent}`
      : `Over budget by ${spent - limit}`;
  };
}
const tracker = createBudgetTracker(1000);
console.log(tracker(300));
console.log(tracker(500));
console.log(tracker(400));

// ---------- Step 8: read the file asynchronously ----------
console.log('Async read started');
fs.readFile('expenses.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Async read finished');
});
for (let i = 0; i < 1000000; i++) {
  // just counting
}
console.log('Loop finished');