export interface InvestorsProps {
  icon: React.FC
  borderColor?: string
  gridSettings?: InvestorItemGrid
}

interface InvestorItemGridSettings {
  rowSpan?: number
  colSpan?: number
}

interface InvestorItemGrid {
  mobile?: InvestorItemGridSettings
  desktop?: InvestorItemGridSettings
}

export interface TractionStats {
  title: string
  value: string
}

export interface RoadmapItem {
  quarter: string
  circleIcon: React.FC
  actions: string[]
  checkboxColor?: 'Green' | 'Purple' | 'Blue'
}
