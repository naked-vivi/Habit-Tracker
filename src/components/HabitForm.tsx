import { useState, type SubmitEvent } from "react"
import Button from "./Button"
import { useHabits } from "../context/useHabits"

function HabitForm() {
    const [name, setName] = useState("")
    const { addHabit } = useHabits()

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault()

        const trimmedName = name.trim()
        if (!trimmedName) return

        addHabit(trimmedName)
        setName("")
    }

    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-zinc-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="New habit..."
            />
            <Button disabled={!name.trim()} className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
        </form>
    )
}

export default HabitForm
