const AvailableSensor = [
  { positionOptions: [{ id: 1 }, { id: 2 }] },
  { positionOptions: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] },
  { positionOptions: [{ id: 1 }, { id: 2 }, { id: 3 }] },
  { positionOptions: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
];

let options = [];

for (const { positionOptions } of AvailableSensor) {
  if (positionOptions.length > options.length) {
    options = positionOptions;
  }
}

console.log(options);
