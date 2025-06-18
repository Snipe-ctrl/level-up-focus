export const TIMER_PHASES = {
    WORK: 'work',
    BREAK: 'break',
    LONG_BREAK: 'longBreak'
};

export const PHASE_LABELS = {
    [TIMER_PHASES.WORK]: 'Focus Period',
    [TIMER_PHASES.BREAK]: 'Breaktime',
    [TIMER_PHASES.LONG_BREAK]: 'Long Break'
};

export const XP_REWARDS = {
    WORK_SESSION: 25,
    FULL_CYCLE: 10
};

export const DEFAULT_TIMER_SETTINGS = {
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
};