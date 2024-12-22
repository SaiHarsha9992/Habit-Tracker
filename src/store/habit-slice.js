import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const newHabit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },

    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload.id
      );
    },
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;
