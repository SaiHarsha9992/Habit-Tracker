import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleHabit, removeHabit } from "../store/habit-slice"; // Ensure removeHabit is imported
import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress component

const HabitList = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit) => {
    // If no completed dates, return streak as 0
    if (!habit.completedDates || habit.completedDates.length === 0) {
      return 0;
    }

    let streak = 0;
    const currentDate = new Date();

    // Continue counting streak from today backwards
    while (
      habit.completedDates.includes(currentDate.toISOString().split("T")[0])
    ) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1); // Move one day back
    }

    return streak;
  };

  const handleRemoveHabit = (habitId) => {
    dispatch(removeHabit({ id: habitId }));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="p-4 border border-gray-300 rounded-md shadow-md flex items-center justify-between flex-col"
        >
          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800">{habit.name}</h2>
            <p className="text-sm text-gray-600">
              Frequency: {habit.frequency}
            </p>
          </div>

          <div className="flex justify-between gap-4 w-full">
            <button
              className={`px-4 py-2 rounded-md border-2 ${
                habit.completedDates.includes(today)
                  ? "border-green-500 text-green-500"
                  : "border-blue-500 text-blue-500"
              } flex items-center hover:bg-gray-100`}
              onClick={() =>
                dispatch(toggleHabit({ id: habit.id, date: today }))
              }
            >
              <CheckCircleIcon className="mr-2" />
              {habit.completedDates.includes(today)
                ? "Completed"
                : "Mark Complete"}
            </button>

            <button
              className="px-4 py-2 rounded-md border-2 border-red-500 text-red-500 flex items-center hover:bg-gray-100"
              onClick={() => handleRemoveHabit(habit.id)} // Remove habit
            >
              <DeleteIcon className="mr-2" />
              Remove
            </button>
          </div>

          {/* Streak progress bar */}
          <div className="w-full mt-4">
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100} // Assuming a 30-day max streak
              sx={{ marginTop: 1 }}
            />
          </div>

          {/* Current Streak */}
          <div className="w-full mt-2">
            <p className="text-sm text-gray-600">
              Current Streak: {getStreak(habit)} days
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
