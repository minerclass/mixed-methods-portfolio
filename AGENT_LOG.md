# Agent Log

Append-only record of automated and agent-assisted changes to this repository.

Purpose: this work happens from more than one machine, so local notes are not a
reliable history. Anything an agent should know about a past change belongs
here, in the repository, not in a local file.

## Conventions

- Newest entry first. Never rewrite or delete an existing entry; correct it with
  a new one that says what it supersedes.
- Record what was verified and how, not just what was edited. "Fixed" without a
  check is not a result.
- Record open items and known-failing things explicitly, so the next agent does
  not rediscover them or assume they are already handled.
- No participant data, transcripts, consent records, committee or faculty names,
  credentials, or tokens.

---

## 2026-08-31 - Adopt the shared tokens, and fix a contrast failure in the joint display

**Token adoption.** Links the shared token file and points `--bg`, `--text`, `--muted`,
and `--line` at it with pre-adoption fallbacks. The translucent glass panels stay local:
they are tinted overlays on the ground, not solid surfaces, so they should not become one.

**Contrast fix, self-inflicted.** The joint display added earlier today styles its strand
tags as coloured text on an 18% tint of the same colour. Measured against the real
composite (`--bg` plus the 5% header wash plus the 8% panel plus the 18% tint), the quan
tag measured **4.19** and failed AA. Lifted its text to `#a3c1ff`, which measures **5.48**
on that composite. The qual and integration tags already passed at 5.15 and 5.58 and were
left alone.

**A note on measurement.** An automated probe initially reported this tag at 3.52 against a
*light* backdrop on a dark page. That was the probe resolving the backdrop through a
gradient and falling through to white. The failure was real but the number was not; the
composite was recomputed by hand from the actual layer stack. Treat any contrast figure
taken through a gradient ancestor with suspicion.

---

## 2026-08-31 - Interactive joint display

**Context.** A read-only audit of the Tier 2-4 repositories found this repo to be the
largest interactivity gap in the ecosystem: four HTML files, roughly 77 KB, with **zero**
`<button>` or range inputs anywhere. The prose was already accurate and well organised,
including the framework asymmetry; what was missing was any way to work with it.

**Changed.** `index.html`, `style.css`, `script.js`.

- Added a `#joint-display` section between Methodology and Evidence Hierarchy, with a nav
  entry after Methodology.
- Three research-question tabs. Selecting one swaps a four-column display: focus, the
  QUAL priority strand, the complementary quan strand, and the integration question.
- A legend naming the four possible integration outcomes.
- Styles and behaviour appended to the existing `style.css` and `script.js`; no
  framework, no new dependency.

**The guardrail, which shaped the whole design.** A joint display normally shows results,
and this study has none. So every cell states **where evidence will sit and what
integration will ask of it**, phrased as a question, never as an outcome. The outcome
vocabulary is the study's own, taken from Phase 3 of the design on the same page:
convergence, expansion, divergence, silence. They appear only in the legend, explicitly
labelled as "determined only after analysis". A closing caveat states that the study is at
proposal stage with IRB approval pending, that no data has been collected, that no themes
exist, and that no integration outcome has been determined.

The three research questions are quoted verbatim from the controlling Chapters 1-3, so
RQ1 names all four participant perspectives.

**Why a real `<table>`.** A joint display is genuinely tabular, and a table gives screen
readers correct row and column semantics for free. Rather than restructuring it into cards
on small screens - which breaks the accessibility tree - it scrolls inside its own
`overflow-x: auto` region with `tabindex="0"` and an accessible label, so keyboard users
can scroll it and the page itself never scrolls sideways.

**Verified.** Served locally and driven in a real browser.

- Tag balance clean; zero console errors.
- All three tabs render distinct, correct rows (3 rows, 4 cells each), update the quoted
  research question, and keep exactly one tab with `aria-pressed="true"`. Returning to RQ1
  restores its content.
- 1440px: full four-column display within the 1160px container.
- 375px: **no page-level horizontal scroll**; the table scrolls within its own region.
- Keyboard: a real Tab press moves between the RQ tabs and the focused control matches
  `:focus-visible`.

**Pre-existing, not introduced, not fixed.** At 375px, ten `.code-line` elements elsewhere
on the page extend past the viewport. They sit inside their own scroll container and do
not cause page-level horizontal scroll, and they are unrelated to this change.

**Also worth knowing.** The page loads Font Awesome and GSAP from a CDN. The project
guidance prefers a lightweight dependency-free stack; that predates this change and was
left alone, but it is the obvious next cleanup here since GSAP is referenced only to
register a plugin that nothing uses.

No commit or push from this machine beyond the accompanying commit; see repository
history.
