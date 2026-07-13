/**
 * Block renderer — given a Block knowledge object, delegates to the
 * appropriate component. This is the single seam between parsed content
 * and the React UI.
 */
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { AnalogyBlock } from './analogy-block';
import { CalloutBlock } from './callout-block';
import { CodeBlock } from './code-block';
import { DefinitionBlock } from './definition-block';
import { ExampleBlock } from './example-block';
import { FlashcardsRefBlock } from './flashcards-ref-block';
import { HeadingBlock } from './heading-block';
import { KeyPointsBlock } from './keypoints-block';
import { ListBlock } from './list-block';
import { MediaBlock } from './media-block';
import { ObjectivesBlock } from './objectives-block';
import { ParagraphBlock } from './paragraph-block';
import { QuizRefBlock } from './quiz-ref-block';
import { ReferencesBlock } from './references-block';
import { SelfCheckBlock } from './selfcheck-block';
import { SummaryBlock } from './summary-block';
import { TableBlock } from './table-block';

interface BlockRendererProps {
  readonly block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps): ReactNode {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} />;
    case 'paragraph':
      return <ParagraphBlock block={block} />;
    case 'list':
      return <ListBlock block={block} />;
    case 'table':
      return <TableBlock block={block} />;
    case 'code':
      return <CodeBlock block={block} />;
    case 'definition':
      return <DefinitionBlock block={block} />;
    case 'example':
      return <ExampleBlock block={block} />;
    case 'analogy':
      return <AnalogyBlock block={block} />;
    case 'callout':
      return <CalloutBlock block={block} />;
    case 'media':
      return <MediaBlock block={block} />;
    case 'objectives':
      return <ObjectivesBlock block={block} />;
    case 'keypoints':
      return <KeyPointsBlock block={block} />;
    case 'selfcheck':
      return <SelfCheckBlock block={block} />;
    case 'summary':
      return <SummaryBlock block={block} />;
    case 'references':
      return <ReferencesBlock block={block} />;
    case 'quiz-reference':
      return <QuizRefBlock block={block} />;
    case 'flashcards-reference':
      return <FlashcardsRefBlock block={block} />;
    default:
      return null;
  }
}

interface BlocksRendererProps {
  readonly blocks: readonly Block[];
}

/** Renders a sequence of blocks. */
export function BlocksRenderer({ blocks }: BlocksRendererProps): ReactNode {
  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
