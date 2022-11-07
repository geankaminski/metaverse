class KeyMovements {
    constructor() {
        this.movement = {};
        window.addEventListener("keydown", this.down.bind(this));
        window.addEventListener("keyup", this.up.bind(this));
    }
    isPressed(keyCode) {
        return this.movement[keyCode] ? this.movement[keyCode] : false;
    }
    down(e) {
        if (this.movement[e.keyCode]) return;
        this.movement[e.keyCode] = true;
    }
    up(e) {
        this.movement[e.keyCode] = false;
    }
}

const Movements = new KeyMovements();
export default Movements;