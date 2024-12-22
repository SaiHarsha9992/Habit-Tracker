import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Habit Tracker</h1>
        {/* Add additional components or content here */}
        <AddHabitForm />
        <HabitList />
      </div>
    </Provider>
  );
}

export default App;
