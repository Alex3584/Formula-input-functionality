import React from 'react';
import { Button, Box } from '@mui/material';
import { useRowsStore } from '../store/useRowsStore';
import SingleRow from './SingleRow';

const RowsTable: React.FC = () => {
  const rows = useRowsStore((state) => state.rows);
  const addRow = useRowsStore((state) => state.addRow);
  const deleteRow = useRowsStore((state) => state.deleteRow);
  const changeSymbol = useRowsStore((state) => state.changeSymbol);
  const changeName = useRowsStore((state) => state.changeName);

  return (
    <Box>
      {rows.map((row) => (
        <SingleRow
          key={row.id}
          data={row}
          onDelete={() => deleteRow(row.id)}
          onSymbolChange={(sym) => changeSymbol(row.id, sym)}
          onNameChange={(newName) => changeName(row.id, newName)}
        />
      ))}
      <Button variant="text" onClick={addRow} sx={{ mt: 2 }}>
        + New variable
      </Button>
    </Box>
  );
};

export default RowsTable;
