import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("text-gray-100", {
  variants: {
    variant: {
      "body-sm": "text-sm leading-5 font-normal",
      "body-sm-bold": "text-sm leading-5 font-bold",
      "body-md": "text-base leading-6 font-normal",
      "body-md-bold": "text-base leading-6 font-bold",
      "body-lg-bold": "text-2xl leading-6 font-bold",
    },
  },
  defaultVariants: {
    variant: "body-sm",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

const Text = ({
  as = "span",
  className,
  variant,
  children,
  ...props
}: TextProps) => {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  );
};

export default Text;
