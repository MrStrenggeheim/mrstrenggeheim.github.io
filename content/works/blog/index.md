---
title: "Crazy Caml Competition: Building a Game-Playing AI"
subtitle: "From Minimax to Bitmasks – Algorithmic Thinking Gamified"
type: blog
tags: [Algorithms, AI, OCaml]
thumbnail: /assets/thumbnails/ccc.png
author: Florian Hunecke
date: 2022-02-27
---

> **Disclaimer:** This writeup is based on a university project where the game framework and rights belong to the course team (*Übungsleitung*). What I share here are my own ideas, approaches and code snippets developed during the competition. The full implementation and the game system itself remain proprietary to the university course.

---

## The Arena: A University Competition

There's something magical about competition. It's one thing to learn algorithms from a textbook - understanding why Minimax works, memorizing the alpha-beta pruning optimization, nodding along to complexity analysis. It's another thing entirely to *feel* them, to watch your AI opponent stumble into a trap you laid three moves ago, or to lose because your BFS was just 50 milliseconds too slow.

This project was born from exactly that energy. As part of a university course, we were challenged to implement an AI agent for a camel-themed variant of the classic board game **Quoridor**. The rules were simple: two players race to reach the opposite side of a 7×7 grid while strategically placing camel-shaped walls to block each other. The catch? Your AI had to decide its move *fast*, and every algorithmic shortcut mattered.

What started as a homework assignment quickly became an obsession. How deep could I search? Could I beat the reference solution? Could I beat *everyone*?

---

## The Game: A Camel's Quoridor

Before diving into the algorithms, let's understand what we're optimizing for.

### The Rules

- **Board:** A 7×7 grid of squares
- **Players:** Two players start at opposite ends (top/bottom center)
- **Goal:** Be the first to reach the opponent's starting row
- **Moves:** On your turn, you can either:
  - **Move** your pawn (up, down, left, right, or diagonally in special jumping scenarios)
  - **Place a camel** (a wall blocking two adjacent edges, either horizontal `H` or vertical `V`)
- **Constraint:** Each player has 8 camels. You cannot place a camel that would completely block either player from reaching their goal.

The game tree explodes quickly. Each position might have 8+ movement options and 70+ possible camel placements. Multiply that across several turns, and you're looking at millions of game states to evaluate.

```ocaml
╭───┬───┬───┬───┬───┬───┬───╮
│                           │
├   ┼   ┼   ┼   ┼   ┼   ┼   ┤
│               ┃         0 │  ← Player 0
├   ┼   ┼   ┼   ╂━━━┿━━━┼   ┤
│               ┃           │
├━━━┿━━━┼━━━┿━━━┼   ┼   ┼   ┤
│                   ┃   ┃   │
├   ┼━━━┿━━━┼━━━┿━━━╂   ╂   ┤
│                   ┃   ┃   │
├   ┼━━━┿━━━┼   ┼   ┼━━━┿━━━┤
│   ┃   ┃   ┃   ┃   ┃   ┃   │
├   ╂   ╂   ╂   ╂   ╂   ╂   ┤
│ 1 ┃   ┃   ┃   ┃   ┃   ┃   │  ← Player 1
╰───┴───┴───┴───┴───┴───┴───╯
```
*A sample game state with various camel (wall) placements*

---

## The Core: Minimax with Alpha-Beta Pruning

At the heart of every good game-playing AI is **Minimax**. The idea is beautifully simple:

1. Assume both players play *optimally*
2. You (the maximizing player) pick moves that maximize your score
3. Your opponent (the minimizing player) picks moves that minimize your score
4. Search the game tree recursively, alternating between max and min

### The Alpha-Beta Breakthrough

Vanilla Minimax is slow. You're searching an exponentially growing tree. But here's the insight: *you don't need to search everything*.

**Alpha-Beta Pruning** lets us skip entire branches of the game tree. The idea:

- **Alpha (α):** The best score the maximizing player can guarantee
- **Beta (β):** The best score the minimizing player can guarantee
- If at any point β ≤ α, we can *prune* - stop searching this branch because the opponent would never let us get here

