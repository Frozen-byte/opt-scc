import { DATE_ISO8601, Faction } from '../campaign/campaign.component';

interface BattleFaction extends Faction {
  factionBattleScore: number;
  factionAttackingSectors: number[];
  factionAttackedSectors: number[];
}

/**
 * @decided Battle lies in the past
 * @fighting currently ongoing battle
 * @planning next battle that has to be decided
 * @scheduled battles that lies in the future but next one
 */
export type BattleStatus = 'decided' | 'fighting' | 'planning' | 'scheduled';

export interface Battle {
  battleId: string;
  battleName: string;
  battleDate: DATE_ISO8601;
  battleStatus: BattleStatus;
  campaignName: string;
  campaignId: string;
  duration: number;
  weather: string;
  factions: BattleFaction[];
}
