// script.js

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("signaturePad");
    const ctx = canvas.getContext("2d");
    const clearBtn = document.getElementById("clearBtn");
    const saveBtn = document.getElementById("saveBtn");

    let drawing = false;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let lastLineWidth = 0;

    let points = [];

    function startDrawing(e) {
        drawing = true;
        const { offsetX, offsetY } = getMousePosition(e);
        lastX = offsetX;
        lastY = offsetY;
        lastTime = Date.now();
        lastLineWidth = 2;
        points.push({ x: offsetX, y: offsetY });
    }

    function endDrawing() {
        drawing = false;
        points = [];
    }

    function draw(e) {
        if (!drawing) return;

        const { offsetX, offsetY } = getMousePosition(e);
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        const distance = Math.sqrt((offsetX - lastX) ** 2 + (offsetY - lastY) ** 2);

        let lineWidth = Math.min(5 / (deltaTime / distance + 1), 4);
        lineWidth = (lineWidth + lastLineWidth) / 2;

        points.push({ x: offsetX, y: offsetY });

        if (points.length >= 3) {
            const [prevPoint, currentPoint, nextPoint] = points.slice(-3);

            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#000";

            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
            ctx.stroke();

            points = points.slice(-2);
        }

        lastX = offsetX;
        lastY = offsetY;
        lastTime = currentTime;
        lastLineWidth = lineWidth;
    }

    function getMousePosition(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        };
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveAsPNG() {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "signature.png";
        link.click();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endDrawing);

    clearBtn.addEventListener("click", clearCanvas);
    saveBtn.addEventListener("click", saveAsPNG);
});
