import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function MySkeleton (){
    return (
        <>
       
            <Stack sx={{maxWidth:"16rem", margin:'0 auto'}}>
              
                <Skeleton sx={{ mb: 1 }} variant="rectangular" width={260} height={130} />
                <Skeleton sx={{ mb: 1 }} variant="text" width="90%" />
                <Skeleton sx={{ mb: 1 }} width="80%"/>
                <Skeleton width="60%" />
              </Stack>
        </>
    )
}