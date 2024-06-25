const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const segments = [
    { text: 'Abbonato', color: '#FFD700', textColor: '#000000', fontSize: 1.15 },
    { text: '1', color: '#000000', textColor: '#FFFFFF' },
    { text: '2', color: '#000000', textColor: '#FFFFFF' },
    { text: 'Abbonato', color: '#FFD700', textColor: '#000000', fontSize: 1.15 },
    { text: '3', color: '#000000', textColor: '#FFFFFF' },
    { text: '4', color: '#000000', textColor: '#FFFFFF' },
    { text: 'Abbonato', color: '#FFD700', textColor: '#000000', fontSize: 1.15 },
    { text: '5', color: '#000000', textColor: '#FFFFFF' },
    { text: '6', color: '#000000', textColor: '#FFFFFF' },
    { text: 'Abbonato', color: '#FFD700', textColor: '#000000', fontSize: 1.15 },
    { text: '7', color: '#000000', textColor: '#FFFFFF' },
    { text: '8', color: '#000000', textColor: '#FFFFFF' }
];

const segmentAngle = (2 * Math.PI) / segments.length;
let startAngle = 0;
let spinAngle = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    segments.forEach((segment, index) => {
        const angle = startAngle + index * segmentAngle;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + segmentAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = segment.textColor;
        ctx.font = `${(segment.fontSize || 1) * 20}px Arial`;
        ctx.fillText(segment.text, canvas.width / 2 - 10, 10);
        ctx.restore();
    });
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngleChange = easeOut(spinTime, 0, spinAngle, spinTimeTotal);
    startAngle += (spinAngleChange * Math.PI / 180);
    drawWheel();
    requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = segmentAngle * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Arial';
    const text = segments[index].text;
    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
    spinAngle = Math.random() * 10 + 20;  // Aumenta la velocità iniziale
    spinTime = 0;
    spinTimeTotal = 5000; // Durata di 5 secondi
    rotateWheel();
}

spinButton.addEventListener('click', spin);
drawWheel();
