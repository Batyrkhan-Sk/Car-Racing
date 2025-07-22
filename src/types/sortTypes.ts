export type SortColumn = 'id' | 'wins' | 'time';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface SortableHeaderProps {
  column: SortColumn;
  label: string;
  currentSort: SortColumn | null;
  sortOrder: 'ASC' | 'DESC';
  onSort: (column: SortColumn) => void;
}

export interface WinnersTableRowProps {
  winner: Winner;
  car?: {
    id: number;
    name: string;
    color: string;
  };
}