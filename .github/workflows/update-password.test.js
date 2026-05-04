#!/usr/bin/env node
/**
 * Tests for update-password.js
 * Run with: node .github/workflows/update-password.test.js
 */

const fs = require('fs');
const path = require('path');

function calculatePassword(year, month, day) {
    const y = String(year);
    return [
        Number(y[0]) + Number(month[0]),
        Number(y[1]) + Number(month[1]),
        Number(y[2]) + Number(day[0]),
        Number(y[3]) + Number(day[1])
    ].join('');
}

// Test file templates
const newFormat5digit = `Пароль для Voyah Free 2021-2025.

[Пароль динамический](https://t.me/voyahchat/250819).

\`{PASSWORD}\` — пароль c {START_DATE} 19:00 GMT+03 до {END_DATE} 19:00 GMT+03

Алгоритм вычисления динамического пароля:

\`{YEAR} \` — год<br>
\`{MONTH_DAY} \` — месяц, день<br>
\`{OLD_PASSWORD}\` — динамический пароль, сложить каждый столбец отдельно
`;

const newFormat4digit = `Пароль для Voyah Free 2021-2025.

[Пароль динамический](https://t.me/voyahchat/250819).

\`{PASSWORD}\` — пароль c {START_DATE} 19:00 GMT+03 до {END_DATE} 19:00 GMT+03

Алгоритм вычисления динамического пароля:

\`{YEAR}\` — год<br>
\`{MONTH_DAY}\` — месяц<br>
\`{OLD_PASSWORD}\` — динамический
`;

function runTest(name, testFn) {
    try {
        testFn();
        console.log(`✓ ${name}`);
        return true;
    } catch (e) {
        console.error(`✗ ${name}`);
        console.error(`  ${e.message}`);
        return false;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}\n  Expected: ${expected}\n  Actual: ${actual}`);
    }
}

function updatePasswordFile(testContent, targetDate, currentDate) {
    targetDate = targetDate || new Date('2026-05-05T00:00:00Z');
    currentDate = currentDate || new Date('2026-05-04T16:00:00Z');

    const password = calculatePassword(
        targetDate.getFullYear(),
        String(targetDate.getMonth() + 1).padStart(2, '0'),
        String(targetDate.getDate()).padStart(2, '0')
    );

    let content = testContent;

    // Update main password line
    const startFormatted = `${currentDate.getDate()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 1);
    const endFormatted = `${endDate.getDate()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${endDate.getFullYear()}`;

    content = content.replace(
        /^\`\d+\`(.*?)(\d{1,2})\.(\d{2})\.(\d{4})(.*?)(\d{1,2})\.(\d{2})\.(\d{4})(.*)/m,
        `\`${password}\`$1${startFormatted}$5${endFormatted}$9`
    );

    // Update algorithm example with conditional formatting
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');

    const yearDisplay = password.length === 5 ? year + ' ' : year;
    const monthDayDisplay = password.length === 5 ? month + day + ' ' : month + day;

    content = content.replace(
        /(`)\d{4} ?(` .+?год`)/,
        '$1' + yearDisplay + '$2'
    );

    content = content.replace(
        /(`)\d{4} ?(` .+?месяц, день`)/,
        '$1' + monthDayDisplay + '$2'
    );

    // Password line - replace entire line for safety
    content = content.replace(
        /.+динамический пароль, сложить каждый столбец отдельно/,
        '`' + password + '` — динамический пароль, сложить каждый столбец отдельно'
    );

    return { content: content, password: password };
}

let passed = 0;
let failed = 0;

// Test 1: 5-digit password - year has trailing space
if (runTest('5-digit password - year format', () => {
    const input = newFormat5digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0505')
        .replace('{PASSWORD}', '25210')
        .replace('{OLD_PASSWORD}', '25210')
        .replace('{START_DATE}', '4.05.2026')
        .replace('{END_DATE}', '5.05.2026');

    const result = updatePasswordFile(input);

    const match = result.content.match(/`\d{4} ?`[^<]*<br>/);
    assertEqual(match ? match[0] : '', '`2026 ` — год<br>', 'Year should have trailing space for 5-digit password');
})) passed++; else failed++;

