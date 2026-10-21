import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExamCountdown: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { settings } = useApp();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(`${settings.examDate}T09:00:00`).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.examDate]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-950/70 border border-brand-500/30 text-brand-300 text-xs font-medium">
        <Clock className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
        <span>Exam in <strong className="text-white font-bold">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</strong></span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-brand-950/80 via-slate-900/90 to-navy-950 border border-brand-500/20 shadow-xl shadow-brand-950/30">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-brand-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Calendar className="w-4 h-4" />
            <span>Target Exam Date</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            23 October 2026
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            NPTEL Certification: Design & Implementation of HCI
          </p>
        </div>

        {timeLeft.isPast ? (
          <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-sm">
            Exam Day has arrived! Good luck!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-white/5 min-w-[56px]">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">{timeLeft.days}</div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Days</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-white/5 min-w-[56px]">
              <div className="text-xl sm:text-2xl font-bold text-brand-300 font-mono">{timeLeft.hours}</div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Hours</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-white/5 min-w-[56px]">
              <div className="text-xl sm:text-2xl font-bold text-brand-300 font-mono">{timeLeft.minutes}</div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Mins</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-white/5 min-w-[56px]">
              <div className="text-xl sm:text-2xl font-bold text-brand-400 font-mono animate-pulse">{timeLeft.seconds}</div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Secs</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
