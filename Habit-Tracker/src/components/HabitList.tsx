import { isFuture, isSameDay, subDays } from "date-fns"
import Button from "./Button"
import { format } from "date-fns"
import { useHabits } from "../context/useHabits"

export type Habit = {
    id: string
    name: string
    completions?: Date[] // Optional array to track completed dates for the habit
    // Add more fields as needed (e.g., frequency, progress, etc.)
}

type HabitListProps = {
    visibleDates: Date[]
}

export default function HabitList({ visibleDates }: HabitListProps) {
    const { habits } = useHabits()
    if (habits.length === 0) {
        return (
            <p className="text-center text-zinc-500">No habits yet. Add one above to get started!</p>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
            ))}
        </div>

    )
}

interface HabitItemProps {
    habit: Habit;
    visibleDates: Date[]
}
function HabitItem({ habit, visibleDates }: HabitItemProps) {
    const { deleteHabit, toggleHabit } = useHabits()

    const streak = getStreak(habit.completions || [])
    return (
        <div className="flex flex-col rounded-xl bg-zinc-800 p-4 gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">{habit.name}</span>
                    {streak !== 0 && (
                        <span className="text-sm text-amber-400">🔥 {streak}</span>
                    )}
                </div>
                <Button
                    onClick={() => deleteHabit(habit.id)}
                    variant="ghost-destructive"
                    className="text-sm">
                    Delete
                </Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button
                        key={date.toISOString()}
                        disabled={isFuture(date)}
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
                        variant={habit.completions?.some(d => isSameDay(date, d)) ? "primary" : "secondary"}
                        onClick={() => toggleHabit(habit.id, date)}
                    >
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span className="text-sm">{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function getStreak(completions: Date[]) {
    let streak = 0
    let date = new Date()

    while (completions.some(d => isSameDay(d, date))) {
        streak++
        date = subDays(date, 1)
    }
    return streak
}