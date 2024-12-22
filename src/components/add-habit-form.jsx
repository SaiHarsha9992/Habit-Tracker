import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habit-slice";
const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
      setName("");
    }

    console.log({ name, frequency });
    setName("");
    setFrequency("daily");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="habitName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Habit Name
        </label>
        <input
          id="habitName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="frequency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Frequency
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
