import { useState } from 'react'
import { motion } from 'motion/react'
import { Dices, RotateCcw } from 'lucide-react'
import { countNodes, insert, levels, MAX_KEYS, type BNode } from '../../lib/btree'
import { useSound } from '../../lib/sound'

const LIMIT = 30

/** Interaction: a real, working B-Tree. Insert keys and watch nodes split. */
export function BTreeLab() {
  const [root, setRoot] = useState<BNode | null>(null)
  const [last, setLast] = useState<number | null>(null)
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('Insert a number (1–99) to build the tree.')
  const { play } = useSound()
  const rows = levels(root)
  const total = rows.flat().reduce((s, n) => s + n.keys.length, 0)

  const add = (n: number) => {
    if (!Number.isInteger(n) || n < 1 || n > 99) return setMsg('Enter a whole number from 1 to 99.')
    if (rows.flat().some((x) => x.keys.includes(n))) return setMsg(`${n} is already in the tree.`)
    if (total >= LIMIT) return setMsg(`Demo limit reached (${LIMIT} keys). Reset to start again.`)
    const nodesBefore = countNodes(root)
    const next = insert(root, n)
    setRoot(next)
    setLast(n)
    play('click')
    setMsg(countNodes(next) > nodesBefore ? `Inserted ${n} — a node split to stay balanced.` : `Inserted ${n}.`)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    add(Number(value))
    setValue('')
  }
  const random = () => {
    for (let t = 0; t < 20; t++) {
      const n = 1 + Math.floor(Math.random() * 99)
      if (!rows.flat().some((x) => x.keys.includes(n))) return add(n)
    }
  }
  const reset = () => {
    setRoot(null)
    setLast(null)
    setMsg('Tree cleared. Insert a number to begin.')
    play('select')
  }

  return (
    <div className="stage stage--btree">
      <form className="bt-form" onSubmit={submit}>
        <label htmlFor="bt-input" className="mono">Key</label>
        <input id="bt-input" inputMode="numeric" type="number" min={1} max={99} value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 42" />
        <button type="submit" className="btn btn--small btn--primary">Insert</button>
        <button type="button" className="icon-btn" onClick={random} aria-label="Insert a random key" title="Insert random key"><Dices size={16} aria-hidden="true" /></button>
        <button type="button" className="icon-btn" onClick={reset} aria-label="Reset tree" title="Reset"><RotateCcw size={16} aria-hidden="true" /></button>
      </form>

      <div className="bt-canvas" role="img" aria-label={rows.length ? `B-Tree with ${total} keys across ${rows.length} levels` : 'Empty B-Tree'}>
        {rows.length === 0 && <p className="bt-empty mono">empty tree</p>}
        {rows.map((row, ri) => (
          <div key={ri}>
            <span className="bt-level mono" aria-hidden="true">
              {ri === 0 ? 'root' : ri === rows.length - 1 ? 'leaves' : `level ${ri + 1}`}
            </span>
            <div className="bt-row">
            {row.map((node) => (
              <motion.div layout key={node.id} className="bt-node" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                {node.keys.map((k) => (
                  <span key={k} className={`bt-key ${k === last ? 'is-new' : ''}`}>{k}</span>
                ))}
              </motion.div>
            ))}
            </div>
          </div>
        ))}
      </div>

      <p className="bt-msg" aria-live="polite">{msg}</p>
      <p className="stage-note mono">
        {total} keys · {rows.length} levels · max {MAX_KEYS} keys per node · illustrative demo, not project benchmark data
      </p>
    </div>
  )
}
