const reportTemplates = [
  {
    label: 'Activity',
    fullSelected: false,
    data: 'Activity',
    children: [
      {
        border: true,
        parent: 'Activity',
        label: 'Trips',
        data: 'Trips',
        selected: false,
      },
      {
        border: true,
        parent: 'Activity',
        label: 'Stops',
        data: 'Stops',
        selected: false,
      },
      {
        border: true,
        parent: 'Activity',
        label: 'Matrices',
        data: 'Matrices',
        selected: false,
      },
    ],
  },
  {
    label: 'Landmarks',
    fullSelected: false,
    data: 'Landmarks',
    children: [
      {
        border: true,
        parent: 'Landmarks',
        label: 'Geofence Visits',
        data: 'Geofence Visits',
        selected: false,
      },
      {
        border: true,
        parent: 'Activity',
        label: 'POI Visits',
        data: 'POI Visits',
        selected: false,
      },
    ],
  },
  {
    label: 'Transport Usage',
    data: 'Transport Usage', fullSelected: false,
    children: [
      {
        border: true,
        parent: 'Transport Usage',
        label: 'Engine Hours',
        data: 'Engine Hours',
        selected: false,
      },
      {
        border: true,
        parent: 'Activity',
        label: 'Fuel Volume',
        data: 'Fuel Volume',
        selected: false,
      },
    ],
  },
  {
    label: 'Driving Quality', fullSelected: false,
    data: 'Driving Quality',
    children: [
      {
        border: true,
        parent: 'Driving Quality',
        label: 'Speed Violations',
        data: 'Speed Violations',
        selected: false,
      },
    ],
  },
  {
    label: 'Connected Devices', fullSelected: false,
    data: 'Connected Devices',
    children: [
      {
        border: true,
        parent: 'Connected Devices',
        label: 'Temperature',
        data: 'Temperature',
        selected: false,
      },
      {
        border: true,
        parent: 'Connected Devices',
        label: 'Door',
        data: 'Door',
        selected: false,
      },
      {
        border: true,
        parent: 'Connected Devices',
        label: 'Measuring Sensors',
        data: 'Measuring Sensors',
        selected: false,
      },
      {
        border: true,
        parent: 'Connected Devices',
        label: 'Equipment Working time',
        data: 'Equipment Working time',
        selected: false,
      },
    ],
  },
];


export {
  reportTemplates,
};
