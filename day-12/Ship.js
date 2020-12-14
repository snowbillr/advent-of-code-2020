const DEBUG = false;

export class Ship {
  constructor() {
    this.waypoint = [10, 1]; // [x, y]
    this.position = [0, 0]; // [x, y]
  }

  executeInstruction({ action, value }) {
    switch (action) {
      case 'N':
        this.waypoint[1] += value;
        break;
      case 'S':
        this.waypoint[1] -= value;
        break;
      case 'W':
        this.waypoint[0] -= value;
        break;
      case 'E':
        this.waypoint[0] += value;
        break;

      case 'F':
        for (let i = 0; i < value; i ++) {
          const xDistance = this.waypoint[0] - this.position[0];
          const yDistance = this.waypoint[1] - this.position[1];

          this.waypoint[0] += xDistance;
          this.position[0] += xDistance;
          this.waypoint[1] += yDistance;
          this.position[1] += yDistance;
        }
        break;

      case 'L':
        this.rotate(value, false)
        break;
      case 'R':
        this.rotate(value, true)
        break;
    }

    DEBUG && console.log(action, value)
    DEBUG && console.log('new position', this.position)
    DEBUG && console.log('new waypoint', this.waypoint)
  }

  rotate(degrees, clockwise) {
    DEBUG && console.log('---rotate---')

    const rotationRadians = (clockwise ? 1 : -1) * (degrees * (Math.PI / 180));

    const tempWaypoint = [this.waypoint[0] - this.position[0], this.waypoint[1] - this.position[1]];
    DEBUG && console.log('translated temp waypoint', tempWaypoint)

    const rotatedWaypoint = [
      Math.round(tempWaypoint[0] * Math.cos(rotationRadians) + tempWaypoint[1] * Math.sin(rotationRadians)),
      Math.round(tempWaypoint[1] * Math.cos(rotationRadians) - tempWaypoint[0] * Math.sin(rotationRadians))
    ];

    DEBUG && console.log('rotated temp waypoint', rotatedWaypoint)

    this.waypoint = [rotatedWaypoint[0] + this.position[0], rotatedWaypoint[1] + this.position[1]];
  }

  calculateManhattanDistance() {
    return this.position.map(c => Math.abs(c)).reduce((sum, c) => sum + c, 0);
  }
}
