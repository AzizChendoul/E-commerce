#!/usr/bin/env python3
"""Validate the design-system token palettes against WCAG 2.1 contrast minimums.

Usage:  python3 design-system/scripts/check-contrast.py
Exits non-zero if any required pair falls below its threshold.
"""
import sys

LIGHT = {
    "primary": "#1C1917", "on-primary": "#FFFFFF",
    "secondary": "#44403C", "on-secondary": "#FFFFFF",
    "accent": "#A16207", "on-accent": "#FFFFFF",
    "background": "#FAFAF9", "foreground": "#0C0A09",
    "card": "#FFFFFF", "card-foreground": "#0C0A09",
    "muted": "#F5F5F4", "muted-foreground": "#57534E",
    "border": "#D6D3D1", "input": "#8C8681",
    "destructive": "#B91C1C", "on-destructive": "#FFFFFF",
    "ring": "#1C1917",
}

DARK = {
    "primary": "#FAFAF9", "on-primary": "#1C1917",
    "secondary": "#292524", "on-secondary": "#E7E5E4",
    "accent": "#D6A312", "on-accent": "#1C1917",
    "background": "#0C0A09", "foreground": "#FAFAF9",
    "card": "#1C1917", "card-foreground": "#FAFAF9",
    "muted": "#292524", "muted-foreground": "#A8A29E",
    "border": "#44403C", "input": "#78716C",
    "destructive": "#F87171", "on-destructive": "#1C1917",
    "ring": "#D6D3D1",
}

# (foreground, background, minimum, label)
# 4.5 = AA body text; 3.0 = non-text UI boundaries (WCAG 1.4.11).
#
# --color-border is deliberately absent: it is a decorative hairline between
# surfaces that are already distinguished by their own background, so 1.4.11
# does not apply to it. Any boundary that is the ONLY indicator of a control
# (text inputs, selects, checkboxes, outline buttons) must use --color-input,
# which is checked below.
PAIRS = [
    ("foreground",       "background", 4.5, "body text on page"),
    ("card-foreground",  "card",       4.5, "body text on card"),
    ("muted-foreground", "background", 4.5, "secondary text on page"),
    ("muted-foreground", "card",       4.5, "secondary text on card"),
    ("muted-foreground", "muted",      4.5, "text on muted surface"),
    ("on-primary",       "primary",    4.5, "primary button label"),
    ("on-secondary",     "secondary",  4.5, "secondary button label"),
    ("on-accent",        "accent",     4.5, "CTA button label"),
    ("on-destructive",   "destructive",4.5, "destructive button label"),
    ("accent",           "background", 4.5, "accent as link text on page"),
    ("accent",           "card",       4.5, "accent as link text on card"),
    ("input",            "background", 3.0, "input boundary"),
    ("input",            "card",       3.0, "input boundary on card"),
    ("ring",             "background", 3.0, "focus ring"),
    ("ring",             "card",       3.0, "focus ring on card"),
]


def _lin(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def ratio(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def check(name: str, tokens: dict) -> int:
    print(f"\n{name}")
    print("-" * 68)
    failures = 0
    for fg, bg, minimum, label in PAIRS:
        r = ratio(tokens[fg], tokens[bg])
        ok = r >= minimum
        failures += not ok
        print(f"  {'PASS' if ok else 'FAIL'}  {r:5.2f}:1  (min {minimum})  {label}"
              f"  [{fg} on {bg}]")
    return failures


def main() -> int:
    failures = check("LIGHT MODE", LIGHT) + check("DARK MODE", DARK)
    print()
    if failures:
        print(f"{failures} contrast requirement(s) not met.")
        return 1
    print("All contrast requirements met.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
