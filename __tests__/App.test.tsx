// Fix: Added a triple-slash directive to explicitly load jest-dom types for TypeScript.
/// <reference types="@testing-library/jest-dom" />

import { describe, beforeEach, afterEach, test, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// Fix: Add import for jest-dom to extend jest matchers and fix TypeScript errors for 'toBeInTheDocument'.
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.confirm
Object.defineProperty(window, 'confirm', {
  value: jest.fn().mockImplementation(() => true),
});


describe('QuickMemo App Integration Tests', () => {
  beforeEach(() => {
    // Clear mocks and localStorage before each test
    localStorageMock.clear();
    (window.confirm as jest.Mock).mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  
  test('TC-A-01, TC-A-02: should create a new memo, auto-save, and display it in the list', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<App />);

    // 1. Check initial empty state
    expect(screen.getByText('메모가 없습니다')).toBeInTheDocument();

    // 2. Click "New Memo" button
    await user.click(screen.getByLabelText('새 메모 작성'));
    
    // 3. Editor should be visible
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    
    // 4. Type content and wait for auto-save
    await user.type(editor, 'My first memo title');
    expect(await screen.findByText('저장 중...')).toBeInTheDocument();
    
    await waitFor(() => {
        expect(screen.getByText('저장됨')).toBeInTheDocument();
    }, { timeout: 2000 });

    // 5. Go back to list view
    await user.click(screen.getByRole('button', { name: /back/i }));

    // 6. The new memo should be in the list
    expect(screen.getByText('My first memo title')).toBeInTheDocument();
    expect(screen.queryByText('메모가 없습니다')).not.toBeInTheDocument();
  });

  test('TC-B-01, TC-B-02: should delete a memo from list view and move it to the trash', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    // Setup: Create a memo first
    localStorageMock.setItem('quickmemo_memos', JSON.stringify([
        { id: 'memo_1', content: '<h1>Memo to be deleted</h1>', createdAt: Date.now(), updatedAt: Date.now(), deletedAt: null }
    ]));
    
    render(<App />);

    // 1. Find the memo item in the list
    const memoItem = screen.getByText('Memo to be deleted').closest('li');
    expect(memoItem).toBeInTheDocument();

    // 2. Hover over the memo item to reveal the delete button
    await user.hover(memoItem!);

    // 3. Click the delete button that appears on the item
    const deleteButton = within(memoItem!).getByLabelText('메모를 휴지통으로 이동');
    await user.click(deleteButton);

    // 4. Check if it's gone from the main list
    expect(screen.getByText('메모가 없습니다')).toBeInTheDocument();
    expect(screen.queryByText('Memo to be deleted')).not.toBeInTheDocument();

    // 5. Navigate to trash view
    await user.click(screen.getByRole('button', { name: '휴지통' }));
    
    // 6. Check if the memo is in the trash
    expect(screen.getByText('Memo to be deleted')).toBeInTheDocument();
    expect(screen.getByText(/D-30/)).toBeInTheDocument();
  });

  test('TC-B-03: should restore a memo from the trash', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Setup: Have a deleted memo
    localStorageMock.setItem('quickmemo_memos', JSON.stringify([
      { id: 'memo_1', content: '<h1>Restore me</h1>', createdAt: Date.now(), updatedAt: Date.now(), deletedAt: Date.now() }
    ]));

    render(<App />);
    
    // 1. Go to trash
    await user.click(screen.getByRole('button', { name: '휴지통' }));
    expect(screen.getByText('Restore me')).toBeInTheDocument();
    
    // 2. Click restore
    await user.click(screen.getByRole('button', { name: '복구' }));
    
    // 3. Check if trash is now empty
    expect(screen.getByText('휴지통이 비어있습니다')).toBeInTheDocument();

    // 4. Go back to memo list
    await user.click(screen.getByRole('button', { name: '메모' }));
    
    // 5. Check if memo is restored
    expect(screen.getByText('Restore me')).toBeInTheDocument();
  });

  test('TC-B-04: should permanently delete a memo from the trash', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Setup: Have a deleted memo
    localStorageMock.setItem('quickmemo_memos', JSON.stringify([
      { id: 'memo_1', content: '<h1>Delete me forever</h1>', createdAt: Date.now(), updatedAt: Date.now(), deletedAt: Date.now() }
    ]));
    
    render(<App />);

    // 1. Go to trash
    await user.click(screen.getByRole('button', { name: '휴지통' }));
    expect(screen.getByText('Delete me forever')).toBeInTheDocument();

    // 2. Click the permanent delete button
    await user.click(screen.getByRole('button', { name: '영구 삭제' }));

    // 3. Confirm the action
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(window.confirm).toHaveBeenCalledWith('이 메모를 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.');

    // 4. Verify the memo is gone and the trash is empty
    expect(screen.getByText('휴지통이 비어있습니다')).toBeInTheDocument();
    expect(screen.queryByText('Delete me forever')).not.toBeInTheDocument();
  });
});