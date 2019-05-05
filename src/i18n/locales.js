import fr from './translations/fr.json';

// English is the default message in each of our source files, so no need for a separate en.json file
const en = {};

// If we add more than just french, just import the files and export it below: export default { en, fr, de }
export default { en, fr };