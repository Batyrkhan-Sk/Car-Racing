export type SortColumn = 'id' | 'wins' | 'time';

export interface SortableHeaderProps {
  column: SortColumn;
  label: string;
  currentSort: SortColumn;
  sortOrder: 'ASC' | 'DESC';
  onSort: (column: SortColumn) => void;
}
