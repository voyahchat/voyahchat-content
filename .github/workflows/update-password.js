#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Determine if scheduled run
const isScheduled = process.env.GITHUB_EVENT_NAME === 'schedule' || process.argv.includes('--scheduled');

// Get Beijing date (UTC+8)
const now = new Date();
if (isScheduled) {
  now.setDate(now.getDate() + 1);
}

const beijingOffset = 8 * 60;
const utc = now.getTime() + now.getTimezoneOffset() * 60000;
const beijing = new Date(utc + beijingOffset * 60000);

const year = beijing.getFullYear();
const month = String(beijing.getMonth() + 1).padStart(2, '0');
const day = String(beijing.getDate()).padStart(2, '0');
const mmdd = month + day;

// Calculate password: sum each column
const y = String(year);
const password = [
  Number(y[0]) + Number(month[0]),
  Number(y[1]) + Number(month[1]),
  Number(y[2]) + Number(day[0]),
  Number(y[3]) + Number(day[1])
].join('');

console.log(`Date: ${year}-${month}-${day}`);
console.log(`MMDD: ${mmdd}`);
console.log(`Password: ${password}`);

// Find password.md relative to repo root
const repoRoot = process.env.GITHUB_WORKSPACE || path.join(__dirname, '../..');
const file = path.join(repoRoot, 'common/password.md');

let content = fs.readFileSync(file, 'utf8');

// Replace year, mmdd, and password in the code block
// Use specific spacing for alignment
content = content.replace(/^(\d+)(\s+)(.\s+год)/m, `${year}  $3`);
content = content.replace(/^(\d+)(\s+)(.\s+месяц)/m, `${mmdd}  $3`);
content = content.replace(/^(\d+)(\s+)(.\s+динамический)/m, `${password}${password.length === 4 ? '  ' : ' '}$3`);

fs.writeFileSync(file, content);
console.log('File updated:', file);

