import React from 'react';
import type { Memo } from '../types';
import { formatDate } from '../utils/dateUtils';
import { extractTitle, extractPreview } from '../utils/memoUtils';
import { RestoreIcon, TrashIcon } from './icons';

interface TrashListProps {
  memos: Memo[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  retentionDays: number;
}

const TrashListItem: React.FC<{
  memo: Memo;
  onRestore: () => void;
  onDelete: () => void;
  retentionDays: number;
}> = ({ memo, onRestore, onDelete, retentionDays }) => {
  const title = extractTitle(memo.content);
  const preview = extractPreview(memo.content);
  const deletedAt = memo.deletedAt || Date.now();
  const remainingDays = Math.ceil(retentionDays - (Date.now() - deletedAt) / (1000 * 60 * 60 * 24));

  const handleDelete = () => {
    if (window.confirm('이 메모를 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      onDelete();
    }
  }

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-grow overflow-hidden">
        <h2 className="text-lg font-semibold truncate text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{preview}</p>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-xs text-red-500 dark:text-red-400">삭제된 날짜: {formatDate(deletedAt)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">(D-{remainingDays > 0 ? remainingDays : 0})</p>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        <button onClick={onRestore} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
          <RestoreIcon className="h-4 w-4" />
          <span>복구</span>
        </button>
        <button onClick={handleDelete} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
          <TrashIcon className="h-4 w-4" />
          <span>영구 삭제</span>
        </button>
      </div>
    </li>
  );
};

const TrashList: React.FC<TrashListProps> = ({ memos, onRestore, onDelete, retentionDays }) => {
  const sortedMemos = [...memos].sort((a, b) => (b.deletedAt || 0) - (a.deletedAt || 0));

  if (sortedMemos.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">휴지통이 비어있습니다</h2>
        <p className="mt-2 text-gray-400 dark:text-gray-500">메모는 삭제 후 {retentionDays}일 동안 보관됩니다.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {sortedMemos.map(memo => (
        <TrashListItem
          key={memo.id}
          memo={memo}
          onRestore={() => onRestore(memo.id)}
          onDelete={() => onDelete(memo.id)}
          retentionDays={retentionDays}
        />
      ))}
    </ul>
  );
};

export default TrashList;