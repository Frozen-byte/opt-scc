import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { Player, SteamAuthService } from './services/steam-auth.service';

export type PLAYER_ROLE =
  | 'admin'
  | 'eventManager'
  | 'armyCommand'
  | 'squadLead'
  | 'soldier'
  | 'guest';

export enum PLAYER_ROLE_WEIGHT {
  admin = 1000,
  eventManager = 900,
  armyCommand = 500,
  squadLead = 200,
  soldier = 100,
  guest = 99,
}

interface OptHasPlayerRole {
  minimumRole: PLAYER_ROLE;
  campaignId: string;
}

@UntilDestroy()
@Directive({
  selector: '[optHasPlayerRole]',
})
export class HasPlayerRoleDirective implements OnChanges {
  @Input() optHasPlayerRole?: OptHasPlayerRole;
  private optHasPlayerRole$ = new EventEmitter<OptHasPlayerRole>();

  constructor(
    public steamAuth: SteamAuthService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.optHasPlayerRole$
      .pipe(
        switchMap(({ campaignId }) =>
          this.steamAuth.getLoggedInPlayer(campaignId)
        ),
        pluck<Player | null, Player['role']>('role'),
        withLatestFrom(this.optHasPlayerRole$),
        untilDestroyed(this)
      )
      .subscribe(([playerRole, { minimumRole }]) => {
        if (PLAYER_ROLE_WEIGHT[playerRole] >= PLAYER_ROLE_WEIGHT[minimumRole]) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optHasPlayerRole$.emit(changes.optHasPlayerRole?.currentValue);
    this.optHasPlayerRole$.emit(
      changes.optHasPlayerRoleCampaignId?.currentValue
    );
  }
}
