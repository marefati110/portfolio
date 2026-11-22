'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Native-app-style open/close state for modals and bottom sheets.
 *
 * Opening pushes a single browser history entry; the hardware/browser Back
 * button (or a back gesture) closes the top-most open layer instead of
 * navigating the page. Programmatic closing (an X button, a backdrop tap)
 * closes instantly and keeps history in sync, so Back never gets "stuck".
 *
 * The whole app shares one history stack and one `popstate` listener, so any
 * number of stacked layers close last-in-first-out, the way a native UI does.
 *
 * @param id        A stable, unique identifier for this layer.
 * @param initialState  Whether the layer starts open (default false).
 * @returns `[open, setOpen]` — the shape of `useState<boolean>`. `setOpen(false, afterClose)` runs
 * `afterClose` once the layer's history entry is gone; navigate there, since a navigation started
 * right after closing is undone by the pending `history.back()`.
 */
export function useOpen(
  id: string,
  initialState: boolean = false,
): [boolean, (open: boolean, afterClose?: () => void) => void] {
  const [open, setOpenState] = useState(initialState)

  // A stable closer for this instance. `setOpenState` identity is guaranteed
  // stable by React, so this ref never needs to change.
  const closeRef = useRef<() => void>(() => setOpenState(false))

  // `initialState` is a mount-only seed; capture it so the effect below depends
  // only on `id` and never re-runs when a parent passes a new initial value.
  const initialOpenRef = useRef(initialState)

  const setOpen = useCallback(
    (value: boolean, afterClose?: () => void) => {
      if (value) {
        setOpenState(true)
        manager.open(id, closeRef.current)
      } else {
        manager.close(id, afterClose)
      }
    },
    [id],
  )

  // Register an initially-open layer, and always clean the stack on unmount so
  // a layer that disappears via navigation can't leave a dangling entry.
  useEffect(() => {
    if (initialOpenRef.current) {
      manager.open(id, closeRef.current)
    }

    return () => manager.drop(id)
  }, [id])

  return [open, setOpen]
}

/* -------------------------------------------------------------------------- */
/*  Shared history manager (one instance per document)                        */
/* -------------------------------------------------------------------------- */

type ModalEntry = {
  id: string
  close: () => void
}

const STATE_KEY = '__modalId'

/** Layers currently open, oldest first; the last element is the top-most. */
const stack: ModalEntry[] = []

/**
 * Count of `popstate` events we triggered ourselves via `history.back()`.
 * Each programmatic close that touches history increments it; the matching
 * `popstate` decrements it. This is deterministic — unlike a timeout, it can
 * never get out of sync or "leak" a lock onto a later, genuine Back press.
 */
let pendingSelfPops = 0

/** Run once every self-triggered `popstate` has arrived, i.e. history is settled. */
const afterSelfPops: (() => void)[] = []

let attached = false

function attach() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener('popstate', handlePopState)
}

function handlePopState() {
  if (pendingSelfPops > 0) {
    // This popstate is the echo of a close we performed; already handled.
    pendingSelfPops -= 1

    if (pendingSelfPops === 0) {
      for (const callback of afterSelfPops.splice(0)) callback()
    }

    return
  }

  // A genuine Back/forward gesture: dismiss the top-most layer, if any.
  // When the stack is empty we do nothing and let the browser navigate.
  const entry = stack.pop()

  entry?.close()
}

function isCurrentModalState(id: string): boolean {
  return typeof window !== 'undefined' && window.history.state?.[STATE_KEY] === id
}

function open(id: string, close: () => void) {
  if (typeof window === 'undefined') return
  attach()

  // Already open (e.g. `setOpen(true)` called twice): keep it idempotent.
  if (stack.some((entry) => entry.id === id)) return

  // Don't push a duplicate history entry if one already exists for this id
  // (guards against React StrictMode's double-invoked effects in dev).
  if (!isCurrentModalState(id)) {
    window.history.pushState({ ...window.history.state, [STATE_KEY]: id }, '')
  }

  stack.push({ id, close })
}

function close(id: string, afterClose?: () => void) {
  if (typeof window === 'undefined') return

  const index = stack.findIndex((entry) => entry.id === id)

  if (index === -1) {
    afterClose?.()

    return
  }

  const [entry] = stack.splice(index, 1)

  // Close immediately so the UI reacts on the same tick as the user's action.
  entry.close()

  const wasTop = index === stack.length

  if (wasTop && isCurrentModalState(id)) {
    // Pop the history entry we pushed so the Back button stays in sync. We
    // already closed the layer, so swallow the popstate this triggers.
    pendingSelfPops += 1
    if (afterClose) afterSelfPops.push(afterClose)
    window.history.back()

    return
  }

  afterClose?.()

  if (process.env.NODE_ENV !== 'production' && !wasTop) {
    console.warn(
      `useOpen: closed "${id}" while it was not the top-most layer; its history entry is left behind and will require an extra Back press to clear.`,
    )
  }
}

/** Remove a layer from the stack without touching history (used on unmount). */
function drop(id: string) {
  const index = stack.findIndex((entry) => entry.id === id)

  if (index !== -1) {
    stack.splice(index, 1)
  }
}

const manager = { open, close, drop }
