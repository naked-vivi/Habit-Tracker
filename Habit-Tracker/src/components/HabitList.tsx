import { eachDayOfInterval, endOfWeek, isFuture, startOfWeek } from "date-fns"
import Button from "./Button"
import { format } from "date-fns"


export default function HabitList() {
    const habits = [{ id: 1, name: "Drink Water" }, { id: 2, name: "Exercise" }, { id: 3, name: "Read a Book" }] // Placeholder for habit data

    if (habits.length === 0) {
        return (
            <p className="text-center text-zinc-500">No habits yet. Add one above to get started!</p>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </div>

    )
}

interface HabitProps {
    habit: {
        id: number
        name: string
        // Add more fields as needed (e.g., frequency, progress, etc.)
    }
}
function HabitItem({ habit }: HabitProps) {
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Start of the week (Monday)
        end: endOfWeek(new Date(), { weekStartsOn: 1 }) // End of the week (Sunday)
    }) // Placeholder for visible dates (e.g., last 7 days)
    return (
        <div className="flex flex-col rounded-xl bg-zinc-800 p-4 gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">{habit.name}</span>
                    <span className="text-sm text-amber-400">🔥 3</span>
                </div>
                <Button variant="ghost-destructive" className="text-sm">Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button key={date.toISOString()} disabled={isFuture(date)} className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs">
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span className="text-sm">{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}