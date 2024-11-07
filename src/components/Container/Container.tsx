import { ReactNode, FC } from 'react'

import classNames from 'classnames'

type ContainerProps = {
  className?: string
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'mx-auto w-full max-w-screen-2xl px-2.5 md:px-20 py-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Container
