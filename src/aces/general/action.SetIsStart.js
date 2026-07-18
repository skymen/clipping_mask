export const config = {
  highlight: true,
  listName: "Start clipping",
  displayText: "Set Start clipping to {0}",
  description: "Set whether to start clipping or end clipping",
  params: [
    {
      id: "isStart",
      name: "Is Start",
      desc: "Is Start",
      type: "boolean",
      initialValue: "true",
    },
  ],
};

export const expose = false;

export default function (isStart) {
  this.isStart = isStart;
}
