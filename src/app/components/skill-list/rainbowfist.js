import Skill from 'components/skill';
import { incrementByLevel } from 'utils/index';

export default class RainbowFist extends Skill {

  static skillName = 'Rainbow Fist';

  applyStatChanges() {
    const current_player_lvl = this.stat_list[this.current_player_index].lvl;
    const current_player_damage_mod = this.stat_list[this.current_player_index].damage_mod;
    const damage_dealt = incrementByLevel(0, current_player_lvl, current_player_damage_mod);

    this.modified_stat_list = this.stat_list.map((stat, i) => {
      if (i !== this.current_player_index) stat.health -= damage_dealt;
      return stat;
    });
  }
}

