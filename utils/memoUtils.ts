
const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export const extractTitle = (content: string): string => {
  const text = stripHtml(content).trim();
  const firstLine = text.split('\n')[0];
  return firstLine || '제목 없음';
};

export const extractPreview = (content: string): string => {
  const text = stripHtml(content).trim();
  const firstLineBreakIndex = text.indexOf('\n');
  const previewText = firstLineBreakIndex !== -1 ? text.substring(firstLineBreakIndex + 1) : '';
  return previewText.substring(0, 100).trim() || '내용 없음';
};
