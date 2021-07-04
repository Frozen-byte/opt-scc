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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { Player } from '../services/steam-auth.service';
import { PlayerService } from '../services/player.service';
import { isDefinedGuard } from '../toolbelt';

export type PLAYER_ROLE =
  | 'admin'
  | 'eventManager'
  | 'armyCommand'
  | 'squadLead'
  | 'soldier'
  | 'recruit'
  | 'guest';

export enum PLAYER_ROLE_WEIGHT {
  admin = 1000,
  eventManager = 900,
  armyCommand = 500,
  squadLead = 200,
  soldier = 100,
  recruit = 99,
  guest = 1,
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
    public playerService: PlayerService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.optHasPlayerRole$
      .pipe(
        switchMap(({ campaignId }) =>
          this.playerService.getLoggedInPlayer(campaignId)
        ),
        filter(isDefinedGuard),
        pluck<Player, Player['role']>('role'),
        withLatestFrom(this.optHasPlayerRole$),
        untilDestroyed(this)
      )
      .subscribe(([playerRole, { minimumRole }]) => {
        this.viewContainer.clear();

        if (PLAYER_ROLE_WEIGHT[playerRole] >= PLAYER_ROLE_WEIGHT[minimumRole]) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optHasPlayerRole$.emit(changes.optHasPlayerRole?.currentValue);
  }
}
