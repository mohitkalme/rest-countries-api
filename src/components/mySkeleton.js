import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function MySkeleton() {
  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: "23rem", margin: "0 auto" }}>
        <Skeleton
          sx={{ bgcolor: "#1a232c" }}
          variant="rectangular"
          width={260}
          height={130}
        />
        <Skeleton sx={{ bgcolor: "#1a232c" }} variant="text" width="90%" />
        <Skeleton sx={{ bgcolor: "#1a232c" }} width="80%" />
        <Skeleton sx={{ bgcolor: "#1a232c" }} width="60%" />
      </Stack>
    </>
  );
}
