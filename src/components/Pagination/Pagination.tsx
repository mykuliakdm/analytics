import { PAGINATION } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { IMeta } from '@/utils/types'

type PaginationProps = {
  meta: IMeta
  dataLength: number
  page: number
  onChange: (page: number) => void // eslint-disable-line no-unused-vars
}

const Pagination = ({ meta, dataLength, page, onChange }: PaginationProps) => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-x-6 bg-gray-100 py-2 px-2 md:px-8 gap-2 rounded-bl-lg rounded-br-lg">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {dataLength}
        </span>{' '}
        items of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {meta.totalCount}
        </span>{' '}
      </span>
      <div className="flex items-center gap-x-6">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Page{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {page}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.ceil(meta.totalCount / PAGINATION.LIMIT)}
          </span>{' '}
        </span>
        <div className="inline-flex gap-x-1">
          <Button
            variant="outline"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => onChange(page + 1)}
            disabled={page >= Math.ceil(meta.totalCount / PAGINATION.LIMIT)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
