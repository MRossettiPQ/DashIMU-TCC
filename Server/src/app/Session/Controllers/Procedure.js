const { i18n } = require('../../../core/Utils/i18nUtil')

exports.getProcedures = () => {
  return [
    {
      articulation_name: i18n.__('procedures.shoulder'),
      value: 'SHOULDER',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.shoulder.flexion'),
          value: 'FLEXION',
          description: i18n.__('procedures.shoulder.flexion.description'),
          image: 'shoulder_-_flexion.jpg',
          angle: {
            min: 0,
            max: 180,
          },
        },
        {
          movement_name: i18n.__('procedures.shoulder.extension'),
          value: 'EXTENSION',
          description: i18n.__('procedures.shoulder.extension.description'),
          image: 'shoulder_-_extension.jpg',
          angle: {
            min: 0,
            max: 45,
          },
        },
        {
          movement_name: i18n.__('procedures.shoulder.abduction'),
          value: 'ABDUCTION',
          description: i18n.__('procedures.shoulder.abduction.description'),
          image: 'shoulder_-_abduction.jpg',
          angle: {
            min: 0,
            max: 40,
          },
        },
        {
          movement_name: i18n.__('procedures.shoulder.adduction'),
          value: 'ADDUCTION',
          description: i18n.__('procedures.shoulder.adduction.description'),
          image: 'shoulder_-_adduction.jpg',
          angle: {
            min: 0,
            max: 180,
          },
        },
        {
          movement_name: i18n.__('procedures.shoulder.internal_rotation'),
          value: 'INTERNAL_ROTATION',
          description: i18n.__(
            'procedures.shoulder.internal_rotation.description'
          ),
          image: 'shoulder_-_internal_rotation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: i18n.__('procedures.shoulder.external_rotation'),
          value: 'EXTERNAL_ROTATION',
          description: i18n.__(
            'procedures.shoulder.external_rotation.description'
          ),
          image: 'shoulder_-_external_rotation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.elbow'),
      value: 'ELBOW',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.elbow.flexion'),
          value: 'FLEXION',
          description: i18n.__('procedures.elbow.flexion.description'),
          image: 'elbow_-_extension-flexion.jpg',
          angle: {
            min: 0,
            max: 145,
          },
        },
        {
          movement_name: i18n.__('procedures.elbow.extension'),
          value: 'EXTENSION',
          description: i18n.__('procedures.elbow.extension.description'),
          image: 'elbow_-_extension-flexion.jpg',
          angle: {
            min: 145,
            max: 0,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.radioulnar'),
      value: 'RADIOULNAR',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.radioulnar.pronation'),
          value: 'PRONATION',
          description: i18n.__('procedures.elbow.pronation.description'),
          image: 'radioulnar_-_pronation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: i18n.__('procedures.radioulnar.supnation'),
          value: 'SUPINATION',
          description: i18n.__('procedures.elbow.supnation.description'),
          image: 'radioulnar_-_supnation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.wrist'),
      value: 'WRIST',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.wrist.flexion'),
          value: 'FLEXION',
          description: i18n.__('procedures.wrist.flexion.description'),
          image: 'wrist_-_flexion.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: i18n.__('procedures.wrist.extension'),
          value: 'EXTENSION',
          description: i18n.__('procedures.wrist.extension.description'),
          image: 'wrist_-_extension.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
        {
          movement_name: i18n.__('procedures.wrist.ulnar_adduction'),
          value: 'ULNAR_ADDUCTION',
          description: i18n.__('procedures.wrist.ulnar_adduction.description'),
          image: 'wrist_-_ulnar_adduction.jpg',
          angle: {
            min: 0,
            max: 45,
          },
        },
        {
          movement_name: i18n.__('procedures.wrist.radial_adduction'),
          value: 'RADIAL_ADDUCTION',
          description: i18n.__('procedures.wrist.radial_adduction.description'),
          image: 'wrist.radial_adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.carpometacarpal_thumb'),
      value: 'CARPOMETACARPAL_THUMB',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.carpometacarpal_thumb.flexion'),
          value: 'FLEXION',
          description: i18n.__(
            'procedures.carpometacarpal_thumb.flexion.description'
          ),
          image: 'carpometacarpal_thumb_-_flexion.jpg',
          angle: {
            min: 0,
            max: 15,
          },
        },
        {
          movement_name: i18n.__('procedures.carpometacarpal_thumb.abduction'),
          value: 'ADDUCTION',
          description: i18n.__(
            'procedures.carpometacarpal_thumb.abduction.description'
          ),
          image: 'carpometacarpal_thumb_-_abduction.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
        {
          movement_name: i18n.__('procedures.carpometacarpal_thumb.extension'),
          value: 'EXTENSION',
          description: i18n.__(
            'procedures.carpometacarpal_thumb.extension.description'
          ),
          image: 'carpometacarpal_thumb_-_extension.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.metacarpophalangeal'),
      value: 'METACARPOPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.metacarpophalangeal.flexion'),
          value: 'FLEXION',
          description: i18n.__(
            'procedures.metacarpophalangeal.flexion.description'
          ),
          image: 'metacarpophalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: i18n.__('procedures.metacarpophalangeal.abduction'),
          value: 'EXTENSION',
          description: i18n.__(
            'procedures.metacarpophalangeal.abduction.description'
          ),
          image: 'metacarpophalangeal_-_extension.jpg',
          angle: {
            min: 0,
            max: 30,
          },
        },
        {
          movement_name: i18n.__('procedures.metacarpophalangeal.abduction'),
          value: 'ABDUCTION',
          description: i18n.__(
            'procedures.metacarpophalangeal.abduction.description'
          ),
          image: 'metacarpophalangeal_-_abduction-adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
        {
          movement_name: i18n.__('procedures.metacarpophalangeal.adduction'),
          value: 'ADDUCTION',
          description: i18n.__(
            'procedures.metacarpophalangeal.adduction.description'
          ),
          image: 'metacarpophalangeal_-_abduction-adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.proximal_interphalangeal'),
      value: 'PROXIMAL_INTERPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.proximal_interphalangeal.flexion'),
          value: 'FLEXION',
          description: i18n.__(
            'procedures.proximal_interphalangeal.flexion.description'
          ),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 110,
          },
        },
        {
          movement_name: i18n.__(
            'procedures.proximal_interphalangeal.extension'
          ),
          value: 'EXTENSION',
          description: i18n.__(
            'procedures.proximal_interphalangeal.extension.description'
          ),
          image: 'proximal_interphalangeal_-_extension.jpg',
          angle: {
            min: 0,
            max: 10,
          },
        },
      ],
    },
    {
      articulation_name: i18n.__('procedures.distal_interphalangeal'),
      value: 'DISTAL_INTERPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          local: 'ONE',
        },
        {
          local: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: i18n.__('procedures.distal_interphalangeal.flexion'),
          value: 'FLEXION',
          description: i18n.__(
            'procedures.distal_interphalangeal.flexion.description'
          ),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 110,
          },
        },
        {
          movement_name: i18n.__(
            'procedures.distal_interphalangeal.thumb_internal_flexion'
          ),
          value: 'THUMB_INTERNAL_FLEXION',
          description: i18n.__(
            'procedures.distal_interphalangeal.thumb_internal_flexion.description'
          ),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 80,
          },
        },
        {
          movement_name: i18n.__(
            'procedures.distal_interphalangeal.thumb_internal_extension'
          ),
          value: 'THUMB_INTERNAL_EXTENSION',
          description: i18n.__(
            'procedures.distal_interphalangeal.thumb_internal_extension.description'
          ),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
        {
          movement_name: i18n.__(
            'procedures.distal_interphalangeal.internal_extension_fingers'
          ),
          value: 'INTERNAL_EXTENSION_FINGERS',
          description: i18n.__(
            'procedures.distal_interphalangeal.internal_extension_fingers.description'
          ),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
  ]
}
