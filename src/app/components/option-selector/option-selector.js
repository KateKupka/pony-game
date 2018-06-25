import { Defer } from 'utils';

import click_sound from 'assets/sounds/click.mp3';
import screen_sound from 'assets/sounds/screen-off.mp3';

import css from './option-selector.scss';

export default class OptionSelector {

  selector_element = null;
  selected_version = [];
  total_value = 0;
  deffered = new Defer();
  config = null;

  constructor(config) {
    this.config = config;
    this.click_sound = new Audio(click_sound);
    this.screen_sound = new Audio(screen_sound);
    if (this.config.container) {
      this.selector_element = this.config.container;
    }
    this.buildTemplate();
    this.bindEvents();
  }

  /*
  * build and display options html
  */
  buildTemplate() {
    let html = `<section class="screen ${css.screen}">`;
    html += `<div id="${this.config.id}" class="${css.screen__buttons}">`;
    html += this.config.options.map((option) => (
      `<div class="${css.screen__button}" id="${option.id}">${option.label}</div>`
    )).join('');
    html += '</div>';
    html += '</section>';
    document.getElementById('content').innerHTML += html;
  }

  /*
  * bind options click events
  */
  bindEvents() {
    this.option_screen = document.getElementById(this.config.id).parentNode;
    document.getElementById(this.config.id).addEventListener('click', this.validateVersion);
  }

  /**
   * check if clicked element is one of the options
   * @param selected_id - string, id of clicked element
   */
  optionExists(selected_id) {
    return this.config.options.filter((option) => (option.id === selected_id)).length;
  }

  /*
  * return promise
  */
  async getVersion() {
    return this.deffered.promise;
  }

  /**
   * add selected option to array
   * increment total value based on selected option value
   * mark option as selected in html
   * @param selected_id - string, id of clicked element
   */
  setVersion(selected_id) {
    this.selected_version.push(selected_id);
    const value = this.config.options.filter((option) => (option.id === selected_id))[0].value;
    this.total_value += value || 1;
    document.getElementById(selected_id).classList.add(css['screen__button--selected']);
  }

  /**
   * remove deselected option from array
   * decrement total value based on selected option value
   * remove selected class from html
   * @param id_to_unset - string, id of deselected element
   */
  unsetVersion(id_to_unset) {
    document.getElementById(id_to_unset).classList.remove(css['screen__button--selected']);
    const value = this.config.options.filter((option) => (option.id === id_to_unset))[0].value;
    this.total_value -= value || 1;
    this.selected_version = this.selected_version.filter((version) => version !== id_to_unset);
  }

  /*
  * hide and destroy option selector screen
  */
  destroyScreen() {
    this.option_screen.classList.add('hide');

    setTimeout(() => {
      if (this.screen_sound.play) this.screen_sound.play();
    }, 1500);

    setTimeout(() => {
      this.option_screen.remove();
      this.deffered.resolve(this.selected_version);
    }, 2000);
  }

  /**
   * on option click
   * validate clicked option
   * set / unset selected option
   * finish selection process
   * @param e - click event
   */
  validateVersion = (e) => {
    this.click_sound.play();
    const selected_id = e.target.id;

    if (!this.optionExists(selected_id)) return;

    if (this.selected_version.includes(selected_id)) {
      this.unsetVersion(selected_id);
      return;
    }

    this.setVersion(selected_id);

    if (this.total_value === this.config.required) {
      this.destroyScreen();
    }
  }
}
