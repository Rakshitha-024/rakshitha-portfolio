/** Minimal immutable B-Tree (max 3 keys per node) used by the illustrative demo. */
export interface BNode {
  id: number
  keys: number[]
  children: BNode[]
}

export const MAX_KEYS = 3
let uid = 0
const make = (keys: number[], children: BNode[] = []): BNode => ({ id: ++uid, keys, children })

interface Split {
  median: number
  left: BNode
  right: BNode
}
type Result = { node: BNode; split?: undefined } | { split: Split; node?: undefined }

function ins(node: BNode, key: number): Result {
  if (node.keys.includes(key)) return { node }
  const leaf = node.children.length === 0
  let keys = node.keys
  let children = node.children

  if (leaf) {
    keys = [...keys, key].sort((a, b) => a - b)
  } else {
    let i = keys.findIndex((k) => key < k)
    if (i === -1) i = keys.length
    const r = ins(children[i], key)
    if (r.split) {
      keys = [...keys.slice(0, i), r.split.median, ...keys.slice(i)]
      children = [...children.slice(0, i), r.split.left, r.split.right, ...children.slice(i + 1)]
    } else {
      children = children.map((c, idx) => (idx === i ? r.node : c))
    }
  }

  if (keys.length > MAX_KEYS) {
    const mid = Math.floor(keys.length / 2)
    return {
      split: {
        median: keys[mid],
        left: make(keys.slice(0, mid), children.slice(0, mid + 1)),
        right: make(keys.slice(mid + 1), children.slice(mid + 1)),
      },
    }
  }
  return { node: { ...node, keys, children } }
}

export function insert(root: BNode | null, key: number): BNode {
  if (!root) return make([key])
  const r = ins(root, key)
  return r.split ? make([r.split.median], [r.split.left, r.split.right]) : r.node
}

export function levels(root: BNode | null): BNode[][] {
  if (!root) return []
  const out: BNode[][] = []
  let row = [root]
  while (row.length) {
    out.push(row)
    row = row.flatMap((n) => n.children)
  }
  return out
}

export const countNodes = (root: BNode | null): number =>
  root ? 1 + root.children.reduce((s, c) => s + countNodes(c), 0) : 0
