import axios from 'axios';
export interface AutocompleteItem {
  id: string;
  name: string;
  category: string;
  value: string | number;
}

const BASE_URL = 'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete';

export const fetchAutocompleteData = async (): Promise<AutocompleteItem[]> => {
  const response = await axios.get<AutocompleteItem[]>(BASE_URL);
  return response.data;
};