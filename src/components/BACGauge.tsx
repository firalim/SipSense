import React, { useEffect, useRef } from 'react';

interface BACGaugeProps {
  bac: number;
  recommendation: 'good' | 'moderate' | 'caution';
}

const BACGauge: React.FC<BACGaugeProps> = ({ bac, recommendation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#e5e7eb'; // light gray
    ctx.stroke();
    
    // Calculate progress (0.08 is legal driving limit in many places)
    const maxBAC = 0.20; // Maximum BAC to show on gauge
    let progress = Math.min(bac / maxBAC, 1);
    
    // Get color based on recommendation
    const getColor = () => {
      switch (recommendation) {
        case 'good':
          return '#10B981'; // green-500
        case 'moderate':
          return '#F59E0B'; // amber-500
        case 'caution':
          return '#EF4444'; // red-500
      }
    };
    
    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + progress * Math.PI, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = getColor();
    ctx.stroke();
    
    // Add gradient overlay to make it look nicer
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + progress * Math.PI, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Draw the center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI, false);
    ctx.fillStyle = getColor();
    ctx.fill();
    
    // Add marking lines
    const addMarking = (percent: number, length: number = 10, width: number = 2) => {
      const angle = Math.PI + percent * Math.PI;
      const startX = centerX + (radius - length) * Math.cos(angle);
      const startY = centerY + (radius - length) * Math.sin(angle);
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = width;
      ctx.strokeStyle = '#64748b'; // slate-500
      ctx.stroke();
    };
    
    // Add markings at regular intervals
    for (let i = 0; i <= 1; i += 0.2) {
      addMarking(i, i === 0 || i === 1 ? 15 : 10, i === 0 || i === 1 ? 3 : 2);
    }
    
    // Add labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.textAlign = 'center';
    ctx.fillText('0%', centerX - radius + 15, centerY + 25);
    ctx.fillText(`${(maxBAC * 100).toFixed(0)}%`, centerX + radius - 15, centerY + 25);
    
    // Add needle
    const needleAngle = Math.PI + progress * Math.PI;
    const needleLength = radius - 30;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#475569'; // slate-600
    ctx.stroke();
    
  }, [bac, recommendation]);
  
  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={120} 
        className="transition-all duration-300"
      />
    </div>
  );
};

export default BACGauge;