import { Reveal } from './Reveal'

interface Props {
  index: string
  label: string
  title: string
  id: string
  lead?: string
}

export function SectionHead({ index, label, title, id, lead }: Props) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  )
}
