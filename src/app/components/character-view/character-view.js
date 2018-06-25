import { Defer } from 'utils/index';
import StatView from 'components/stat-view';

import styles from './character-view.scss';

export default class CharacterView {

  deffered = new Defer();
  skill_selector_el = null;
  character = null;
  stats_instances = [];
  stat_to_show_list = ['icon', 'health'];

  constructor(character) {
    this.index = character.index;
    this.character = character;
  }

  /**
   * display character's html
   */
  displayCharacter() {
    this.buildContainer();
    document.getElementById(`char-${this.index}`).innerHTML = this.getCharacterMarkup();
  }

  /**
   * return character's html
   */
  getCharacterMarkup() {
    let html = '<div>';
    this.stat_to_show_list.map((stat_to_show) => {
      const stat_view = new StatView(stat_to_show, this.character.stat[stat_to_show], this.index);
      this.stats_instances.push(stat_view);
      html += stat_view.getMarkup();
      return stat_to_show;
    });
    html += `<div>Name: ${this.character.constructor.ponyName}</div>`;
    html += `<div>Level: ${this.character.stat.lvl}</div>`;
    html += `<div class="${styles.character__skill_selector}" id="skill-selector-${this.index}">`;
    html += this.character.skill_list.map((skill) => (
      `<div class="${styles.character__skill}" id="${skill.name}">${skill.skillName}</div>`
    )).join('');
    html += '</div></div>';
    return html;
  }

  /**
   * display character's wrapper
   */
  buildContainer() {
    const html = `<div id="char-${this.index}" class="${styles.character}"></div>`;
    document.getElementById('battleground').innerHTML += html;
  }

  /**
   * handle skill click
   * @param e - click event
   */
  handleSkillClick = (e) => {
    const selected_skill_id = e.target.id;
    const selected_skill = this.character.skill_list.filter((skill) => (skill.name === selected_skill_id));
    if (selected_skill.length) {
      this.skill_selector_el.removeEventListener('click', this.handleSkillClick);
      this.deffered.resolve(selected_skill[0]);
    }
  }

  /**
   * bind skill selector click events
   */
  bindEvents() {
    this.skill_selector_el = document.getElementById(`skill-selector-${this.index}`);
    this.skill_selector_el.addEventListener('click', this.handleSkillClick);
  }

  /**
   * return promise
   */
  async getChosenSkill() {
    this.bindEvents();
    return this.deffered.promise;
  }

  /**
   * update stat view if they've changed
   */
  updateStats() {
    this.stats_instances.map((stat) => {
      const stat_name = stat.stat_name;
      if (this.character.stat[stat_name] !== stat.current_stat_value) {
        stat.update(this.character.stat[stat_name]);
      }
    });
  }

  /**
   * add spin class to winner character in order to animate it
   */
  spinImage() {
    document.getElementById(`char-${this.index}`).classList.add('spin');
  }

  /**
   * toggle character active class
   * reassign character instance and trigger update stats
   * @param character - character instance
   */
  updateView(character) {
    document.getElementById(`char-${this.index}`).classList.toggle(styles.character__active, character.is_active);
    this.character = character;
    this.updateStats();
  }
}
