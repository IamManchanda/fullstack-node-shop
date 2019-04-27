// Util - convertToKebabCase 
// Source: https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2183914
const convertToKebabCase = title => title
  .replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
  .replace(/[\s_]+/g, '-')  // replace all spaces and low dash
  .toLowerCase();  // convert to lower case

module.exports = convertToKebabCase;
