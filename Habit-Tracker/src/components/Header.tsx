import Button from "./Button"

function Header() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Habit Tracker</h1>
                <span className="text-sm text-zinc-400">1 / 1 done today</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-zinc-400">Apr 6 - Apr 12</span>
                <div className="flex items-center gap-3">
                    <Button>Prev</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </header>
    )
}

export default Header

