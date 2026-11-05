# Reading Speed Trainer

Measure your reading speed and check understanding, then train with paced reading.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Reading Speed Trainer.exe` from the [latest release](https://github.com/Apurba94/toefl-reading-speed/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-reading-speed/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Reading speed matters on a timed test, but only with understanding. This app times how fast you read an academic passage, then checks understanding with its questions. Your speed counts only if you get them right. A paced mode shows one sentence at a time at a speed you choose, to build a steady rhythm.

Sections: Speed test, Paced reading, Progress, About.

## How to use it

1. In **Speed test**, press Start, read the passage at your normal pace, press Done, then answer.
2. Watch the history: aim to raise speed while keeping answers right.
3. In **Paced reading**, choose a speed a little above your own and follow the sentences.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
