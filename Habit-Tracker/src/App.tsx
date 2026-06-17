import { useState } from "react"
import HabitForm from "./components/HabitForm"
import HabitList, { type Habit } from "./components/HabitList"
import Header from "./components/Header"


function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabits([...habits, { id: crypto.randomUUID(), name }])
  }

  function deleteHabit(id: string) {
    setHabits(cur => cur.filter(h => h.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} deleteHabit={deleteHabit} />
    </div>
  )
}

export default App