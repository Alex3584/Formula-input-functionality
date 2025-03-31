import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import RowsTable from '../components/RowsTable';

const MainPage: React.FC = () => {
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Formula input functionality
      </Typography>

      {!showTable && (
        <Button variant="contained" onClick={handleClick}>
          # New variable
        </Button>
      )}

      {showTable && <RowsTable />}
    </Box>
  );
};

export default MainPage;
