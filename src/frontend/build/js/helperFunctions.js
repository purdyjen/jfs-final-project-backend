// Helper function to format name value and ensure uniform title casing across all products
// When function is called, it is passed a string argument
export const titleCase = (str) => {
  // Lowercases all characters
  str = str.toLowerCase();
  // Splits the string into an array containing the separate words (uses the space as the separating value)
  str = str.split(" ");

  // Uses a for loop to access each element (word) in the newly created array (str)
  for (let i = 0; i < str.length; i++) {
    // Accesses the first character in the string (word) and uppercases it
    // Slices (copies) any characters at index 1 and later (if any exist)
    // If no characters beyond index 0, it's fine because then the value is just "" (an empty string)
    // Finally, it concatenates the uppercased first character with the rest of the word and assigns as the new value for the current index
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" "); // Joins the new titlecased words back into a string and returns
};

// A function to ensure that the price has two numbers after the decimal by using the toFixed method
export const formatPrice = (price) => price.toFixed(2);
