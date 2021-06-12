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
import { withLatestFrom } from 'rxjs/operators';

export type PLAYER_ROLES =
  | 'admin'
  | 'eventManager'
  | 'armyCommand'
  | 'squadLead'
  | 'player'
  | 'guest';

export enum PLAYER_ROLES_WEIGHT {
  admin = 1000,
  eventManager = 900,
  armyCommand = 500,
  squadLead = 200,
  player = 100,
  guest = 99,
}

@UntilDestroy()
@Directive({
  selector: '[optHasPlayerRole]',
})
export class HasPlayerRoleDirective implements OnChanges {
  @Input() optHasPlayerRole: PLAYER_ROLES = 'guest';
  private optHasPlayerRole$ = new EventEmitter<PLAYER_ROLES>();

  constructor(
    public fireAuth: AngularFireAuth,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.fireAuth.idTokenResult
      .pipe(withLatestFrom(this.optHasPlayerRole$), untilDestroyed(this))
      .subscribe(([token, minimumRole]) => {
        const playerRole = token?.claims?.role as PLAYER_ROLES;
        if (
          PLAYER_ROLES_WEIGHT[playerRole] >= PLAYER_ROLES_WEIGHT[minimumRole]
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optHasPlayerRole$.emit(changes.optHasPlayerRole?.currentValue);
  }
}
