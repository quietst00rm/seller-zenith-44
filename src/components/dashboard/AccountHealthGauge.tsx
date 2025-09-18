import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AccountHealthGaugeProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function AccountHealthGauge({ 
  score, 
  maxScore = 1000, 
  className 
}: AccountHealthGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const percentage = (animatedScore / maxScore) * 180;
  
  const getHealthStatus = (score: number) => {
    if (score >= 900) return { status: "Excellent", color: "text-success" };
    if (score >= 700) return { status: "Good", color: "text-info" };
    if (score >= 500) return { status: "Fair", color: "text-warning" };
    return { status: "Poor", color: "text-danger" };
  };

  const { status, color } = getHealthStatus(score);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Account Health Rating
      </h3>
      
      <div className="relative w-40 h-20 mb-4">
        {/* Gauge background */}
        <div className="absolute inset-0 rounded-t-full border-8 border-muted"></div>
        
        {/* Gauge fill with gradient */}
        <div 
          className="absolute inset-0 rounded-t-full border-8 border-transparent bg-gradient-to-r from-danger via-warning to-success transition-transform duration-1000 ease-out"
          style={{
            clipPath: `polygon(0 100%, ${percentage}% 100%, ${percentage}% 0, 0 0)`,
            transform: `rotate(${percentage}deg)`,
            transformOrigin: 'center bottom'
          }}
        ></div>
        
        {/* Score display */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center h-full pt-8">
          <span className="text-3xl font-bold text-foreground">{animatedScore}</span>
          <span className={cn("text-sm font-medium", color)}>{status}</span>
        </div>
      </div>
      
      <div className="flex justify-between w-full text-xs text-muted-foreground px-2">
        <span>0</span>
        <span>{maxScore}</span>
      </div>
    </div>
  );
}