import { modes_cfg, levels_cfg } from 'config';

import Intro from 'components/intro';
import OptionSelector from 'components/option-selector';
import CharactersSelector from 'components/character-selector';
import BattleController from 'components/battle-controller';

import './../styles/index.scss';

export default class App {

  constructor() {
    this.bindEvents();
    this.playIntro();
  }

  /*
  * play intro and initialize game components
  */
  async playIntro() {
    this.intro = new Intro();
    await this.intro.play();
    this.buildGameComponents();
  }

  /*
  * clear html and events and restart game
  */
  restartGame = () => {
    document.getElementById('content').innerHTML = '';
    this.intro.reject();
    this.playIntro();
  }

  /*
  * bind refresh event
  */
  bindEvents() {
    const restart_button = document.getElementById('refresh');
    restart_button.addEventListener('click', this.restartGame);
  }

  /*
  * manage game steps
  */
  async buildGameComponents() {

    // build game mode selector
    const mode_selector = new OptionSelector(modes_cfg);
    const mode = await mode_selector.getVersion();

    // build level selector
    const level_selector = new OptionSelector(levels_cfg);
    const level = await level_selector.getVersion();

    // build character selector
    const character_selector = new CharactersSelector({
      mode: mode[0],
      lvl: level[0],
    });

    const character_list = await character_selector.getCharacters();

    // initialize battle
    const battle_controller = new BattleController(character_list);
    await battle_controller.onFinishGame();

    // restart game
    this.restartGame();
  }
}

new App();
