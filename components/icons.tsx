import React from 'react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const MemoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const RestoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.691L7.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BoldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h5.5a4.5 4.5 0 010 9H6V4zM6 13h6.5a4.5 4.5 0 010 9H6v-9z" />
    </svg>
);

export const ItalicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-4.5 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5h-7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 19.5h-7.5" />
    </svg>
);

export const ListOrderedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 4.5h9.75M10.125 9h9.75M10.125 13.5h9.75M10.125 18h9.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.125 4.5h.008v.008H4.125V4.5zM4.125 9h.008v.008H4.125V9zM4.125 13.5h.008v.008H4.125v-.008zM4.125 18h.008v.008H4.125v-.008z" />
    </svg>
);

export const ListUnorderedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6h12M8.25 12h12M8.25 18h12M3.75 6.75h.008v.008H3.75V6.75zm0 5.25h.008v.008H3.75v-.008zm0 5.25h.008v.008H3.75v-.008z" />
    </svg>
);

export const SortAscendingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
    </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const MascotIcon: React.FC<{ className?: string; isMad?: boolean }> = ({ className, isMad = false }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M10 50 C 10 20, 90 20, 90 50 C 90 90, 75 90, 70 80 C 65 90, 55 90, 50 80 C 45 90, 35 90, 30 80 C 25 90, 10 90, 10 50 Z" />
      {isMad ? (
        <>
            {/* Mad Eyes */}
            <path d="M30 50 L 45 40" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <path d="M70 50 L 55 40" stroke="white" strokeWidth="5" strokeLinecap="round" />
            {/* Mad Mouth */}
            <path d="M40 70 Q 50 60, 60 70" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
            {/* Normal Eyes */}
            <circle cx="35" cy="45" r="5" fill="white" />
            <circle cx="65" cy="45" r="5" fill="white" />
            {/* Normal Mouth */}
            <path d="M40 60 Q 50 75, 60 60" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );

export const TextColorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.65 16L12 4L17.35 16M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const HighlightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m16 5-5.23 5.23a3 3 0 0 0 0 4.24L16 20"/>
    <path d="m16 5-1.41-1.41a2 2 0 0 0-2.83 0L10.34 5"/>
    <path d="m13 8 5 5"/>
    <path d="M4.5 13.5 3 15l6 6 1.5-1.5"/>
    <path d="m16 5 5.5 5.5"/>
  </svg>
);