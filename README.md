ClickBeetleJS
===========

**The objective.**

To create a full-featured, modern menu script built from the perspective of accessibility first.


**An introduction.**

ClickBeetleJS (originally just clickbeetle) is a project to create a simple to use, robust menu system in Javascript.  Though this is not a particularly new idea and there are possibly hundreds of ways to create menus for websites and apps, the missing piece is accessibility.

Not all websites are concerned with accessibility, though they probably should be, there are many sectors both public and private where accessibility is not only a nice to have or should have, but instead it is required either by law or by some sort of evaluating agency.

As it stands, backfilling accessibility features in an existing menu is surprisingly difficult.  Often it involves overhauling the behavior of the menu and, potentially costing many work hours.

The concept of ClickBeetle is that accessibility is addressed first.  Regardless of whether the menu requires a hover state, a focus state, tabbing or other behavior, all of these should be implemented while preserving all accessibility features required by the WCAG specifications.


**The goals.**

- [x] Provide a mechanism for keyboard navigation through the menu (tab and shift-tab navigation)
- [x] Add/remove hide and show classes dynamically for browsers which have Javascript disabled or are not Javascript enabled
- [x] Add role attribute to menus
- [ ] Allow hover state interaction through class name
- [ ] Allow click state interaction through class name
- Testable and well tested code (This is ongoing)


**Contributions.**

If you would like to contribute to the project, please feel free to fork it. If you have an addition or improvement and you would like to include in the codebase, please make a pull request and provide unit tests for all testable code.  If things get crazy I might make this more formal.

If you have a bug, please post a bug report and I'll look into it if/when I have time. If the bug is related to something under the goals and you don't see it checked off, please wait. It is in the works, I promise.


**The license.**

ClickBeetleJS is released under the MIT license.  Lawyers, please read the license document. For the rest of you, please read below:

All contributions are appreciated and encouraged.  Use this as you like. Though I hope this script is helpful and works, I won't guarantee it does anything. At all. Period. I'll help you if I can.

Cheers!