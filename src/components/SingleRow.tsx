import React, { useState, MouseEvent } from 'react';
import { Box, Typography, IconButton, Popover, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RowData, SymbolType } from '../store/useRowsStore';
import FormulaInput from './FormulaInput';

interface SingleRowProps {
  data: RowData;
  onDelete: () => void;
  onSymbolChange: (sym: SymbolType) => void;
  onNameChange: (text: string) => void;
}

const centerColumnStyle = {
  flex: 1,
  textAlign: 'center',
};

const SingleRow: React.FC<SingleRowProps> = ({
  data,
  onDelete,
  onSymbolChange,
  onNameChange,
}) => {
  const { symbol, name } = data;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tempName, setTempName] = useState(name);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setTempName(name);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    onNameChange(tempName);
    handleClosePopover();
  };

  const selectSymbol = (sym: SymbolType) => {
    onSymbolChange(sym);
  };

  const renderSecondColumn = () => {
    switch (symbol) {
      case '#':
        return <Typography>15k</Typography>;
      case '$':
        return <Typography>$15k</Typography>;
      case '%':
        return <Typography>15%</Typography>;
      case 'date':
        return <Typography>FEB '22</Typography>;
      default:
        return <Typography>—</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        p: 1,
        my: 1,
        minHeight: 40,
        position: 'relative',
        '&:hover .edit-delete-icons': { opacity: 1 },
      }}
    >
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Typography variant="body1">
          {symbol} {name}
        </Typography>
        <Box
          className="edit-delete-icons"
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0,
            transition: 'opacity 0.3s',
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton size="small" onClick={handleOpenPopover}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={centerColumnStyle}>{renderSecondColumn()}</Box>
      <Box sx={{ flex: 2 }}>
        <FormulaInput />
      </Box>
      <Box sx={centerColumnStyle}>
        <Typography>JAN'22</Typography>
      </Box>
      <Box sx={centerColumnStyle}>
        <Typography>FEB'22</Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2">Add symbol:</Typography>
          <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
            <Button variant="outlined" onClick={() => selectSymbol('#')}>
              #
            </Button>
            <Button variant="outlined" onClick={() => selectSymbol('$')}>
              $
            </Button>
            <Button variant="outlined" onClick={() => selectSymbol('%')}>
              %
            </Button>
            <Button variant="outlined" onClick={() => selectSymbol('date')}>
              date
            </Button>
          </Box>
          <TextField
            value={tempName}
            label="Change name"
            onChange={(e) => setTempName(e.target.value)}
            fullWidth
            size="small"
            sx={{ my: 1 }}
          />
          <Button variant="contained" onClick={handleSave} fullWidth>
            Save
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default SingleRow;
