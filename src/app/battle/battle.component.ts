import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  public battle: {
    battleName: string,
    battleId: string,
    campaignName: string,
    campaignId: string,
    battleDate: Date,
    duration: number,
    weather: string,
    factions: {
      factionName: string,
      factionId: string,
      factionSide: string,
      factionAttackingSectors: number[],
      factionAttackedSectors: number[],
    }[]
  } = {
    battleName: 'Schlacht #1',
    battleId: 'adl-schlacht-1',
    campaignName: 'Aufstand des Lumpenproletariats',
    campaignId: 'adl',
    battleDate: new Date('2021-04-19T19:30:00+02:00'),
    duration: 9000,
    weather: 'Spielzeit beginn: 12 Uhr, Bewölkt bis Heiter',
    factions: [{
      factionName: 'SWORD',
      factionId: 'sword',
      factionSide: 'AAF',
      factionAttackingSectors: [17],
      factionAttackedSectors: [11, 13, 14],
    },
      {
        factionName: 'ARF',
        factionId: 'arf',
        factionSide: 'CSAT',
        factionAttackingSectors: [14],
        factionAttackedSectors: [2, 23, 11],
      }
    ]
  };

  public battleParticipation: {} = {};

  constructor() {
  }

  ngOnInit(): void {
  }

}
