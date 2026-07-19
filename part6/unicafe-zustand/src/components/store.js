import { create } from 'zustand'
const useCounterStore = create((set) => ({
    counter: {
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0
    },
    actions: {
        incrementGood: () => set((state) => ({ counter: { ...state.counter, good: state.counter.good + 1, all: state.counter.all + 1 } })),
        incrementNeutral: () => set((state) => ({ counter: { ...state.counter, neutral: state.counter.neutral + 1, all: state.counter.all + 1 } })),
        incrementBad: () => set((state) => ({ counter: { ...state.counter, bad: state.counter.bad + 1, all: state.counter.all + 1 } }))
    }
}))

export const useCounter = () => {
    const counter = useCounterStore(state => state.counter)
    return {
        ...counter,
        average: counter.all === 0 ? 0 : (counter.good - counter.bad) / counter.all,
        positive: counter.all === 0 ? 0 : (counter.good / counter.all) * 100
    }
}
export const useCounterControls = () => useCounterStore(state => state.actions)