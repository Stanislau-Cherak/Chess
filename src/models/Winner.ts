import { Player } from "./Player";

export type winByType = 'time' | 'mate' | null;

export class Winner {
  player: Player | null;
  winBy: winByType;

  constructor(player: Player | null, winBy: winByType) {
    this.player = player;
    this.winBy = winBy;
  }
}