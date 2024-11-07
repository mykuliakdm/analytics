import { ReactNode } from 'react'
import styles from './FormLayout.module.scss'

const FormLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles['layout']}>{children}</div>
}

export default FormLayout
