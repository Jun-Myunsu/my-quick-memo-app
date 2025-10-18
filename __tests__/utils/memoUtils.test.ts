// Fix: Import jest globals to resolve TypeScript errors.
import { describe, it, expect } from '@jest/globals';
import { extractTitle, extractPreview } from '../../utils/memoUtils';

describe('memoUtils', () => {
  describe('extractTitle', () => {
    it('should extract the first line of text as title', () => {
      const content = '<p>This is a title</p><p>This is content.</p>';
      expect(extractTitle(content)).toBe('This is a title');
    });

    it('should return "제목 없음" for empty or whitespace content', () => {
      const content = '<p><br></p>';
      expect(extractTitle(content)).toBe('제목 없음');
    });

    it('should handle content with only one line', () => {
      const content = '<div>Just a single line</div>';
      expect(extractTitle(content)).toBe('Just a single line');
    });
     it('should handle complex html and extract text', () => {
      const content = '<b><i>TITLE</i></b><br><div>content</div>';
      expect(extractTitle(content)).toBe('TITLE');
    });
  });

  describe('extractPreview', () => {
    it('should extract content after the first line as preview', () => {
      const content = '<p>Title Line</p><p>This is the preview content.</p>';
      expect(extractPreview(content)).toBe('This is the preview content.');
    });

    it('should return "내용 없음" when there is no content after the title', () => {
      const content = '<p>Only a title</p>';
      expect(extractPreview(content)).toBe('내용 없음');
    });
    
    it('should return "내용 없음" for completely empty content', () => {
      const content = ' ';
      expect(extractPreview(content)).toBe('내용 없음');
    });

    it('should truncate long previews to 100 characters', () => {
      const longText = 'a'.repeat(150);
      const content = `<p>Title</p><div>${longText}</div>`;
      expect(extractPreview(content).length).toBe(100);
    });
  });
});