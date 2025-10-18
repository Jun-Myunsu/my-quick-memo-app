import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Memo } from '../types';
import { BackIcon, TrashIcon, BoldIcon, ItalicIcon, ListOrderedIcon, ListUnorderedIcon } from './icons';

interface MemoEditorProps {
  memo: Memo;
  onSave: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

type SaveStatus = 'idle' | 'saving' | 'saved';

const MemoEditor: React.FC<MemoEditorProps> = ({ memo, onSave, onDelete, onBack }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimeoutRef = useRef<number | null>(null);

  const handleContentChange = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaveStatus('saving');
    saveTimeoutRef.current = window.setTimeout(() => {
      if (editorRef.current) {
        onSave(memo.id, editorRef.current.innerHTML);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 1500);
      }
    }, 1000);
  }, [memo.id, onSave]);

  const handleManualSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
     if (editorRef.current) {
        onSave(memo.id, editorRef.current.innerHTML);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 1500);
      }
  }, [memo.id, onSave]);

  useEffect(() => {
    if (editorRef.current) {
      // Set default paragraph separator to <p> to ensure consistent paragraph behavior.
      document.execCommand('defaultParagraphSeparator', false, 'p');
      editorRef.current.innerHTML = memo.content;
      editorRef.current.focus();
    }

    const editorDiv = editorRef.current;
    if (editorDiv) {
        editorDiv.addEventListener('input', handleContentChange);
    }
    
    return () => {
        if (editorDiv) {
            editorDiv.removeEventListener('input', handleContentChange);
        }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      handleManualSave(); // Save on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memo.id]); 


  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    handleContentChange();
  };

  const FormatButton: React.FC<{ onClick: () => void, children: React.ReactNode, label: string }> = ({ onClick, children, label }) => (
    <button onClick={onClick} aria-label={label} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      {children}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between gap-y-2 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={onBack} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><BackIcon className="h-5 w-5"/></button>
            <FormatButton onClick={() => applyFormat('bold')} label="Bold"><BoldIcon className="h-5 w-5"/></FormatButton>
            <FormatButton onClick={() => applyFormat('italic')} label="Italic"><ItalicIcon className="h-5 w-5"/></FormatButton>
            <FormatButton onClick={() => applyFormat('insertUnorderedList')} label="Unordered List"><ListUnorderedIcon className="h-5 w-5"/></FormatButton>
            <FormatButton onClick={() => applyFormat('insertOrderedList')} label="Ordered List"><ListOrderedIcon className="h-5 w-5"/></FormatButton>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 w-16 text-right">
            {saveStatus === 'saving' && '저장 중...'}
            {saveStatus === 'saved' && '저장됨'}
          </span>
          <button onClick={() => onDelete(memo.id)} className="p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" aria-label="메모 삭제">
            <TrashIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="flex-grow p-4 sm:p-6 text-base leading-relaxed focus:outline-none min-h-[50vh]"
      />
    </div>
  );
};

export default MemoEditor;