import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import WorkoutLogCard from "./WorkoutLogCard";

const WorkoutLogs = ({ selectedTab }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Sample data
  const [workoutLogs, setWorkoutLogs] = useState([
    {
      logName: "Push A",
      date: "Sep 16, 2024",
      exercises: [
        { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
        { name: "Squats", sets: 3, reps: 12, weight: 185 },
      ],
    },
    {
      logName: "Pull A",
      date: "Sep 14, 2024",
      exercises: [
        { name: "Deadlift", sets: 3, reps: 8, weight: 225 },
        { name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
      ],
    },
    {
      logName: "Legs",
      date: "Sep 13, 2024",
      exercises: [
        { name: "Leg Press", sets: 3, reps: 10, weight: 300 },
        { name: "Leg Curl", sets: 3, reps: 12, weight: 150 },
      ],
    },
    {
      logName: "Push B",
      date: "Aug 28, 2024",
      exercises: [
        { name: "Overhead Press", sets: 3, reps: 8, weight: 95 },
        { name: "Triceps Extension", sets: 3, reps: 12, weight: 65 },
      ],
    },
    {
      logName: "Pull B",
      date: "Aug 25, 2024",
      exercises: [
        { name: "Barbell Rows", sets: 3, reps: 10, weight: 135 },
        { name: "Bicep Curl", sets: 3, reps: 12, weight: 40 },
      ],
    },
    {
      logName: "Legs B",
      date: "Aug 20, 2024",
      exercises: [
        { name: "Deadlift", sets: 3, reps: 8, weight: 225 },
        { name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
      ],
    },
    {
      logName: "Push A",
      date: "August 10, 2024",
      exercises: [
        { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
        { name: "Squats", sets: 3, reps: 12, weight: 185 },
      ],
    },
  ]);

  const handleAddExercise = (index, newExercise) => {
    const updatedLogs = [...workoutLogs];
    updatedLogs[index].exercises.push(newExercise);
    setWorkoutLogs(updatedLogs);
  };

  const handleEditExercise = (logIndex, exerciseIndex, updatedExercise) => {
    const updatedLogs = [...workoutLogs];
    updatedLogs[logIndex].exercises[exerciseIndex] = updatedExercise;
    setWorkoutLogs(updatedLogs);
  };

  const filterWorkoutLogs = (logs, selectedTab) => {
    const today = new Date();
    let filteredLogs = logs;

    if (selectedTab === "week") {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      filteredLogs = logs.filter((log) => new Date(log.date) >= oneWeekAgo);
    } else if (selectedTab === "month") {
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      filteredLogs = logs.filter((log) => new Date(log.date) >= oneMonthAgo);
    }

    return filteredLogs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
  };

  const filteredLogs = filterWorkoutLogs(workoutLogs, selectedTab);
  console.log(filteredLogs.length);

  return (
    <Box>
      {filteredLogs.length === 0 ? (
        <Typography variant="h5" display="flex" justifyContent="center">
          No Data
        </Typography>
      ) : (
        <>
          {" "}
          <Typography variant="h6">
            From{" "}
            <span style={{ color: colors.greenAccent[400] }}>
              {filteredLogs[filteredLogs.length - 1].date}
            </span>{" "}
            to{" "}
            <span style={{ color: colors.greenAccent[400] }}>
              {filteredLogs[0].date}
            </span>
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
            {filteredLogs.map((log, index) => (
              <WorkoutLogCard
                key={index}
                logName={log.logName}
                date={log.date}
                exercises={log.exercises}
                onAddExercise={(newExercise) =>
                  handleAddExercise(index, newExercise)
                }
                onEditExercise={(exerciseIndex, updatedExercise) =>
                  handleEditExercise(index, exerciseIndex, updatedExercise)
                }
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default WorkoutLogs;
