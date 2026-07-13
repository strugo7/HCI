/**
 * The block registry — the single seam between Knowledge Objects and React.
 *
 * The renderer's whole job is this lookup: given a Block, find the component
 * that draws it. Because the map is keyed by `BlockType` (derived from the
 * core schema), adding a DSL directive without giving it a component is a
 * TYPE ERROR, not a blank space on a student's screen.
 */
import type { ComponentType } from 'react';

import type { Block, BlockType } from '@cyberatlas/core';

/** Every block component receives exactly its own block, and nothing else. */
export type BlockComponentProps<T extends Block = Block> = {
  readonly block: T;
};

export type BlockComponent<T extends Block = Block> = ComponentType<BlockComponentProps<T>>;

/**
 * Exhaustive: every BlockType must map to a component.
 * Omitting one fails the build.
 */
export type BlockRegistry = {
  readonly [K in BlockType]: BlockComponent<Extract<Block, { type: K }>>;
};

/**
 * Renderers are pluggable — web, print, and future clients each supply their
 * own registry over the same Knowledge Objects.
 */
export function createRegistry(registry: BlockRegistry): BlockRegistry {
  return registry;
}

export function resolveBlockComponent<T extends Block>(
  registry: BlockRegistry,
  block: T,
): BlockComponent<Block> {
  return registry[block.type] as BlockComponent<Block>;
}
