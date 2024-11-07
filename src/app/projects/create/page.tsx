import FormLayout from '@/components/FormLayout/FormLayout'
import ProjectCreateForm from '@/forms/ProjectCreate/ProjectCreateForm'
import Container from '@/components/Container/Container'

export default function ProjectCreate() {
  return (
    <Container>
      <FormLayout>
        <ProjectCreateForm />
      </FormLayout>
    </Container>
  )
}
