# Vertical Slices

A vertical slice is a phase of work that delivers a thin but complete path through the product — from user action to observable outcome. It touches every layer needed (UI, API, database, infrastructure) but only the minimum of each to deliver one coherent piece of value.

## The test

Can a user (or the team) do something new after this phase that they couldn't before?

If the answer is "no, but the database schema is ready" — it's a horizontal layer, not a vertical slice.

## Examples

**Vertical slice**: "A user can create a workspace snapshot and see it listed" — touches API, storage, UI, but only the happy path.

**Not a vertical slice**: "Set up the snapshot database tables and migrations" — enables future work but delivers nothing observable.

## Why this matters

- Phase acceptance criteria must describe user-observable outcomes
- Risk-first ordering still applies — if the risky part is the storage layer, the first slice still goes end-to-end, it just picks the slice that exercises the risky layer
- Every phase leaves the system in a deployable state with new capability
