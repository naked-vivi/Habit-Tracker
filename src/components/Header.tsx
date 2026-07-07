import { format, isFuture, isSameDay, isToday } from "date-fns"
import { useHabits } from "../context/useHabits"
import Button from "./Button"

type HeaderProps = {
    visibleDates: Date[]
    onPrev: () => void
    onNext: () => void
}

function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
    const { habits } = useHabits()

    const doneToday = habits.filter(h => h.completions?.some(c => isToday(c))).length
    const trackableDates = visibleDates.filter(date => !isFuture(date))
    const completedThisWeek = habits.reduce((total, habit) => (
        total + trackableDates.filter(date => habit.completions?.some(c => isSameDay(c, date))).length
    ), 0)
    const possibleThisWeek = habits.length * trackableDates.length
    const weekProgress = possibleThisWeek === 0
        ? "No progress this week"
        : `${completedThisWeek} / ${possibleThisWeek} done this week`

    const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`


    return (
        <header className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Habit Tracker</h1>
                <span className="text-sm text-zinc-400">{doneToday} / {habits.length} done today</span>
                <span className="text-sm text-zinc-400">{weekProgress}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-zinc-400">{dateRange}</span>
                <div className="flex items-center gap-3">
                    <Button onClick={onPrev}>Prev</Button>
                    <Button onClick={onNext} disabled={visibleDates.some(d => isToday(d))}>Next</Button>
                </div>
            </div>
        </header>
    )
}

export default Header
