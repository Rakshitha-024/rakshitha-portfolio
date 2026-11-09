import type { Status } from '../../data/projects'

const LABEL: Record<Status, string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  implemented: 'Implemented',
}

export function StatusChip({ status }: { status: Status }) {
  return <span className={`status status--${status}`}>{LABEL[status]}</span>
}
