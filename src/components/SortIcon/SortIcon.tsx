import { CSSProperties } from 'react'
import SortDirectionArrow from '@/assets/SortDirectionArrow.svg'
import SortArrows from '@/assets/SortArrows.svg'

type SortIconProps = {
  active: boolean
  direction?: 'asc' | 'desc'
  onClick: () => void
  className?: string
  style?: CSSProperties
}

export const SortIcon = ({ active, direction, onClick, className, style }: SortIconProps) => {
  return (
    <img
      src={active ? SortDirectionArrow : SortArrows}
      alt={active ? `Sorted ${direction}` : 'Sort'}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        rotate: active && direction === 'asc' ? '180deg' : '0deg',
        ...style,
      }}
      className={className}
    />
  )
}
