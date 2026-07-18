export const config = {
  highlight: true,
  listName: "Is Clipping",
  displayText: "Check if clipping is enabled",
  description: "Check if clipping is enabled",
  params: [],
};

export const expose = false;

export default function () {
  return this.isStart;
}
