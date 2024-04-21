async function generateTimelineHtml() {
    const gap = 10;
    const quarterRowHeight = 85;
    const monthRowHeight = 65;
    const gapBetweenRows = 10;
    const textHeight = 60;
    const quarterRowYPosition = 60;
    const barRadaii = 12;
    const todayTextSize = 46;
    const todaySymbolSize = 20;
    const year = new Date().getFullYear();

    const userDates = [
        { date: "03-29", symbol: "💊", text: "", verticalPosition: -30, size: 44 },
        { date: "04-06", symbol: "🌸", text: "", verticalPosition: -30, size: 44 },
        { date: "04-25", symbol: "⛩️", text: "25:GW", verticalPosition: -110, size: 42 },
        { date: "05-08", symbol: "🍤", text: "08", verticalPosition: -110, size: 42 },
        { date: "06-20", symbol: "💍", text: "20", verticalPosition: -30, size: 44 },
        { date: "11-15", symbol: "🎂", text: "15", verticalPosition: -30, size: 44 },
        { date: "12-25", symbol: "🎄", text: "", verticalPosition: -30, size: 100 }
    ];

    const daysInMonth = [31, (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthColors = ["#6AA9FF", "#3F85FF", "#6AB04A", "#B4E051", "#F8E352", "#FFC30F", "#FF7F27", "#FF4C3B", "#DAA520", "#6A5ACD", "#483D8B", "#5F9EA0"];
    const monthNames = moment.monthsShort();

    let currentX = 0;
    let htmlContent = `<div style="font-family: Arial, sans-serif;">`;

    // Generate quarter bars
    daysInMonth.forEach((days, index) => {
        if ((index + 1) % 3 === 0) {
            const startMonthIndex = index - 2;
            htmlContent += `<div style="height: ${quarterRowHeight}px; background: linear-gradient(to right, ${monthColors[startMonthIndex]} 33%, ${monthColors[startMonthIndex + 1]} 33%, ${monthColors[startMonthIndex + 2]} 33%); border-radius: ${barRadaii}px; margin-bottom: ${gapBetweenRows}px;">Q${(index / 3) + 1}</div>`;
        }
    });

    // Generate month bars
    monthNames.forEach((month, i) => {
        htmlContent += `<div style="height: ${monthRowHeight}px; background-color: ${monthColors[i]}; border-radius: ${barRadaii}px; margin-bottom: ${gapBetweenRows}px;">${month}</div>`;
    });

    // Add user dates
    userDates.forEach(date => {
        const yPos = quarterRowYPosition + monthRowHeight + gapBetweenRows + date.verticalPosition;
        htmlContent += `<div style="position: relative; top: ${yPos}px; font-size: ${date.size}px;">${date.symbol} ${date.text}</div>`;
    });

    // Today marker
    const today = new Date();
    const todayFormatted = moment(today).format("DD-MMM");
    const todayXPosition = calculateXPosition(todayFormatted, year, daysInMonth, gap);
    htmlContent += `<div style="position: absolute; left: ${todayXPosition}px; top: ${gapCenterYPosition}px; width: ${todaySymbolSize}px; height: ${todaySymbolSize}px; background: #FF00FF; border-radius: 50%;"></div>`;
    htmlContent += `<div style="position: absolute; left: ${todayXPosition - todayTextSize / 2}px; top: ${gapCenterYPosition}px; color: #FF00FF; font-size: ${todayTextSize}px; font-weight: bold;">${todayFormatted}</div>`;

    htmlContent += `</div>`;
    return htmlContent;
}

function calculateXPosition(dateStr, year, daysInMonth, gap) {
    const [month, day] = dateStr.split("-").map(Number);
    const monthIndex = month - 1;
    const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    const newDate = new Date(`${year}-${month}-${day}`);
    const start = new Date(year, 0, 0);
    const diff = (newDate - start) / (1000 * 60 * 60 * 24);
    return (diff * 10) + (monthIndex * gap);
}

module.exports = generateTimelineHtml;
