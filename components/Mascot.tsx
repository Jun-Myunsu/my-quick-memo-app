import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MascotIcon } from './icons';

const messages = [
  "오늘도 좋은 하루 보내세요!",
  "멋진 아이디어가 떠올랐나요?",
  "가끔은 쉬어가는 것도 중요해요.",
  "메모하는 습관은 성공의 지름길이래요!",
  "안녕하세요! 저는 퀵모예요.",
  "어떤 내용을 기록해볼까요?",
  "반짝이는 생각을 놓치지 마세요!",
  "오늘도 파이팅입니다! (ง •̀_•́)ง",
  "무엇이든 적어보세요. 시작이 반이에요.",
  "잘하고 있어요! 계속 나아가세요."
];

const pokeMessages = [
  "앗, 간지러워요!",
  "자꾸 만지면 부끄러워요 >_<",
  "으악! 놀랐잖아요!",
  "제 집중력을 방해하지 말아주세요!",
  "지금은 바빠요. 나중에 놀아주세요.",
  "살살 다뤄주세요...!"
];

const MIN_INTERVAL = 10000; // 10 seconds
const MAX_INTERVAL = 25000; // 25 seconds
const MESSAGE_DURATION = 6000; // 6 seconds

const Mascot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMad, setIsMad] = useState(false);
  const messageTimerRef = useRef<number | null>(null);
  const scheduleTimerRef = useRef<number | null>(null);

  const scheduleNextRandomMessage = useCallback(() => {
    const showRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
      setIsVisible(true);

      messageTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
        scheduleNextRandomMessage();
      }, MESSAGE_DURATION);
    };

    const randomInterval = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
    scheduleTimerRef.current = window.setTimeout(showRandomMessage, randomInterval);
  }, []);

  useEffect(() => {
    scheduleNextRandomMessage();

    return () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
      if (scheduleTimerRef.current) clearTimeout(scheduleTimerRef.current);
    };
  }, [scheduleNextRandomMessage]);

  const handlePoke = () => {
    // Clear any existing timers to react immediately
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    if (scheduleTimerRef.current) clearTimeout(scheduleTimerRef.current);
    
    setIsMad(true);

    // Show a poke message
    const randomIndex = Math.floor(Math.random() * pokeMessages.length);
    setMessage(pokeMessages[randomIndex]);
    setIsVisible(true);

    // Set a timer to hide the poke message and then resume the normal schedule
    messageTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setIsMad(false);
      scheduleNextRandomMessage();
    }, MESSAGE_DURATION);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex flex-col items-end gap-2" aria-live="polite">
      <div 
        className={`
          relative bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
          py-2 px-4 rounded-lg shadow-lg max-w-xs sm:max-w-sm
          transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <p className="text-sm">{message}</p>
        <div className="absolute right-4 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[10px] border-t-white dark:border-t-gray-700 border-r-[8px] border-r-transparent"></div>
      </div>
      <div onClick={handlePoke} className="cursor-pointer" aria-label="QuickMemo 마스코트">
        <MascotIcon 
          isMad={isMad}
          className={`
            h-16 w-16 text-blue-500
            transition-transform duration-300 ease-in-out
            ${isVisible ? '-translate-y-1' : 'translate-y-0'}
          `}
        />
      </div>
    </div>
  );
};

export default Mascot;