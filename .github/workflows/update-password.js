#!/usr/bin/env node
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

function getNextBeijingDayPassword() {
    const now = new Date();

    // Get current Moscow time to determine the target date
    const moscowTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
    const targetDate = new Date(moscowTime);

    // Logic:
    // 18:27 - 23:59:59: generate password for tomorrow
    // 00:00 - 18:26:59: generate password for today
    const moscowHour = moscowTime.getHours();
    const moscowMin = moscowTime.getMinutes();

    const shouldGenerateForTomorrow = (moscowHour === 18 && moscowMin >= 27) ||
        (moscowHour >= 19 && moscowHour <= 23);

    if (shouldGenerateForTomorrow) {
        // Generate password for tomorrow
        targetDate.setDate(targetDate.getDate() + 1);
        console.log(`Generating password for tomorrow (time: ${moscowHour}:${moscowMin.toString().padStart(2, '0')})`);
    } else {
        console.log(`Generating password for today (time: ${moscowHour}:${moscowMin.toString().padStart(2, '0')})`);
    }

    const password = calculatePassword(
        targetDate.getFullYear(),
        String(targetDate.getMonth() + 1).padStart(2, '0'),
        String(targetDate.getDate()).padStart(2, '0')
    );

    return {
        password,
        currentDate: moscowTime,
        targetDate: targetDate
    };
}

function updatePasswordFile() {
    const { password, currentDate, targetDate } = getNextBeijingDayPassword();

    const file = path.join(repoRoot, 'common/password.md');
    let content = fs.readFileSync(file, 'utf8');

    // Update ONLY the time-based password line (line 5)
    // Start date is always today at 19:00 MSK
    const startFormatted = `${currentDate.getDate()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;

    // End date is always tomorrow at 19:00 MSK
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 1);
    const endFormatted = `${endDate.getDate()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${endDate.getFullYear()}`;

    // Use flexible regex to replace only password and dates, preserving other text
    // Match exactly DD.MM.YYYY format to avoid accumulating digits
    content = content.replace(
        /^`\d+`(.*?)(\d{1,2})\.(\d{2})\.(\d{4})(.*?)(\d{1,2})\.(\d{2})\.(\d{4})(.*)/m,
        `\`${password}\`$1${startFormatted}$5${endFormatted}$9`
    );

    fs.writeFileSync(file, content);
    console.log('File updated:', file);
}

// Find password.md relative to repo root
const repoRoot = process.env.GITHUB_WORKSPACE || path.join(__dirname, '../..');
updatePasswordFile();
