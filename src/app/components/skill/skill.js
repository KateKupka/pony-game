import clone from 'lodash/cloneDeep';

export default class Skill {

  constructor(stat_list, current_player_index) {
    this.stat_list = stat_list;
    this.current_player_index = current_player_index;
    this.modified_stat_list = clone(stat_list);
    this.applyStatChanges();
  }

  /**
   * return modified stats
   */
  getModifiedStats() {
    this.modified_stat_list.map((player_stat_list) => {
      if (player_stat_list.health <= 0) {
        player_stat_list.is_dead = true;
        player_stat_list.icon = player_stat_list.icon.replace('basic', 'dead');
        return player_stat_list;
      }
    });
    return this.modified_stat_list;
  }
}
