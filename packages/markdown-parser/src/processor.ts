/**
 * The Markdown front end: text → MDAST.
 *
 * One processor, shared by every content type, so a table or a directive is
 * never parsed two different ways. Frontmatter is stripped by gray-matter
 * before remark ever sees the body.
 */
import type { Root } from 'mdast';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkDirective);

export function toMdast(markdown: string): Root {
  return processor.parse(markdown);
}
