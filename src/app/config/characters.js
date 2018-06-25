import * as characters from 'components/character-list/';

function getOptions() {
  const options = [{
    id: 'random',
    label: 'Random characters',
    value: 2,
  }];
  Object.keys(characters).map((character) => {
    options.push({
      id: character,
      label: characters[character].ponyName,
    });
  });
  return options;
}

export default {
  id: 'game-character',
  required: 2,
  options: getOptions(),
};
