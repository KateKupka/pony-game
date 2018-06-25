import Skill from 'components/skill';

export default class GlitterStorm extends Skill {

  static skillName = 'Glitter Storm';

  applyStatChanges() {
    this.modified_stat_list = this.stat_list.map((stat, i) => {
      if (i !== this.current_player_index) stat.health -= 40 / 100 * stat.health;
      return stat;
    });
  }
}

