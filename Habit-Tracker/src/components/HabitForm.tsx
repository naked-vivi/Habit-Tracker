import Button from "./Button"

function HabitForm() {
    return (
        <form className="flex gap-2">
            <input
                className="flex-1 bg-zinc-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="New habit..."
            />
            <Button>Add Habit</Button>
        </form>
    )
}

export default HabitForm