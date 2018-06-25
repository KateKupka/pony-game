import Skill from 'components/skill';
import { coinFlip } from 'utils/index';

export default class Hoofbeat extends Skill {

  static skillName = 'Hoofbeat';

  applyStatChanges() {
    if (coinFlip()) {
      this.modified_stat_list = this.stat_list.map((stat, i) => {
        if (i !== this.current_player_index) stat.health = 1;
        return stat;
      });
    }
  }
}
