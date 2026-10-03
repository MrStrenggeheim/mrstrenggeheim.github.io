---
title: "Walk With Me"
subtitle: "A one-week bet, three months of procrastination, and a scheduling app."
type: blog
date: 2026-10-02
author: Florian Hunecke
tags: [Web Development, Algorithms, Agentic Coding, Firebase, PWA, Visualization]
thumbnail: /assets/thumbnails/walk-with-me.webp
links:
  App: https://walkwith.meme
---

During Covid, my old friend group developed a considerable enthusiasm for walking. This carried on through our studies, to the point where we would go out every day, occasionally several times a day. Naturally, we had a dedicated WhatsApp group for this. Less naturally, arranging a walk sometimes seemed to require as much coordination as the walk itself.

Someone would announce that they were available. Someone else could join later, but only until a certain time. A third person lived at the other end of town. By the time we had agreed on a meeting point, the first person's availability might already have changed.

This would require another message, which would also reach all the people who had known from the beginning that they could not join anyway. At some point there was a small administrative job attached to going outside.

Over the Christmas holidays 2025, my friends challenged me to build an app for it in a week. I took that reasonably personally. A proof of concept followed, and then about three months of work in my free time. Conveniently, this also provided a seemingly productive way of procrastinating my exams. I can therefore only partially recommend the original deadline.

## A walk has an expiry date

The first useful observation was that “I want to go for a walk” has a beginning and an end. In a chat, this information is spread across several messages and has to be reconstructed by everyone reading them. In an app, it can simply be an availability window.

In Walk With Me, we specify when we are available and where we would start. The app suggests a compatible group and starting time for us to confirm. New people can join as they become available; notifications tell us when a match appears, someone joins, or friends have agreed to go.

The aim was to remove the recurring bookkeeping: checking who is still available and repeating the current plan. There is still a chat, attached to a particular occasion rather than accumulating every failed attempt to organise a walk since the beginning of the pandemic. Notification settings and distance filters help keep the remaining chatter useful.

We get ready inside fixed **activity groups**. Matching then creates temporary **meeting groups** for individual occasions, where we coordinate the exact time and place. The matched group expires, while its record stays for statistics.

```{=html}
<link rel="stylesheet" href="/works/walk-with-me/phone-screens.css">
<figure class="article-gallery">
  <div class="article-gallery__grid">
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/home-rain-light.webp" aria-label="Open the home screen in light mode"><img src="/works/walk-with-me/home-rain-light.webp" alt="The home screen with the same activity groups, friends’ availability and proposed walk, with rain arriving later in the forecast (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/home-rain-dark.webp" aria-label="Open the home screen in dark mode"><img src="/works/walk-with-me/home-rain-dark.webp" alt="The home screen with the same activity groups, friends’ availability and proposed walk, with rain arriving later in the forecast (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/context-detail-light.webp" aria-label="Open Maya’s map popup in light mode"><img src="/works/walk-with-me/context-detail-light.webp" alt="Maya’s availability, starting point and comment open above her map avatar (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/context-detail-dark.webp" aria-label="Open Maya’s map popup in dark mode"><img src="/works/walk-with-me/context-detail-dark.webp" alt="Maya’s availability, starting point and comment open above her map avatar (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  </div>
  <figcaption>When we are free, where we would start, and, in Maya’s case, whether there will be snacks.</figcaption>
</figure>
```

### One change, one useful notification

Becoming ready can mean several things at once: a friend is available, a friend joins an arrangement, and a new match appears. Sending a separate notification for every interpretation would recreate quite a bit of the WhatsApp problem.

The backend therefore collects notification candidates per recipient and keeps the most useful one. The priority is:

**New match → member joined → friend ready**

Stable stacking keys let later notices replace or group earlier ones. Node.js's [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) keeps context attached to an asynchronous call chain. Here, that gives each backend invocation its own notification queue, even when the server handles several in the same process.

## Finding the first possible moment

