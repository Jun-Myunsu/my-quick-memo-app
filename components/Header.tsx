import React from 'react';
import type { SortType, ViewType } from '../types';
import { PlusIcon, TrashIcon, MemoIcon, SortAscendingIcon, ClockIcon } from './icons';

interface HeaderProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  onNewMemo: () => void;
  sortType: SortType;
  setSortType: (sort: SortType) => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, onNewMemo, sortType, setSortType }) => {
  const navButtonStyle = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors";
  const activeNavButtonStyle = "bg-blue-600 text-white";
  const inactiveNavButtonStyle = "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">QuickMemo</h1>
            
            <div className="flex items-center gap-2 sm:gap-3">
                {view === 'list' && (
                    <div className="relative">
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value as SortType)}
                            className="pl-8 pr-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="updatedAt">최신순</option>
                            <option value="title">제목순</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                            {sortType === 'updatedAt' ? <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <SortAscendingIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                        </div>
                    </div>
                )}
                
                <nav className="flex items-center bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                    <button onClick={() => setView('list')} className={`${navButtonStyle} ${view === 'list' ? activeNavButtonStyle : inactiveNavButtonStyle}`}>
                        <MemoIcon className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1.5">메모</span>
                    </button>
                    <button onClick={() => setView('trash')} className={`${navButtonStyle} ${view === 'trash' ? activeNavButtonStyle : inactiveNavButtonStyle}`}>
                        <TrashIcon className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1.5">휴지통</span>
                    </button>
                </nav>

                <button
                    onClick={onNewMemo}
                    disabled={view === 'editor'}
                    className="flex items-center justify-center h-10 w-10 rounded-full text-white shadow-md transition-transform transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:dark:bg-gray-600 bg-blue-600 hover:bg-blue-700 active:scale-95"
                    aria-label="새 메모 작성"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    </header>
  );
};

export default Header;