// Test 2: 5-digit password - month/day has trailing space
if (runTest('5-digit password - month/day format', () => {
    const input = newFormat5digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0505')
        .replace('{PASSWORD}', '25210')
        .replace('{OLD_PASSWORD}', '25210')
        .replace('{START_DATE}', '4.05.2026')
        .replace('{END_DATE}', '5.05.2026');

    const result = updatePasswordFile(input);

    const match = result.content.match(/`0505 .+?<br>/);
    assertEqual(match ? match[0] : '', '`0505 ` — месяц, день<br>', 'Month/day should have trailing space for 5-digit password');
})) passed++; else failed++;

// Test 3: 5-digit password - password has no space
if (runTest('5-digit password - password format', () => {
    const input = newFormat5digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0505')
        .replace('{PASSWORD}', '25210')
        .replace('{OLD_PASSWORD}', '25210')
        .replace('{START_DATE}', '4.05.2026')
        .replace('{END_DATE}', '5.05.2026');

    const result = updatePasswordFile(input);

    // Debug: check if line was updated
    const lines = result.content.split('\n');
    const match = lines.find(l => l.includes('сложить каждый столбец отдельно'));

    // Show actual line for debugging
    if (!match || !match.includes('`25211`')) {
        console.error('  DEBUG: actual line:', match || 'NOT FOUND');
    }

    assertEqual(match || '', '`25211` — динамический пароль, сложить каждый столбец отдельно', 'Password should have no spaces');
})) passed++; else failed++;

// Test 4: 4-digit password - year has no trailing space
if (runTest('4-digit password - year format', () => {
    const input = newFormat4digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0101')
        .replace('{PASSWORD}', '2127')
        .replace('{OLD_PASSWORD}', '2127')
        .replace('{START_DATE}', '1.01.2026')
        .replace('{END_DATE}', '2.01.2026');

    const targetDate = new Date('2026-01-01T00:00:00Z');
    const currentDate = new Date('2025-12-31T16:00:00Z');
    const result = updatePasswordFile(input, targetDate, currentDate);

    const lines = result.content.split('\n');
    const match = lines.find(l => l.includes('год<br>'));
    assertEqual(match || '', '`2026` — год<br>', 'Year should have no trailing space for 4-digit password');
    assertEqual(result.password.length, 4, 'Password should be 4 digits');
})) passed++; else failed++;

// Test 5: 4-digit password - month/day has no trailing space
if (runTest('4-digit password - month/day format', () => {
    const input = newFormat4digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0101')
        .replace('{PASSWORD}', '2127')
        .replace('{OLD_PASSWORD}', '2127')
        .replace('{START_DATE}', '1.01.2026')
        .replace('{END_DATE}', '2.01.2026');

    const targetDate = new Date('2026-01-01T00:00:00Z');
    const currentDate = new Date('2025-12-31T16:00:00Z');
    const result = updatePasswordFile(input, targetDate, currentDate);

    const match = result.content.match(/`\d{4}`[^<]*месяц<br>/);
    assertEqual(match ? match[0] : '', '`0101` — месяц<br>', 'Month/day should have no trailing space for 4-digit password');
})) passed++; else failed++;

// Test 6: 4-digit password - password value
if (runTest('4-digit password calculation', () => {
    const password = calculatePassword(2026, '01', '01');
    // 2+0, 0+1, 2+0, 6+1 = 2127
    assertEqual(password, '2127', 'Password for 2026-01-01 should be 2127');
})) passed++; else failed++;

// Test 7: 5-digit password calculation
if (runTest('5-digit password calculation', () => {
    const password = calculatePassword(2026, '05', '05');
    // 2+0, 0+5, 2+0, 6+5 = 25211
    assertEqual(password, '25211', 'Password for 2026-05-05 should be 25211');
})) passed++; else failed++;

// Test 8: 4-digit password - password line format
if (runTest('4-digit password - password format', () => {
    const input = newFormat4digit
        .replace('{YEAR}', '2026')
        .replace('{MONTH_DAY}', '0101')
        .replace('{PASSWORD}', '2127')
        .replace('{OLD_PASSWORD}', '2127')
        .replace('{START_DATE}', '1.01.2026')
        .replace('{END_DATE}', '2.01.2026');

    const targetDate = new Date('2026-01-01T00:00:00Z');
    const currentDate = new Date('2025-12-31T16:00:00Z');
    const result = updatePasswordFile(input, targetDate, currentDate);

    const lines = result.content.split('\n');
    const match = lines.find(l => l.endsWith(' — динамический') || l.endsWith(' — динамический<br>'));
    assertEqual(match || '', '`2127` — динамический', '4-digit password should have no spaces');
})) passed++; else failed++;

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
