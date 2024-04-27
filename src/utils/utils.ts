export const randomFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const withSavedContext = (
  ctx: CanvasRenderingContext2D,
  drawingFunction: (ctx: CanvasRenderingContext2D) => void
) => {
  ctx.save();
  try {
    drawingFunction(ctx);
  } finally {
    ctx.restore();
  }
};
