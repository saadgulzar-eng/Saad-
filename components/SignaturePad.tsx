
import React, { useRef, useEffect, useState } from 'react';

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSignatureChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.strokeStyle = '#0f172a'; // slate-900
    context.lineWidth = 3;

    const startDrawing = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        const { offsetX, offsetY } = getCoords(event);
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setHasSigned(true);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        event.preventDefault();
        const { offsetX, offsetY } = getCoords(event);
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        context.closePath();
        setIsDrawing(false);
        onSignatureChange(canvas.toDataURL('image/png'));
    };
    
    const getCoords = (event: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (event instanceof MouseEvent) {
            return { offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
        }
        if (event.touches[0]) {
            return { offsetX: event.touches[0].clientX - rect.left, offsetY: event.touches[0].clientY - rect.top };
        }
        return { offsetX: 0, offsetY: 0 };
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawing]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      onSignatureChange('');
      setHasSigned(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-700">Staff Signature</h2>
        <button
          onClick={clearSignature}
          className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          Clear
        </button>
      </div>
      <div className="relative w-full h-48 bg-slate-50 border border-dashed border-slate-300 rounded-md overflow-hidden">
        {!hasSigned && (
             <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none">
                Sign here
             </div>
        )}
        <canvas ref={canvasRef} width="500" height="190" className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default SignaturePad;
