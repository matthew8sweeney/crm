
/**
 * Function to compare options of an Autocomplete for getOptionSelected
 */
export const autocompleteOptionObjectCompare = (option, value) =>
  Object.keys(option).every((key) => option[key] === value[key]);
