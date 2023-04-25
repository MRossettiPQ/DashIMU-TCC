const { translate } = require('../../../core/utils/i18nUtil')
const { settings } = require('../../../settings')

exports.getProcedures = () => {
  const procedures = [
    {
      articulation_name: translate('procedures.shoulder'),
      value: 'SHOULDER',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.shoulder.flexion'),
          value: 'FLEXION',
          description: translate('procedures.shoulder.flexion.description'),
          image: 'shoulder_-_flexion.jpg',
          angle: {
            min: 0,
            max: 180,
          },
        },
        {
          movement_name: translate('procedures.shoulder.extension'),
          value: 'EXTENSION',
          description: translate('procedures.shoulder.extension.description'),
          image: 'shoulder_-_extension.jpg',
          angle: {
            min: 0,
            max: 45,
          },
        },
        {
          movement_name: translate('procedures.shoulder.abduction'),
          value: 'ABDUCTION',
          description: translate('procedures.shoulder.abduction.description'),
          image: 'shoulder_-_abduction.jpg',
          angle: {
            min: 0,
            max: 40,
          },
        },
        {
          movement_name: translate('procedures.shoulder.adduction'),
          value: 'ADDUCTION',
          description: translate('procedures.shoulder.adduction.description'),
          image: 'shoulder_-_adduction.jpg',
          angle: {
            min: 0,
            max: 180,
          },
        },
        {
          movement_name: translate('procedures.shoulder.internal_rotation'),
          value: 'INTERNAL_ROTATION',
          description: translate('procedures.shoulder.internal_rotation.description'),
          image: 'shoulder_-_internal_rotation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: translate('procedures.shoulder.external_rotation'),
          value: 'EXTERNAL_ROTATION',
          description: translate('procedures.shoulder.external_rotation.description'),
          image: 'shoulder_-_external_rotation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.elbow'),
      value: 'ELBOW',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.elbow.flexion'),
          value: 'FLEXION',
          description: translate('procedures.elbow.flexion.description'),
          image: 'elbow_-_extension-flexion.jpg',
          angle: {
            min: 0,
            max: 145,
          },
        },
        {
          movement_name: translate('procedures.elbow.extension'),
          value: 'EXTENSION',
          description: translate('procedures.elbow.extension.description'),
          image: 'elbow_-_extension-flexion.jpg',
          angle: {
            min: 145,
            max: 0,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.radioulnar'),
      value: 'RADIOULNAR',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.radioulnar.pronation'),
          value: 'PRONATION',
          description: translate('procedures.radioulnar.pronation.description'),
          image: 'radioulnar_-_pronation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: translate('procedures.radioulnar.supnation'),
          value: 'SUPINATION',
          description: translate('procedures.radioulnar.supnation.description'),
          image: 'radioulnar_-_supnation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.wrist'),
      value: 'WRIST',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.wrist.flexion'),
          value: 'FLEXION',
          description: translate('procedures.wrist.flexion.description'),
          image: 'wrist_-_flexion.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: translate('procedures.wrist.extension'),
          value: 'EXTENSION',
          description: translate('procedures.wrist.extension.description'),
          image: 'wrist_-_extension.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
        {
          movement_name: translate('procedures.wrist.ulnar_adduction'),
          value: 'ULNAR_ADDUCTION',
          description: translate('procedures.wrist.ulnar_adduction.description'),
          image: 'wrist_-_ulnar_adduction.jpg',
          angle: {
            min: 0,
            max: 45,
          },
        },
        {
          movement_name: translate('procedures.wrist.radial_adduction'),
          value: 'RADIAL_ADDUCTION',
          description: translate('procedures.wrist.radial_adduction.description'),
          image: 'wrist.radial_adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.carpometacarpal_thumb'),
      value: 'CARPOMETACARPAL_THUMB',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.carpometacarpal_thumb.flexion'),
          value: 'FLEXION',
          description: translate('procedures.carpometacarpal_thumb.flexion.description'),
          image: 'carpometacarpal_thumb_-_flexion.jpg',
          angle: {
            min: 0,
            max: 15,
          },
        },
        {
          movement_name: translate('procedures.carpometacarpal_thumb.abduction'),
          value: 'ADDUCTION',
          description: translate('procedures.carpometacarpal_thumb.abduction.description'),
          image: 'carpometacarpal_thumb_-_abduction.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
        {
          movement_name: translate('procedures.carpometacarpal_thumb.extension'),
          value: 'EXTENSION',
          description: translate('procedures.carpometacarpal_thumb.extension.description'),
          image: 'carpometacarpal_thumb_-_extension.jpg',
          angle: {
            min: 0,
            max: 70,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.metacarpophalangeal'),
      value: 'METACARPOPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.metacarpophalangeal.flexion'),
          value: 'FLEXION',
          description: translate('procedures.metacarpophalangeal.flexion.description'),
          image: 'metacarpophalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
        {
          movement_name: translate('procedures.metacarpophalangeal.abduction'),
          value: 'EXTENSION',
          description: translate('procedures.metacarpophalangeal.abduction.description'),
          image: 'metacarpophalangeal_-_extension.jpg',
          angle: {
            min: 0,
            max: 30,
          },
        },
        {
          movement_name: translate('procedures.metacarpophalangeal.abduction'),
          value: 'ABDUCTION',
          description: translate('procedures.metacarpophalangeal.abduction.description'),
          image: 'metacarpophalangeal_-_abduction-adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
        {
          movement_name: translate('procedures.metacarpophalangeal.adduction'),
          value: 'ADDUCTION',
          description: translate('procedures.metacarpophalangeal.adduction.description'),
          image: 'metacarpophalangeal_-_abduction-adduction.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.proximal_interphalangeal'),
      value: 'PROXIMAL_INTERPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.proximal_interphalangeal.flexion'),
          value: 'FLEXION',
          description: translate('procedures.proximal_interphalangeal.flexion.description'),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 110,
          },
        },
        {
          movement_name: translate('procedures.proximal_interphalangeal.extension'),
          value: 'EXTENSION',
          description: translate('procedures.proximal_interphalangeal.extension.description'),
          image: 'proximal_interphalangeal_-_extension.jpg',
          angle: {
            min: 0,
            max: 10,
          },
        },
      ],
    },
    {
      articulation_name: translate('procedures.distal_interphalangeal'),
      value: 'DISTAL_INTERPHALANGEAL',
      min_sensor: 2,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
        {
          label: 'TWO',
          value: 'TWO',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.distal_interphalangeal.flexion'),
          value: 'FLEXION',
          description: translate('procedures.distal_interphalangeal.flexion.description'),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 110,
          },
        },
        {
          movement_name: translate('procedures.distal_interphalangeal.thumb_internal_flexion'),
          value: 'THUMB_INTERNAL_FLEXION',
          description: translate('procedures.distal_interphalangeal.thumb_internal_flexion.description'),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 80,
          },
        },
        {
          movement_name: translate('procedures.distal_interphalangeal.thumb_internal_extension'),
          value: 'THUMB_INTERNAL_EXTENSION',
          description: translate('procedures.distal_interphalangeal.thumb_internal_extension.description'),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
        {
          movement_name: translate('procedures.distal_interphalangeal.internal_extension_fingers'),
          value: 'INTERNAL_EXTENSION_FINGERS',
          description: translate('procedures.distal_interphalangeal.internal_extension_fingers.description'),
          image: 'proximal_interphalangeal_-_flexion.jpg',
          angle: {
            min: 0,
            max: 20,
          },
        },
      ],
    },
  ]

  if (settings?.development) {
    procedures.unshift({
      articulation_name: translate('procedures.shoulder') + ' EM DEV',
      value: 'SHOULDER',
      min_sensor: 1,
      sensor_positions: [
        {
          label: 'ONE',
          value: 'ONE',
        },
      ],
      rules: [
        {
          movement_name: translate('procedures.shoulder.internal_rotation'),
          value: 'INTERNAL_ROTATION',
          description: translate('procedures.shoulder.internal_rotation.description'),
          image: 'shoulder_-_internal_rotation.jpg',
          angle: {
            min: 0,
            max: 90,
          },
        },
      ],
    })
  }
  return procedures
}