```{=html}
<div class="wwm-schedule-note">
  <div class="wwm-schedule-copy">
    <p>The time calculation is pleasantly small: take the latest beginning and the earliest ending of everyone's availability.</p>
    <p>The scheduling dialog gives “Back for dinner” an actual end time.</p>
    <p>For example:</p>
    <table>
      <thead><tr><th scope="col">Friend</th><th scope="col">Available from</th><th scope="col">Available until</th></tr></thead>
      <tbody>
        <tr><td>Flo</td><td>17:15</td><td>19:00</td></tr>
        <tr><td>Maya</td><td>17:45</td><td>19:30</td></tr>
        <tr><td>Leo</td><td>18:00</td><td>18:45</td></tr>
        <tr><td>Nora, joining later</td><td>18:30</td><td>20:00</td></tr>
      </tbody>
    </table>
  </div>
  <div class="wwm-inline-detail">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/schedule-detail-light.webp" aria-label="Preview the scheduling dialog in light mode"><img src="/works/walk-with-me/schedule-detail-light.webp" alt="Scheduling an offer from 18:00 to 19:30 at Universität München, with a 3 km matching radius and the comment Back for dinner." width="1074" height="1632" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/schedule-detail-dark.webp" aria-label="Preview the scheduling dialog in dark mode"><img src="/works/walk-with-me/schedule-detail-dark.webp" alt="Scheduling an offer from 18:00 to 19:30 at Universität München, with a 3 km matching radius and the comment Back for dinner." width="1074" height="1632" loading="lazy"></a>
  </div>
</div>
```

The first three can start at 18:00. With Nora, the shared window becomes 18:30 to 18:45. The maths is easy enough; whether fifteen minutes is an appealing walk remains a human decision.

```{=html}
<figure class="article-interactive">
  <iframe src="/works/walk-with-me/matching-demo.html" title="Interactive availability matching: select friends and drag the ends of their time spans to see the shared window" width="800" height="690" loading="lazy"></iframe>
  <figcaption>Choose the participants and move the marked edges of their time spans. This simplified example holds friendship and location compatibility fixed; it illustrates the time intersection used by the matcher.</figcaption>
</figure>
```

### Moving only when something changes

