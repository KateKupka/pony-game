import { characters_cfg } from 'config';
import { getUniqueNumbers, Defer } from 'utils';

import * as characters from 'components/character-list';
import OptionSelector from 'components/option-selector';

export default class CharactersSelector {

  deffered = new Defer();
  config = null;

  constructor(config) {
    this.config = config;
    this.createCharacterSelector();
  }

  /**
   * create options selector
   * pass selected characters to be initialized
   */
  async createCharacterSelector() {
    const characters_selector = new OptionSelector(characters_cfg);
    const selected_characters = await characters_selector.getVersion();
    const selected_character_list = selected_characters[0] === 'random' ? this.getRandomCharacters() : selected_characters;
    this.initializeCharacters(selected_character_list);
  }

  /**
   * return list of random characters
   */
  getRandomCharacters() {
    const character_list = Object.keys(characters);
    const selected_number_list = getUniqueNumbers(0, character_list.length - 1, [], 2);
    return selected_number_list.map((number) => (
      character_list[number]
    ));
  }

  /**
  * initialize characters
   * resolve promise with selected characters
  * @param selected_character_list - arr of character names
  */
  initializeCharacters(selected_character_list) {
    const character_instance_list = selected_character_list.map((selected_character, index) => (
      new characters[selected_character](this.config, index)
    ));
    this.deffered.resolve(character_instance_list);
  }

  async getCharacters() {
    return this.deffered.promise;
  }
}
