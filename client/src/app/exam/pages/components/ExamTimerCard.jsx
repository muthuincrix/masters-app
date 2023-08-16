import { Paper, CircularProgress, Box, Stack } from "@mui/material";
import { circularProgressClasses } from "@mui/material/CircularProgress";

export default function ExamTimerCard({totalTime, timeLeft}) {
  return (
    <Paper
      sx={{
        p: 2,
        height: 240,
        width: "100%",
        borderRadius: "20px",
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "20px",
          marginBottom: "1rem",
        }}
      >
        Time Left:
      </h2>
      <Stack alignItems="center" sx={{ position: "relative", width:"100%" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color:  "#C5CFD3",
          }}
          size={150}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#187163",
            animationDuration: "1000ms",
            position: "absolute",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={150}
          thickness={4}
          value={40}
        />
        <p
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "700",
                fontSize: "18px",
                color: "#187163",
            }}
        >
            00:40:20
        </p>
      </Stack>
    </Paper>
  );
}
