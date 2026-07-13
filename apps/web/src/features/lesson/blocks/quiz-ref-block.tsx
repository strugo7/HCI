import { ClipboardList } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Block } from '@cyberatlas/core';

import { quizPath } from '@/router/routes';

interface QuizRefBlockProps {
  readonly block: Extract<Block, { type: 'quiz-reference' }>;
}

/**
 * A lesson points at its quiz; it never inlines one. The ref is the quiz's id,
 * which is exactly what the quiz route is keyed by.
 */
export function QuizRefBlock({ block }: QuizRefBlockProps): ReactNode {
  return (
    <Link
      to={quizPath(block.ref)}
      className="my-6 flex items-center gap-3 rounded-xl border-2 border-primary/15 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ClipboardList className="size-6 shrink-0 text-primary" aria-hidden />
      <div>
        <p className="font-semibold text-primary">בדקו את עצמכם</p>
        <p className="text-sm text-muted-foreground">חידון על השיעור — לחצו כדי להתחיל</p>
      </div>
    </Link>
  );
}
