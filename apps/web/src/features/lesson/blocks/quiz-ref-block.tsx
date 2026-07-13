import { ClipboardList } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';
import { Link } from 'react-router-dom';

interface QuizRefBlockProps {
  readonly block: Extract<Block, { type: 'quiz-reference' }>;
}

export function QuizRefBlock({ block }: QuizRefBlockProps): ReactNode {
  return (
    <Link
      to={`/practice?quiz=${block.ref}`}
      className="my-6 flex items-center gap-3 rounded-xl border-2 border-primary/15 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10"
    >
      <ClipboardList className="size-6 text-primary" aria-hidden />
      <div>
        <p className="font-semibold text-primary">בדקו את עצמכם</p>
        <p className="text-sm text-muted-foreground">
          חידון {block.ref} — לחצו כדי להתחיל
        </p>
      </div>
    </Link>
  );
}
