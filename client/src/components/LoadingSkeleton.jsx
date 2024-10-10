import { Stack, Skeleton } from "@mui/material";

const LoadingSkeleton = ({ height1, height2, height3, height4 }) => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" fullwidth height={height1} />
      <Skeleton variant="rounded" fullwidth height={height2} />
      {height3 && <Skeleton variant="rounded" fullwidth height={height3} />}
      {height4 && <Skeleton variant="rounded" fullwidth height={height4} />}
    </Stack>
  );
};

export default LoadingSkeleton;
