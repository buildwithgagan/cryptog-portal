
import { useState, useEffect } from "react";
import { OngoingContest } from "../types/contestTypes";

/**
 * Hook for managing contest timer counters
 */
export const useContestTimer = (contests: OngoingContest[]) => {
  // State for time counters
  const [timeLeft, setTimeLeft] = useState(contests.map(contest => contest.timeLeft));
  
  // Update ongoing contest timers
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimes => 
        prevTimes.map(time => {
          let { hours, minutes, seconds } = time;
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
          return { hours, minutes, seconds };
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};
