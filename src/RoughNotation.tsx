import React, { useRef, useEffect } from "react";
import { annotate } from "rough-notation";

import { useGroupContext } from "./RoughNotationGroup";

export type types =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

type brackets = "left" | "right" | "top" | "bottom";

interface AnnotationProps {
  animate?: boolean;
  animationDuration?: number;
  brackets?: brackets | brackets[];
  children: React.ReactChild;
  color?: string;
  iterations?: number;
  multiline?: boolean;
  padding?: number;
  rtl?: boolean;
  strokeWidth?: number;
  show?: boolean;
  type: types;
}

export function RoughNotation({
  children,
  animate = true,
  animationDuration = 0,
  brackets,
  color,
  iterations = 2,
  multiline = false,
  padding = 5,
  rtl,
  strokeWidth = 1,
  type = "underline",
  show = false,
}: AnnotationProps) {
  const element = useRef<HTMLElement>(null);
  const annotation = useRef(null);
  const initialOptions = useRef({
    animate,
    animationDuration,
    brackets,
    color,
    iterations,
    multiline,
    padding,
    rtl,
    strokeWidth,
    type,
  });

  useGroupContext(annotation);

  useEffect(() => {
    const options = initialOptions.current;

    annotation.current = annotate(element.current, options);

    return () => annotation.current?.remove?.();
  }, []);

  useEffect(() => {
    if (show) {
      annotation.current?.show?.();
    } else {
      annotation.current?.hide?.();
    }
  }, [show, annotation]);

  useEffect(() => {
    if (annotation.current) {
      annotation.current.animate = animate;
      annotation.current.animationDuration = animationDuration;
      annotation.current.color = color;
      annotation.current.strokeWidth = strokeWidth;
      annotation.current.padding = padding;
    }
  }, [annotation, animate, animationDuration, color, strokeWidth, padding]);

  return <span ref={element}>{children}</span>;
}
