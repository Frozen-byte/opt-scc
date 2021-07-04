import { DATE_ISO8601, Faction } from '../campaign/campaign.component';
import { SectorId } from '../../components/sector-select/sector-select.component';

export interface BattleFaction extends Faction {
  factionBattleScore: number;
  factionAttackingSector: SectorId;
}

/**
 * @decided Battle lies in the past
 * @fighting currently ongoing battle
 * @planning next battle that has to be decided
 * @scheduled battles that lies in the future but next one
 */
export type BattleStatus = 'decided' | 'fighting' | 'planning' | 'scheduled';

export type BattleId = string;

export interface Battle {
  battleId: BattleId;
  battleName: string;
  battleDate: DATE_ISO8601;
  battleStatus: BattleStatus;
  campaignName: string;
  campaignId: string;
  battleDuration: number;
  weather: string;
  factions: Record<string, BattleFaction>; // string is FactionId. keyvalue pipe does not work with PartialRecord typings
}
