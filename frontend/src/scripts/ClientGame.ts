
import { Game } from "/app/shared/game/Game.ts";

export class ClientGame {
  game: Game;
  pendingInputs: any[] = [];

  constructor(seed: string) {
    this.game = new Game(seed);
  }

  applyServerState(state: any) {
    this.game.setState(state);

    this.pendingInputs.forEach(input => {
      this.game.applyInput(input);
    });
  }

  applyLocalInput(input: any) {
    this.pendingInputs.push(input);
    this.game.applyInput(input);
  }

  confirmInput() {
    this.pendingInputs.shift();
  }
}
