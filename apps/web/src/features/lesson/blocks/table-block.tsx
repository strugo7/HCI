import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

interface TableBlockProps {
  readonly block: Extract<Block, { type: 'table' }>;
}

export function TableBlock({ block }: TableBlockProps): ReactNode {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {block.headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-start font-semibold text-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b last:border-0 transition-colors hover:bg-muted/30"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-foreground/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
