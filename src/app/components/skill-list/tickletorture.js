import Skill from 'components/skill';

export default class TickleTorture extends Skill {

  static skillName = 'Tickle Torture';

  applyStatChanges() {
    this.modified_stat_list = this.stat_list.map((stat, i) => {
      if (i !== this.current_player_index) stat.health -= 10 / 100 * stat.health;
      return stat;
    });
  }
}

