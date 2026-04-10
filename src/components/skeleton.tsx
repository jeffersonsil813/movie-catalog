import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse bg-gray-300 pointer-events-none", {
  variants: {
    rounded: {
      none: "rounded-none",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "md",
  },
});

interface SkeletonProps
  extends React.ComponentProps<"div">, VariantProps<typeof skeletonVariants> {}

const Skeleton = ({ rounded, className, ...props }: SkeletonProps) => {
  return (
    <div className={skeletonVariants({ rounded, className })} {...props} />
  );
};

export default Skeleton;
