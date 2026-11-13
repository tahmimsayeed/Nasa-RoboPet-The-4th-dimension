import { useRef } from "react";

export default function DrawingPad({ onChange }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    drawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    const context = canvasRef.current.getContext("2d");
    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.strokeStyle = "#25204a";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  };

  const finishDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    onChange?.(canvas.toDataURL("image/png"));
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    onChange?.("");
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "my-space-postcard-drawing.png";
    link.click();
  };

  return (
    <section className="drawing-pad-section">
      <h3>Draw a picture for your postcard</h3>
      <p>Use your mouse, finger, or stylus to draw.</p>
      <canvas
        ref={canvasRef}
        width={640}
        height={220}
        className="postcard-drawing-canvas"
        aria-label="Postcard drawing area"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={finishDrawing}
        onPointerCancel={finishDrawing}
      />
      <div className="drawing-pad-actions">
        <button type="button" onClick={clearDrawing}>Clear drawing</button>
        <button type="button" onClick={downloadDrawing}>Download drawing</button>
      </div>
    </section>
  );
}