```ocaml
let rec iterate_moves moves alpha beta best_move maximizing =
  match moves with
  | [] -> best_move
  | move :: rest ->
      let value = minimax (apply move) (depth - 1) alpha beta in
      if maximizing then
        let alpha = max alpha value in
        if beta <= alpha then best_move  (* Prune! *)
        else iterate_moves rest alpha beta (better_move best_move move value)
      else
        let beta = min beta value in
        if beta <= alpha then best_move  (* Prune! *)
        else iterate_moves rest alpha beta (better_move best_move move value)
```

The beautiful thing? Alpha-beta doesn't change the result - it just makes you get there faster. In the best case, it can effectively *double your search depth* for the same computation time.

---

## The Speed Demons: Optimizations That Mattered

### 1. Dynamic Search Depth

Fixed search depth is a rookie mistake. Early game has too many options (16 camels still to place), late game has fewer. I implemented **dynamic depth scaling**:

```ocaml
let max_depth camels_remaining =
  match camels_remaining with
  | n when n >= 9 -> 1   (* Wide tree: stay shallow *)
  | n when n >= 5 -> 3
  | n when n >= 3 -> 5
  | n when n >  0 -> 7
  | _             -> 9   (* Endgame: search deep *)
```

When few camels remain, we search 7–9 moves ahead. With many camels still in play, we stay at 1–3. This lets us use our time budget where it matters most.

### 2. Move Ordering: The Alpha-Beta Multiplier

Alpha-beta pruning is only as good as your move ordering. If we examine good moves first, we establish strong α/β bounds early, allowing more pruning later.

I observed that **camels placed near the players** tend to be most impactful. So I re-ordered the move list to prioritize:

1. Movement directions toward the goal
2. Camels adjacent to either player's position
3. Everything else

```ocaml
let prioritize_moves player_pos enemy_pos moves =
  let near pos camel = distance camel pos <= 1 in
  let priority = function
    | Move _   -> 10  (* Always consider movement first *)
    | Camel c  -> if near player_pos c || near enemy_pos c then 5 else 0
  in
  List.sort (fun a b -> compare (priority b) (priority a)) moves
```

This simple heuristic dramatically improved pruning efficiency.

---

## The Game-Changer: Bitmask State Representation

This was *the* optimization. The single change that took my agent from "pretty good" to "top of the leaderboard."

### The Problem

Every time we place a camel, we need to verify that both players can still reach their goal (BFS pathfinding). And in the Minimax tree, we're checking *thousands* of states per second.

The naive implementation stores camels as a list:
```ocaml
type camel = H of int * int | V of int * int
let camels = [H(0,5); H(2,5); V(2,1); V(2,4); ...]
```

To check if a player can move from position `(x,y)` in direction `Down`, we need to scan *the entire camel list* to see if any camel blocks that edge. Linear time. Repeated thousands of times. Death by a thousand cuts.

### The Solution: Bit-Level Thinking

The 7×7 board has:

- 42 horizontal edges (7 columns × 6 internal rows)
- 42 vertical edges (6 internal columns × 7 rows)

Both fit in a **64-bit integer**! We can represent all horizontal camels as one `int64` and all vertical camels as another.

```ocaml
(* Map (x, y, direction) to a unique bit index *)
let edge_index (x, y) = function
  | Down  -> x + 7 * y
  | Up    -> x + 7 * (y - 1)
  | Right -> x + 6 * y
  | Left  -> (x - 1) + 6 * y

(* O(1) check: is this edge blocked by a camel? *)
let is_blocked bitmask pos dir =
  let bit = Int64.shift_left 1L (edge_index pos dir) in
  Int64.logand bitmask bit <> 0L
```

Adding a camel? Just `OR` the bits. Checking a path? Just `AND`. 

**Before:** O(n) list scan per edge check  
**After:** O(1) bitwise operation

In a pathfinding BFS that checks ~50 edges across thousands of game states, this is easily a **10–100x speedup**.

