import type { Project } from '../../data/projects'
import { BTreeLab } from './BTreeLab'
import { DocuPipeline } from './DocuPipeline'
import { HazardRadar } from './HazardRadar'
import { SeaPillars } from './SeaPillars'

export function ProjectStage({ project }: { project: Project }) {
  switch (project.id) {
    case 'docusense':
      return <DocuPipeline project={project} />
    case 'seasafe':
      return <SeaPillars />
    case 'aegis':
      return <HazardRadar />
    case 'btree':
      return <BTreeLab />
  }
}
