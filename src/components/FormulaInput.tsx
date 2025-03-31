import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { TextField, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAutocompleteData } from '../api/autocompleteApi';

interface AutocompleteItem {
  id: string;
  name: string;
  category: string;
  value: string | number;
}

interface FormulaInputProps {
  placeholder?: string;
}

const FormulaInput: React.FC<FormulaInputProps> = ({ placeholder }) => {
  const [formulaText, setFormulaText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [partialTokenStart, setPartialTokenStart] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: suggestions = [] } = useQuery<AutocompleteItem[], Error>({
    queryKey: ['autocompleteData'],
    queryFn: fetchAutocompleteData,
  }) as { data: AutocompleteItem[] };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormulaText(value);

    const selectionStart = e.target.selectionStart ?? 0;
    setCursorPos(selectionStart);

    const lastChar = value.slice(selectionStart - 1, selectionStart);
    const isLetter = /^[A-Za-zА-Яа-я]$/.test(lastChar);

    if (isLetter) {
      let start = selectionStart - 1;
      while (start > 0) {
        const c = value[start - 1];
        if (/[+\-*/()^= ]/.test(c)) {
          break;
        }
        start--;
      }
      setPartialTokenStart(start);
      setShowDropdown(true);
    } else {
      setPartialTokenStart(null);
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (item: AutocompleteItem) => {
    if (partialTokenStart === null) return;
    const textBefore = formulaText.slice(0, partialTokenStart);
    const textAfter = formulaText.slice(cursorPos);
    const newText = textBefore + item.name + textAfter;

    setFormulaText(newText);
    setShowDropdown(false);

    const newCursorPos = textBefore.length + item.name.length;
    setCursorPos(newCursorPos);
    setPartialTokenStart(null);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      setPartialTokenStart(null);
    }
  };

  const handleMouseDownSuggestion = (evt: MouseEvent) => {
    evt.preventDefault();
  };

  let filtered: AutocompleteItem[] = [];
  if (showDropdown && partialTokenStart !== null) {
    const token = formulaText.slice(partialTokenStart, cursorPos).toLowerCase();
    filtered = Array.isArray(suggestions)
      ? suggestions.filter((s) => s.name.toLowerCase().includes(token))
      : [];
  }

  return (
    <Box position="relative">
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || '∫ Enter formula'}
        value={formulaText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        onFocus={(e) => {
          if (!formulaText) {
            e.target.placeholder = '= Enter formula';
          }
        }}
        onBlur={(e) => {
          if (!e.target.value) {
            e.target.placeholder = '∫ Enter formula';
          }
        }}
      />

      {showDropdown && filtered.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            maxHeight: 240,
            overflowY: 'auto',
            zIndex: 10,
            mt: 0.5,
          }}
        >
          <List>
            {filtered.map((item) => (
              <ListItem
                key={item.id}
                onMouseDown={handleMouseDownSuggestion}
                onClick={() => handleSelectSuggestion(item)}
              >
                <ListItemText
                  primary={item.name}
                  secondary={item.category}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FormulaInput;
