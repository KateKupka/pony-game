import css from './stat-view.scss';

export default class StatView {

  constructor(stat_name, stat_value, character_index) {
    this.id = `${stat_name}-${character_index}`;
    this.stat_name = stat_name;
    this.initial_stat_value = stat_value;
    this.current_stat_value = stat_value;
  }

  /**
   * return progress bar width
   * @param new_stat_value - number
   */
  getWidth(new_stat_value) {
    return `${(new_stat_value / this.initial_stat_value) * 100}%`;
  }

  /**
   * update stat view / html
   * @param new_stat_value - number
   */
  update(new_stat_value) {
    const skill_container = document.getElementById(this.id);

    if (this.stat_name === 'icon') {
      const icon_el = skill_container.getElementsByClassName('icon')[0];
      icon_el.classList.remove(this.current_stat_value);
      icon_el.classList.add(new_stat_value);
      this.current_stat_value = new_stat_value;
    } else {
      if (new_stat_value < 0) new_stat_value = 0;
      this.current_stat_value = new_stat_value;
      const skill_value_el = skill_container.getElementsByClassName(css.value__bar)[0];
      skill_value_el.style.width = this.getWidth(new_stat_value);
    }
  }

  /**
   * return stat html
   */
  getMarkup() {
    let html = `<div id="${this.id}">`;
    if (this.stat_name === 'icon') {
      html += '<div class="icon-container">';
      html += `<div class="icon ${this.initial_stat_value}"></div>`;
      html += '</div>';
    } else {
      html += `<div class="${css.value}">`;
      html += `<span class="${css.value__bar}"></span>`;
      html += '</div>';
    }
    html += '</div>';
    return html;
  }
}
