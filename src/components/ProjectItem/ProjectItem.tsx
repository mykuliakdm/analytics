import styles from './ProjectItem.module.scss'

export default function ProjectItem() {
  return (
    <div className={styles['project']}>
      <div className={styles['project-row']}>
        <div className={styles['project-row-box']}>
          <p className="m-0">Title</p>
        </div>
        <div className={styles['project-row-box']}>
          <p className="m-0">URL</p>
        </div>
      </div>
    </div>
  )
}
