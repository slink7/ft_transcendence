export class Game {
	x = 5;
	y = 0;
	score = 0;

	update() {
		this.y++;
	}

	move(dx: number, dy: number) {
		this.x += dx;
		this.y += dy;
	}

	rotate() {
		// plus tard
	}

	getState() {
		return {
			x: this.x,
			y: this.y,
			score: this.score
		};
	}
}
