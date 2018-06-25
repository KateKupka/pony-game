import { getRandomNumber, getUniqueNumbers, incrementByLevel, Defer, wait } from 'utils';

import attack_sound from 'assets/sounds/attack.mp3';

import CharacterView from 'components/character-view';
import * as skills from 'components/skill-list';

export default class Character {

  deffered = new Defer();

  stat = {
    lvl: 0,
    min_level: 1,
    max_level: 10,
    base_health: 14,
    health: 0,
    total_health: 0,
    health_mod: null,
    is_dead: false,
    damage_mod: null,
    icon: null,
  }

  is_active = false;
  is_bot = false;
  skill_list = [];
  view = null;

  constructor(config, index) {
    this.stat = Object.assign(this.stat, this.constructor.config);
    this.config = config;
    this.index = index;
    this.attack_sound = new Audio(attack_sound);
    this.setInitialStats();
    this.assignSkills();
    this.buildView();
  }

  /**
   * toggle character's active state
   * @param is_active - bool
   */
  setActive(is_active) {
    this.is_active = is_active;
    this.view.updateView(this);
  }

  /**
   * assign initial stats
   */
  setInitialStats() {
    this.is_bot = ((this.config.mode === 'eve') || (this.config.mode === 'pve' && this.index === 1));
    this.stat.lvl = this.config.lvl === 'random' ?
      getRandomNumber(this.stat.min_level, this.stat.max_level) : this.stat.min_level;
    this.stat.total_health = incrementByLevel(this.stat.base_health, this.stat.lvl, this.stat.health_mod);
    this.stat.health = this.stat.total_health;
    this.stat.icon = (`basic-${this.constructor.ponyName}`).toLowerCase().replace(/\s/g,'');
  }

  /**
   * initialize character view
   */
  buildView() {
    this.view = new CharacterView(this);
  }

  /**
   * assign skills
   */
  assignSkills() {
    const skill_list = Object.keys(skills);
    const number_list = getUniqueNumbers(0, skill_list.length - 1, [], 3);
    this.skill_list = number_list.map((number) => (
      skills[skill_list[number]]
    ));
    this.skill_list_len = this.skill_list.length;
  }

  /**
   * returns random skill for AI
   */
  async getRandomSkill() {
    await wait(1000);
    this.attack_sound.play();
    this.deffered.resolve(this.skill_list[getRandomNumber(0, this.skill_list_len - 1)]);
  }

  /**
   * returns skill selected by player
   */
  async getChosenSkill() {
    const chosen_skill = await this.view.getChosenSkill();
    this.attack_sound.play();
    this.deffered.resolve(chosen_skill);
  }

  /**
   * trigger skill selection method based on player type
   */
  async getSkill() {
    if (this.is_bot) this.getRandomSkill();
    else this.getChosenSkill();
    return this.deffered.promise;
  }

  /**
   * updates view with modified stat list
   * @param new_stat_list - arr
   */
  update(new_stat_list) {
    this.stat = new_stat_list;
    this.view.updateView(this);
  }

  /**
   * create new promise
   */
  finishRound() {
    this.deffered = new Defer();
    this.view.deffered = new Defer();
  }
}
