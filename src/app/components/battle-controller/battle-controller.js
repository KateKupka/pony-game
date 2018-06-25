import { wait, Defer } from 'utils';

import change_player_sound from 'assets/sounds/player-change.mp3';
import finish_game_sound from 'assets/sounds/finish-game.mp3';

import css from './battle-controller.scss';

export default class BattleController {

  player_list = [];
  current_player_index = null;
  loser_index = null;
  deffered = new Defer();

  constructor(player_list) {
    this.player_list = player_list;
    this.change_player_sound = new Audio(change_player_sound);
    this.finish_game_sound = new Audio(finish_game_sound);
    this.buildBattleground();
    this.showCharacters();
    this.changePlayer();
  }

  /**
   * build and show battleground screen html
   */
  buildBattleground() {
    let html = `<section class="screen ${css.screen}">`;
    html += `<div id="battleground" class="${css.battleground}">`;
    html += '</div>';
    html += '</section>';
    document.getElementById('content').innerHTML += html;
  }

  /**
   * show characters on screen
   */
  showCharacters() {
    this.player_list.map((character) => {
      character.view.displayCharacter();
      return character;
    });
  }

  /**
   * mark active character
   * get character's selected skill
   * get modified stats
   */
  async startRound() {
    await wait(2000);
    this.change_player_sound.play();
    this.player_list.map((player, index) => (player.setActive(index === this.current_player_index)));
    const Skill = await this.player_list[this.current_player_index].getSkill();
    const stat_list = this.player_list.map((player) => player.stat);
    const skill = new Skill(stat_list, this.current_player_index);
    const modified_stat_list = skill.getModifiedStats();
    this.applyChanges(modified_stat_list);
  }

  /**
   * update character's view with modified stats
   * @param modified_stat_list - arr
   */
  applyChanges(modified_stat_list) {
    this.player_list.map((player, i) => {
      player.update(modified_stat_list[i]);
      if (modified_stat_list[i].is_dead) this.loser_index = i;
      return player;
    });
    if (this.loser_index !== null) {
      this.finishGame(this.loser_index);
      return;
    }
    this.finishRound();
  }

  /**
   * finish battle
   * @param loser_index - number
   */
  async finishGame(loser_index) {
    this.resetSkills();
    const winner = this.player_list.filter((player, index) => (index !== loser_index));
    this.finish_game_sound.play();
    winner[0].view.spinImage();
    await wait(2000);
    document.getElementById('battleground').parentNode.classList.add('hide');
    await wait(3000);
    this.deffered.resolve();
    this.deffered = new Defer();
  }

  finishRound() {
    this.resetSkills();
    this.changePlayer();
  }

  onFinishGame() {
    return this.deffered.promise;
  }

  /**
   * notify characters that round has finished
   */
  resetSkills() {
    this.player_list[this.current_player_index].finishRound();
  }

  /**
   * assign current player
   */
  changePlayer() {
    if (this.current_player_index === this.player_list.length - 1 || this.current_player_index === null) {
      this.current_player_index = 0;
    } else this.current_player_index++;
    this.startRound();
  }
}
