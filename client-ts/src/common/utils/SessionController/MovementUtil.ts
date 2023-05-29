import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { MovementBean, RulesMetadata } from 'src/common/models/Movement';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';

class MovementUtil implements MovementBean, RulesMetadata {
  // Bean
  sensors = [];
  observation = '';
  type?: string;

  // Metadata
  movement?: string;
  name?: string;
  image?: string;
  description?: string;
  // angle?: AngleBean;
  uuid?: string;

  constructor() {
    this.uuid = uuid();
  }

  selectMovement(movement: string, movements: RulesMetadata[]) {
    this.movement = movement;
    // Seta os metadata desse movimento
    const foundMovement = movements.find(
      (m: RulesMetadata) => m.value === movement
    );
    if (foundMovement) {
      this.name = foundMovement.movement_name;
      this.image = `/procedures/${foundMovement.image}`;
      // this.angle = foundMovement.angle;
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
    return (
      this.notNull &&
      this.notEmpty &&
      this.sensors.every((s: SensorUtil) => s.valid)
    );
  }
}

export { MovementUtil };
