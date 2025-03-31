import {create} from 'zustand';

export type SymbolType = '#' | '$' | '%' | 'date';

export interface RowData {
  id: number;
  symbol: SymbolType;
  name: string;
}

interface RowsStore {
  rows: RowData[];
  addRow: () => void;
  deleteRow: (id: number) => void;
  changeSymbol: (id: number, symbol: SymbolType) => void;
  changeName: (id: number, newName: string) => void;
}

export const useRowsStore = create<RowsStore>((set) => ({
  rows: [
    {
      id: 1,
      symbol: '#',
      name: 'New variable',
    },
  ],
  addRow: () =>
    set((state) => {
      const newId = state.rows.length
        ? state.rows[state.rows.length - 1].id + 1
        : 1;
      return {
        rows: [
          ...state.rows,
          {
            id: newId,
            symbol: '#',
            name: 'New variable',
          },
        ],
      };
    }),
  deleteRow: (id) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
  changeSymbol: (id, symbol) =>
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, symbol } : row
      ),
    })),
  changeName: (id, newName) =>
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, name: newName } : row
      ),
    })),
}));
