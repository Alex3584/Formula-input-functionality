import axios from 'axios';

const BASE_URL = 'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete';

export const fetchAutocompleteData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
