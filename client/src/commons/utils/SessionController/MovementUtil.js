import _ from "lodash";
import { v4 as uuid } from "uuid";

class Movement {
  // Bean
  sensors = [];
  movement = null;
  observation = "";

  // Metadata
  name = "";
  image = null;
  description = null;
  angle = null;
  uuid = "";

  constructor() {
    this.uuid = uuid(null, null, null);
  }

  selectMovement(movement, movements) {
    this.movement = movement;
    // Seta os metadata desse movimento
    const foundMovement = movements.find((m) => m.value === movement);
    if (foundMovement) {
      this.name = foundMovement.movement_name;
      this.image = `/procedures/${foundMovement.image}`;
      this.angle = foundMovement.angle;
      this.description = foundMovement.description;
    }
  }

  get size() {
    return this.sensors.length;
  }

  get notEmpty() {
    return !_.isEmpty(this.sensors);
  }

  get notNull() {
    return !_.isNil(this.movement);
  }

  get valid() {
    return this.notNull && this.notEmpty && this.sensors.every((m) => m.valid);
  }
}

export { Movement };
