import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Memo, SortType, ViewType } from './types';
import Header from './components/Header';
import MemoList from './components/MemoList';
import MemoEditor from './components/MemoEditor';
import TrashList from './components/TrashList';
import { extractTitle } from './utils/memoUtils';
import Mascot from './components/Mascot';

const App: React.FC = () => {
  const [memos, setMemos] = useLocalStorage<Memo[]>('quickmemo_memos', []);
  const [view, setView] = useState<ViewType>('list');
  const [currentMemoId, setCurrentMemoId] = useState<string | null>(null);
  const [sortType, setSortType] = useLocalStorage<SortType>('quickmemo_sort', 'updatedAt');

  const TRASH_RETENTION_DAYS = 30;

  const purgeOldMemos = useCallback(() => {
    const thirtyDaysAgo = Date.now() - TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    setMemos(prevMemos => prevMemos.filter(memo => {
      return !memo.deletedAt || memo.deletedAt > thirtyDaysAgo;
    }));
  }, [setMemos]);

  useEffect(() => {
    purgeOldMemos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewMemo = () => {
    const newMemo: Memo = {
      id: `memo_${Date.now()}`,
      content: '<div><br></div>',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: null,
    };
    setMemos(prev => [newMemo, ...prev]);
    setCurrentMemoId(newMemo.id);
    setView('editor');
  };

  const handleSelectMemo = (id: string) => {
    setCurrentMemoId(id);
    setView('editor');
  };

  const handleSaveMemo = (id: string, content: string) => {
    setMemos(prev =>
      prev.map(memo =>
        memo.id === id ? { ...memo, content, updatedAt: Date.now() } : memo
      )
    );
  };
  
  const handleDeleteMemo = (id: string) => {
    setMemos(prev =>
      prev.map(memo =>
        memo.id === id ? { ...memo, deletedAt: Date.now() } : memo
      )
    );
    setView('list');
    setCurrentMemoId(null);
  };

  const handleRestoreMemo = (id: string) => {
    setMemos(prev =>
      prev.map(memo =>
        memo.id === id ? { ...memo, deletedAt: null, updatedAt: Date.now() } : memo
      )
    );
  };
  
  const handlePermanentDelete = (id: string) => {
    setMemos(prev => prev.filter(memo => memo.id !== id));
  };
  
  const handleBack = () => {
    setView('list');
    setCurrentMemoId(null);
  };

  const activeMemos = memos.filter(memo => !memo.deletedAt);
  const trashedMemos = memos.filter(memo => memo.deletedAt);

  const sortedMemos = [...activeMemos].sort((a, b) => {
    if (sortType === 'updatedAt') {
      return b.updatedAt - a.updatedAt;
    }
    const titleA = extractTitle(a.content).toLowerCase();
    const titleB = extractTitle(b.content).toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return b.updatedAt - a.updatedAt; // Secondary sort
  });

  const currentMemo = memos.find(memo => memo.id === currentMemoId);

  return (
    <div className="min-h-screen font-sans flex flex-col max-w-4xl mx-auto p-4 sm:p-6">
      <Header 
        view={view}
        setView={setView}
        onNewMemo={handleNewMemo}
        sortType={sortType}
        setSortType={setSortType}
      />
      <main className="flex-grow pt-16">
        {view === 'list' && <MemoList memos={sortedMemos} onSelectMemo={handleSelectMemo} onDeleteMemo={handleDeleteMemo} />}
        {view === 'editor' && currentMemo && (
          <MemoEditor
            key={currentMemo.id}
            memo={currentMemo}
            onSave={handleSaveMemo}
            onBack={handleBack}
          />
        )}
        {view === 'trash' && (
          <TrashList
            memos={trashedMemos}
            onRestore={handleRestoreMemo}
            onDelete={handlePermanentDelete}
            retentionDays={TRASH_RETENTION_DAYS}
          />
        )}
      </main>
      <Mascot />
    </div>
  );
};

export default App;