import React from 'react';
import type { Memo } from '../types';
import { formatDate } from '../utils/dateUtils';
import { extractTitle, extractPreview } from '../utils/memoUtils';
import { TrashIcon } from './icons';

interface MemoListProps {
  memos: Memo[];
  onSelectMemo: (id: string) => void;
  onDeleteMemo: (id: string) => void;
}

const MemoListItem: React.FC<{ memo: Memo; onSelect: () => void; onDelete: () => void }> = ({ memo, onSelect, onDelete }) => {
  const title = extractTitle(memo.content);
  const preview = extractPreview(memo.content);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <li
      onClick={onSelect}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 group relative"
    >
        <div className="p-4">
            <h2 className="text-lg font-semibold truncate text-gray-800 dark:text-gray-200 pr-8">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate pr-8">{preview}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{formatDate(memo.updatedAt)}</p>
        </div>
        <button 
            onClick={handleDelete}
            aria-label="메모를 휴지통으로 이동"
            className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
    </li>
  );
};


const MemoList: React.FC<MemoListProps> = ({ memos, onSelectMemo, onDeleteMemo }) => {
  if (memos.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">메모가 없습니다</h2>
        <p className="mt-2 text-gray-400 dark:text-gray-500">오른쪽 상단의 '+' 버튼을 눌러 새 메모를 작성하세요.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {memos.map(memo => (
        <MemoListItem 
            key={memo.id} 
            memo={memo} 
            onSelect={() => onSelectMemo(memo.id)} 
            onDelete={() => onDeleteMemo(memo.id)}
        />
      ))}
    </ul>
  );
};

export default MemoList;