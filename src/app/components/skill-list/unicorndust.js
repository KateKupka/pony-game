import Skill from 'components/skill';
import { incrementByLevel } from 'utils/index';

export default class UnicornDust extends Skill {

  static skillName = 'Unicorn Dust';

  applyStatChanges() {
    const { lvl, health_mod, total_health, health } = this.stat_list[this.current_player_index];
    const health_to_add = incrementByLevel(0, lvl, health_mod);
    const health_sum = health_to_add + health;
    this.modified_stat_list[this.current_player_index].health = health_sum >= total_health ? total_health : health_sum;
  }
}