I also considered a **[sweep-line algorithm](https://algs4.cs.princeton.edu/93intersection/)** over availability interval endpoints. Sort the beginnings and endings chronologically, then sweep along the timeline, adding and removing people as their windows open and close. Between successive endpoints, the active set cannot change.

For person $u$, write their availability as $I_u=[s_u,e_u)$, with start $s_u$ and end $e_u$. Sorting the $m$ distinct endpoints gives $t_1<\cdots<t_m$. On $[t_i,t_{i+1})$, the active set is

$$
A_i=\{u\mid s_u\le t_i<e_u\}.
$$

With $n$ windows, there are at most $2n$ endpoints and $2n-1$ bounded segments to examine. There is no need to sample every minute: holding other compatibility rules fixed, new combinations appear only at the endpoints. This approach could also handle several separate slots per person.

The half-open intervals simplify this sketch; the app's overlap check includes shared endpoints. Availability alone does not make a suitable group, which leads to a graph and then Bron–Kerbosch. In the current matcher, time overlap goes directly into the graph's edges.

### Who belongs in the same group?

In the default walking group, being friends with me does not automatically mean that two other people are friends with each other.

After candidate filtering, let $V$ contain the eligible people. For the default walking group, using windows $I_u=[s_u,e_u]$, the compatibility graph $G=(V,E)$ is

$$
\begin{aligned}
G&=(V,E),\\
\{u,v\}\in E&\iff u\sim v\\
&\quad\land\;I_u\cap I_v\ne\varnothing,
\end{aligned}
$$

where $u\sim v$ means accepted friendship. A **clique** is a set where every distinct pair has an edge. Fixed activity groups use membership in that group in place of the friendship requirement.

The matcher uses **[Bron–Kerbosch with pivoting](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.clique.find_cliques.html)** to find maximal cliques containing the person whose availability changed: groups to which no further eligible person can be added.

```{=html}
<figure class="article-interactive">
  <iframe src="/works/walk-with-me/clique-demo.html" title="Interactive friendship graph: toggle connections to explore maximal walking groups" width="800" height="560" loading="lazy"></iframe>
  <figcaption>Toggle a connection or try a preset. Time compatibility is held fixed. The widget runs a pivoted Bron–Kerbosch search for maximal groups containing Flo.</figcaption>
</figure>
```

### The pivoted search

The search keeps three sets, $R$, $P$ and $X$:

| Set | What it contains |
| --- | --- |
| `R` | The group currently being built |
| `P` | People who could still join that group |
| `X` | People already explored on another branch |

Adding a person restricts both `P` and `X` to that person's neighbours. When both are empty, the current clique is maximal.

A useful distinction hides in one letter. A **maximum** clique is the largest group; a **maximal** clique is one that cannot be enlarged. Try “Different sizes” above: Flo, Maya and Leo form a triangle, while Flo and Nora form a pair. Both are maximal, even though one is smaller. Connecting all four people leaves fifteen nonempty subsets, but only one maximal group.

Choosing proposals that share no people would be another problem: **[set packing](https://mat.tepper.cmu.edu/orclass/integer/node9.html)**. For our walks, showing compatible opportunities and letting us choose was enough.

The pivot is the useful trick. Instead of branching on every remaining candidate, the search branches only on candidates outside the pivot's neighbourhood. Any maximal clique extending the current group must contain the pivot or someone not connected to it; otherwise the pivot could still be added.

<!--
This inner loop is a cornerstone of the app's matcher:

```typescript
const pivot = [...P, ...X][0];
const pivotNeighbors = adjacency.get(pivot) || new Set();

for (const v of [...P].filter(n => !pivotNeighbors.has(n))) {
    const neighbors = adjacency.get(v) || new Set();
    bronKerbosch(
        new Set([...R, v]),
        new Set([...P].filter(n => neighbors.has(n))),
        new Set([...X].filter(n => neighbors.has(n)))
    );
    P.delete(v);
    X.add(v);
}
```
-->

### From a clique to a concrete time

For a clique $C$, its common window $I_C$ has bounds $s_C$ and $e_C$:

$$
\begin{aligned}
s_C&=\max_{u\in C}s_u,\\
e_C&=\min_{u\in C}e_u,\\
I_C&=[s_C,e_C]\quad\text{if }s_C\le e_C.
\end{aligned}
$$

If $s_C>e_C$, there is no common window. Equality gives only a shared instant. Mathematically, an overlap, but not much of a walk.

This is the **[Helly property for intervals](https://www.math.utah.edu/~treiberg/HellySlides.pdf)**: pairwise overlap in a finite collection of continuous intervals guarantees a common point. The person who starts latest and the one who finishes earliest must overlap too. Their boundaries therefore give a window shared by everyone.

I quite like that an ordinary interface choice of one continuous availability window per person gives the matcher this guarantee. With several separate slots, every pair might find a time without there being one for all three. The implementation uses the common beginning for its automatic starting-time proposal.

Pivoting does not make clique enumeration cheap for arbitrarily large graphs. The app prioritises nearby candidates and caps the matching candidate set at twenty. For our use case, a bounded search was considerably more useful than an impressive algorithm left to run without limits.

### Both sides choose a range

For map activities, I kept two personal defaults: a **matching radius** for whom I am willing to meet, and a **notification/filter radius** for nearby offers I want to see. The home availability widget applies the filter around my saved default location; custom map groups use it for readiness notifications too. The defaults can differ between activities, and an individual offer can override its matching radius. I can keep an eye on a wider area without offering to walk all of it.

For location-based matching, I use the **[Haversine distance](https://www.movable-type.co.uk/scripts/latlong.html#distance)** $d_H$, a common mapping calculation for latitude/longitude coordinates on a spherical Earth. Writing $p_u$ for person $u$'s position and $r_u$ for their range, each candidate $u$ is compared with the person whose availability changed, $q$:

$$
d_H(p_q,p_u)\le\min(r_q,r_u).
$$

Both sides have to agree to the distance. Someone willing to travel three kilometres should not automatically pull in a friend who only wants to travel one. This filter compares candidates with the triggering person, not every candidate pair.

These checks are a practical first filter; they do not calculate walking routes or choose the perfect walk for us.

## The meeting point keeps moving

When someone joins, the suggested meeting point should take their position into account. A detail I quite like is that the previous average and member count are enough to update the centre, without fetching every coordinate again.

For $n$ members, let $\bar p_n$ be their average position and $p_{\mathrm{new}}$ the joining person's coordinates. The **incremental mean** update is

$$
\begin{aligned}
\bar p_{n+1}
&=\frac{n\bar p_n+p_{\mathrm{new}}}{n+1}\\
&=\bar p_n+\frac{p_{\mathrm{new}}-\bar p_n}{n+1}.
\end{aligned}
$$

Updating the mean takes $O(1)$ work. This is the actual helper used when extending a group:

```typescript
export function updateAnchorOnJoin(
    oldAnchor: { lat: number; lng: number },
    count: number,
    userLoc: { lat: number; lng: number }
): { lat: number; lng: number } {
    return {
        lat: ((oldAnchor.lat * count) + userLoc.lat) / (count + 1),
        lng: ((oldAnchor.lng * count) + userLoc.lng) / (count + 1),
    };
}
```

The previous centre and member count are saved with the group and updated together on a join. This is **incremental computation**: updating an existing result from what changed.

It is still an arithmetic average of coordinates, so it suggests a centre, rather than a necessarily suitable place to stand. There might be a building there. We can adjust the proposal ourselves, and the interactive map makes it easier to see what is nearby.

### Knowing when the algorithm should stop

The centre should move when someone joins. A café we have deliberately chosen should stay chosen. The same location field therefore needs to remember whether it is still an automatic suggestion or already a human decision.

Group metadata carries an update source (`auto`, `manual`, or `vote`) and separate override flags for the time, place and category. The matcher can update its own suggestions while preserving decisions we have made ourselves.

A location proposal can also be put to a majority vote in the chat. Counting votes and applying the result happen in one transaction, so simultaneous votes do not overwrite one another. The majority is recalculated from the current membership: with four people, two yes votes are still one short. A passed vote marks the place as a human decision. Remembering where a value came from turned out to matter almost as much as calculating it.

```{=html}
<figure class="article-gallery">
  <div class="article-gallery__grid">
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/group-vote-light.webp" aria-label="Open the location vote in light mode"><img src="/works/walk-with-me/group-vote-light.webp" alt="The temporary meeting group’s chat with two yes votes for a location proposal and three required for a majority (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/group-vote-dark.webp" aria-label="Open the location vote in dark mode"><img src="/works/walk-with-me/group-vote-dark.webp" alt="The temporary meeting group’s chat with two yes votes for a location proposal and three required for a majority (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/context-snacks-selected-light.webp" aria-label="Open the selected snack stop in light mode"><img src="/works/walk-with-me/context-snacks-selected-light.webp" alt="A compact Edeka Haxhijaj card with opening hours and accessibility information, above the map with friends and other snack stops still visible (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/context-snacks-selected-dark.webp" aria-label="Open the selected snack stop in dark mode"><img src="/works/walk-with-me/context-snacks-selected-dark.webp" alt="A compact Edeka Haxhijaj card with opening hours and accessibility information, above the map with friends and other snack stops still visible (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  </div>
  <figcaption>Two yes votes, one still needed. The map also helps with the equally pressing question of where to buy snacks and whether the shop is still open.</figcaption>
</figure>
```


### A small scheduling system for snacks

Adding parking and supermarkets sounded like a fairly small favour to our walks. It ended up requiring a coordinated request system of its own. Dragging a map produces overlapping requests; dragging it back should reuse old results, while a late answer for somewhere else should not take over the screen.

The **[Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)** searches OpenStreetMap's location data for these points of interest (POIs). My client breaks the map into fixed tiles and shares the request machinery across categories:

| Mechanism | What it does here |
| --- | --- |
| **LRU cache** and IndexedDB | Keep map tiles in memory and persist them across sessions |
| **Request coalescing** | Share one unfinished request among callers asking for the same tile |
| **Batching** | Combine different new tiles into one request |
| **Backpressure** | Gate a FIFO queue to one Overpass request in flight per browser context |
| **Generation counter** | Give each view a number; ignore results for an older view, even if they arrive later |

Coalescing and batching sound similar, but solve different problems: one avoids doing the same work twice, the other bundles different work. Old queued tiles can be discarded; requests already sent can still finish and warm the cache.

Failures release the queue in a `finally` block, and rate-limit responses pause it. Nearby tiles can be prefetched during idle time. It is quite a lot of machinery behind the question of where to buy snacks, but panning a map makes the reasons visible very quickly.

## An app is also its data model

The React/TypeScript frontend uses Zustand for state and Leaflet for maps, with Firebase behind the shared data and workflows. The data model needed considerably more thought than I had allowed for in the one-week bet.

Friendships live once, in a document keyed by the sorted pair of user IDs and carrying their request/acceptance state; groups store member IDs. “Flo is friends with Maya” and “Maya is friends with Flo” therefore identify the same relation. Queries fetch the relations and availability relevant to the current user or group.

The activity data has three deliberately different lifetimes:

| Data | Its job | Its lifetime |
| --- | --- | --- |
| Fixed activity group | Define the people, activity and matching mode | Ongoing |
| Temporary meeting group | Coordinate a particular meeting and its chat | Temporary |
| Match record | Keep lightweight history for statistics | Lasting |

A gym group can continue indefinitely, while Tuesday's arrangement should disappear from the active screen. Its match record survives the temporary chat, tracking membership and acceptance as plans change. Readiness history grows through Firestore's [`arrayUnion`](https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array) operation, which adds a timestamp only if that exact value is absent. Repeating a timestamp does not invent another offer.

Temporary groups use a renewable **lease**: meaningful activity pushes their expiry into the future. A separate **time to live (TTL)** makes old data eligible for deletion. Expiring on screen and physically removing records are deliberately different jobs; we need not wait for a cleanup task to discover that yesterday's invitation is over.

Group extensions use transactions, and **canonicalisation** helps recognise duplicate proposals: sort the member IDs, include the activity, and compute a [hash](https://developer.mozilla.org/en-US/docs/Glossary/Hash_function), a fixed-length fingerprint of that representation. These details matter particularly when several people become available almost simultaneously. “Just add another person” becomes less simple when two backend events try to do it at once.

### Getting the walk off my laptop

A group found by the matcher still had to reach my friends' phones. Vite builds the frontend; Firebase Hosting delivers it through a global [content-delivery network (CDN)](https://firebase.google.com/docs/hosting). Firebase Authentication handles accounts, avatar images go into Cloud Storage, and availability, groups and chats into Firestore.

Pressing Ready writes an availability document to Firestore. A [second-generation Cloud Function](https://firebase.google.com/docs/functions/version-comparison) receives that event, runs the matcher, and creates or extends groups. Scoped [`onSnapshot` listeners](https://firebase.google.com/docs/firestore/query-data/listen) load the relevant query results and then follow changes; subscriptions are cleaned up as their context changes. [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) handles push notifications. The functions run on Node.js 22 as managed Google Cloud Run services. “Serverless” still involves servers; somebody else gets to look after them.

For the **[progressive web app (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)**, a website installable like an app, [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/) generates the app manifest and uses [Workbox](https://developer.chrome.com/docs/workbox) to build a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). The manifest describes how the installed app appears; the worker is a browser-managed background script that caches frontend assets and handles incoming notifications. The interface can be cached on the phone, while matching still relies on the connection to Firebase.

### A cancelled offer should stay cancelled

The frontend shows readiness changes before the server confirms them: **optimistic UI**. An older subscription snapshot could then bring my offer back after I press Stop.

Cancelling therefore needs a local **tombstone**, a remembered deletion: a pending `null`, keyed by person and activity. It wins over the older snapshot until the server confirms the offer's absence.

After collecting the server's offers, this excerpt overlays pending local changes:

```typescript
for (const [key, pending] of Object.entries(pendingByKey)) {
    if (pending === null) {
        mergedByKey.delete(key);
        continue;
    }
    mergedByKey.set(key, pending);
}
```

A failed write restores the previous pending state. It is slightly counterintuitive that removing information requires temporarily keeping some information about its removal.

### The privacy questions I left open

I also spent time thinking about **end-to-end encryption**, where only the participants can read messages, as people dynamically join a conversation. A new participant changes who should have access to which messages. Another question was whether the app could compare our locations without letting the server read them. Encrypting coordinates is easy to suggest. Calculating with them afterwards is the less convenient part.

Two names helped separate the questions. A **zero-knowledge proof** proves a statement about a secret input without revealing that input. **Secure multiparty computation** lets several parties calculate something from inputs they keep private. [NIST's overview](https://csrc.nist.gov/Projects/pec/pec-tools) gives a useful introduction to both. For our matcher, I concluded that if each friend knows only their own coordinates, a proof alone does not supply the other private input needed to compare the two locations.

I considered coarse server-side filtering and exact matching on friends' devices, too. A phone that is offline or whose PWA is sleeping is an awkward place to put an essential part of the scheduler. There is also **metadata leakage**: concealing coordinates helps less if notification recipients reveal who was nearby. These remained design explorations. The current app uses server-readable coordinates and messages.

### Statistics, and a little competition

I also enjoyed adding statistics and the usual small pieces of gamification: streaks, scores and leaderboards. There are calendars, frequent partners, monthly match counts, geographic history and time-of-day patterns.

A readiness streak measures how consistently someone offered to join, which is useful to distinguish from actually completing a walk. The statistics are based on availability and accepted matches, rather than GPS-verified exercise.

Playing with streaks was fun, particularly when it motivated some friends to become ready for a walk a little more often. I had accidentally given our walking habit a small competitive element.

There is also “streak on ice”: accepted matches with a partner earn protection for missed readiness days. The balance is **derived state**, calculated from readiness and accepted-match history in chronological order, with at most three ice available per group. Frontend and backend share that calculation.

The backend saves small score and streak summaries alongside profiles: **denormalisation**, keeping derived copies where they are useful to read. A leaderboard can use those summaries without reconstructing everybody's history; refreshing them still requires the history. Readiness history stays owner-readable, while the public profile subset is available to other signed-in users.

```{=html}
<figure class="article-gallery">
  <div class="article-gallery__grid">
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/stats-light.webp" aria-label="Open the full activity statistics screen in light mode"><img src="/works/walk-with-me/stats-light.webp" alt="Activity statistics with the fictional friends’ avatars, a readiness streak, match score, and a September calendar containing three iced days (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/stats-dark.webp" aria-label="Open the full activity statistics screen in dark mode"><img src="/works/walk-with-me/stats-dark.webp" alt="Activity statistics with the fictional friends’ avatars, a readiness streak, match score, and a September calendar containing three iced days (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  <div class="wwm-phone">
    <a class="wwm-screen wwm-screen-light" href="/works/walk-with-me/stats-charts-light.webp" aria-label="Open the full analytics screen in light mode"><img src="/works/walk-with-me/stats-charts-light.webp" alt="Time-of-day patterns, monthly match counts and frequent partners derived from the same fictional accepted-match history (light mode)." width="1170" height="2532" loading="lazy"></a>
    <a class="wwm-screen wwm-screen-dark" href="/works/walk-with-me/stats-charts-dark.webp" aria-label="Open the full analytics screen in dark mode"><img src="/works/walk-with-me/stats-charts-dark.webp" alt="Time-of-day patterns, monthly match counts and frequent partners derived from the same fictional accepted-match history (dark mode)." width="1170" height="2532" loading="lazy"></a>
  </div>
  </div>
  <figcaption>A little encouragement, and a record of availability and matches.</figcaption>
</figure>
```

## Learning to work with agents

This project was my introduction to agentic coding, mostly with Claude Code. I did the whole thing on the $20 plan, which added another constraint to an already somewhat optimistic schedule. I had to learn how to give an agent enough context to make progress without spending the next session explaining the same decisions again.

Repository instructions gradually recorded architectural decisions, shared frontend/backend contracts, data shapes and checks to run. Having the reasoning alongside the code helped stop agents from reopening solved problems or introducing another implementation of logic that already existed.

### From a pull request to my phone

GitHub Actions builds the app and saves the compiled frontend as a **build artifact**, which deployment can reuse. Pull requests receive numbered [Firebase Hosting previews](https://firebase.google.com/docs/hosting/test-preview-deploy); newer commits cancel older runs, helping the link keep up with my corrections. The previews have separate frontend URLs, but deploy functions to the shared backend. I could try a change on my phone and ask the agent to adapt it.

On `main`, ESLint, Vitest and Jest come first. [semantic-release](https://semantic-release.gitbook.io/semantic-release/) reads the commit messages, chooses a [semantic version](https://semver.org/), and prepares the changelog and GitHub release. A new version triggers a fresh frontend build because Vite embeds it in the app and icon URLs; otherwise deployment reuses the saved artifact. Firebase’s Hosting action publishes it, while the CLI rebuilds and deploys the functions. Rules and indexes are deployed separately.

Deployments use a **service account**, an identity for automation, with credentials kept in [GitHub Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets). This is separate from the Firebase Authentication accounts used by my friends.

```{=html}
<figure class="article-interactive wwm-ci-diagram">
  <iframe src="/works/walk-with-me/ci-cd-demo.html" title="Interactive CI/CD pipeline: switch between a pull request and main to follow the active jobs and the phone feedback loop" width="800" height="680" loading="lazy"></iframe>
  <figcaption>A pull request gets a link for my phone. A release gets a version—and sometimes another build. The useful part is the loop in between.</figcaption>
</figure>
```

### The phones, and then the people

The most difficult practical issue was getting the experience to work across our different iOS and Android devices. Without an Apple developer account, I settled on a progressive web app. It could be added to the home screen and gave us a working proof of concept, while leaving some platform-dependent limitations.

Then came the other deployment problem: convincing the whole friend group to use it. The experience had to be at least as convenient as sending a message to the group everyone already had. A clever matching algorithm alone was unlikely to win that argument. The cleaner conversations, maps, useful extras and history made the case much more convincing.

## Walks, gym sessions, gaming evenings

Somewhere along the way, I realised that the recurring element was the activity itself. The time could change on every occasion. Walking was one example; gym visits and gaming evenings had much the same coordination problem.

This led to three matching modes. Location matters for a walk. For a gaming group, the relevant choice might be which game everyone wants to play. If we always meet at the same gym, time can be the only changing parameter. Permanent groups define that context, and each new availability window produces another opportunity to get together.

```{=html}
<figure class="article-diagram">
  <div class="article-modes" role="group" aria-label="Three matching modes">
    <div class="article-mode"><span>01 / Location</span><strong class="article-card__title">A walk nearby</strong><p>Overlapping time and compatible location ranges.</p></div>
    <div class="article-mode"><span>02 / Topic</span><strong class="article-card__title">A game together</strong><p>Overlapping time and a compatible game choice.</p></div>
    <div class="article-mode"><span>03 / Time</span><strong class="article-card__title">The same gym or table</strong><p>A fixed group and activity. Only availability changes.</p></div>
  </div>
  <figcaption>The same availability model, with a different question about compatibility.</figcaption>
</figure>
```

## A sixth-floor extension

The app is occasionally used, and development has been paused since I started my internships. I did introduce it to my colleagues at Stripe, where it found another application: scheduling our table tennis breaks on the sixth floor. That was a rather enjoyable confirmation that the generalisation had some practical value.

Looking back, the project gave me a first substantial experience of building with coding agents, an appreciation for efficient data models, and quite a few opportunities to discover what “works on my phone” leaves unresolved. It also brought me back to something I have always enjoyed about programming: taking an everyday inconvenience seriously enough to see what I can make of it.

The original challenge concerned whether I could build it in a week. The following three months suggest that I should be more careful about what counts as finished.
