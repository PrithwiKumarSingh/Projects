import { Element } from "@/types/element";

export function renderElement(
  context: CanvasRenderingContext2D,
  element: Element
) {
  context.beginPath();

  if (element.type === "Rectangle") {
    context.strokeRect(
      element.x,
      element.y,
      element.width,
      element.height
    );
  }

  if (element.type === "Circle") {
    context.arc(
      element.x,
      element.y,
      element.radius,
      0,
      Math.PI * 2
    );

    context.stroke();
  }

  if (element.type === "Line") {
    context.moveTo(
      element.startX,
      element.startY
    );

    context.lineTo(
      element.endX,
      element.endY
    );

    context.stroke();
  }
}