---

## The Evaluation: How to Judge a Board

Searching deep means nothing if you can't *evaluate* the leaves. Here's the state evaluation function:

```ocaml
let evaluate state player_dist enemy_dist =
  if player_dist = 0 then  99999    (* I win *)
  else if enemy_dist = 0 then -99999 (* I lose *)
  else
    10 * (enemy_dist - player_dist)  (* Path advantage *)
    - 2 * state.enemy_camels         (* Opponent's resources *)
```

The components:

| Factor | Weight | Rationale |
|--------|--------|-----------|
| **Win condition** | ±99999 | Immediately return on wins |
| **Path length difference** | ×10 | Shorter path = closer to winning |
| **Enemy camels remaining** | −2 | Fewer enemy resources = advantage |

> **Why ×10 for path length?** Because all other factors must be "smaller" than path advantage. If moving one step closer and using a camel are weighted equally, the AI might oscillate.

### The Aging Trick

Two moves might both lead to winning. But we want to win *sooner*, not later. So we subtract a small "aging" penalty based on depth:

```ocaml
let win_score depth = 99999 - (max_depth - depth)
```

This ensures that winning in 2 moves beats winning in 4 moves, even though both are "winning."

---

## Combining Validation and Evaluation

A subtle but powerful optimization: in the *last* layer of the Minimax tree, we don't need to separate "is this move valid?" from "how good is this state?" 

Every camel placement requires BFS (to verify paths exist). Evaluation also requires BFS (to measure path lengths). That's two BFS calls per move!

**The fix:** Merge them. If the validation BFS fails, return `None`. If it succeeds, we already have the path lengths - return the evaluation immediately.

```ocaml
let eval_move state move =
  let new_state = apply move state in
  let player_dist = shortest_path new_state.player new_state.goal in
  if player_dist < 0 then None  (* Invalid: player blocked *)
  else
    let enemy_dist = shortest_path new_state.enemy new_state.enemy_goal in
    if enemy_dist < 0 then None (* Invalid: enemy blocked *)
    else Some (move, evaluate new_state player_dist enemy_dist)
```

One BFS instead of two. On the deepest layer (where most of the computation happens), this is a *50% reduction* in pathfinding calls.

---

## The Data Structure Yak-Shave: A Custom Queue

OCaml's standard library list operations are functional and elegant. But for BFS, we need a *queue* - first-in, first-out. Using `list @ [element]` for enqueue is O(n). Disaster.

**Solution:** The classic two-stack queue.

```ocaml
type 'a queue = { inbox: 'a list; outbox: 'a list }

let enqueue x q = { q with inbox = x :: q.inbox }

let rec dequeue q = match q.outbox with
  | x :: rest -> Some x, { q with outbox = rest }
  | [] -> match q.inbox with
    | [] -> None, q
    | _  -> dequeue { inbox = []; outbox = List.rev q.inbox }
```

- **Enqueue:** Push to the inbox - O(1)
- **Dequeue:** Pop from the outbox - O(1) amortized

The reversal only happens when the outbox is empty, spreading the O(n) cost across n operations. This is a textbook amortized analysis example!

---

## Results & Reflections

The final agent combined:

- Minimax with alpha-beta pruning
- Dynamic search depth (1–9 levels based on game phase)
- Bitmask state representation (O(1) edge queries)
- Smart move ordering (better pruning)
- Combined validation + evaluation (fewer BFS calls)
- Efficient queue implementation

### What I Learned

1. **Theory vs Practice:** Sometimes a highly complex algorithm slightly improving performance after a long coding session just gets beaten by trying out empirical tresholds for simple heuristics.

2. **Data representation is everything.** It's not all about algorithms only.

3. **Competition is motivation.** Would I have spent hours perfecting a queue implementation for a textbook exercise? No. But for a chance to beat my classmates? Absolutely.

Happy hacking! 🐪

---

*This AI-generated post documents ideas and approaches I developed during a university programming competition. The game framework and competition infrastructure are the intellectual property of the course team.*
