// types 
import { ArticleContent } from "@/common/types";

import { isJsonString } from ".";

function getBlogSummary(content: string): string {
  const noSummary = 'No summary available';

  if (!isJsonString(content)) {
    return noSummary; // Invalid JSON string
  }

  // Parse the JSON string
  const data: ArticleContent[] = JSON.parse(content);
  if (!Array.isArray(data)) {
    return noSummary; // Invalid data format
  }

  // Find the first paragraph in the content
  const firstParagraph = data.find(item => item.type === 'paragraph');
  if (!firstParagraph || !firstParagraph.value) {
    return noSummary; // No paragraph found
  }

  // Get the first 20 words of the first paragraph
  const summary = firstParagraph.value.split(' ').slice(0, 20).join(' ');
  return summary;
}

export default getBlogSummary;