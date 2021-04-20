import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  public campaignName = 'Aufstand des Lumpenproletatiats';
  public battles: { battleName: string, battleId: string }[] = [
    {battleId: 'adl-schlacht-1', battleName: 'Schlacht #1 - Kampagnenbegin', },
    {battleId: 'adl-schlacht-2', battleName: 'Schlacht #2', },
    {battleId: 'adl-schlacht-3', battleName: 'Schlacht #3', },
    {battleId: 'adl-schlacht-4', battleName: 'Schlacht #4', },
    {battleId: 'adl-schlacht-5', battleName: 'Schlacht #5', },
    {battleId: 'adl-schlacht-6', battleName: 'Schlacht #6', },
    {battleId: 'adl-schlacht-7', battleName: 'Schlacht #7', },
    {battleId: 'adl-schlacht-1-seitenwechsel', battleName: 'Schlacht #1 - Seitenwechsel', },
    {battleId: 'adl-schlacht-2-1', battleName: 'Schlacht #2', },
    {battleId: 'adl-schlacht-3-1', battleName: 'Schlacht #3', },
    {battleId: 'adl-schlacht-4-1', battleName: 'Schlacht #4', },
    {battleId: 'adl-schlacht-5-1', battleName: 'Schlacht #5', },
    {battleId: 'adl-schlacht-6-1', battleName: 'Schlacht #6', },
    {battleId: 'adl-schlacht-7-finalschlacht', battleName: 'Schlacht #7 - Finalschlacht', },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
