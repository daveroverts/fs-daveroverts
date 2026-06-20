# Generating a new post MDX from a YouTube event dump

Reference/prompt for turning a raw event + YouTube links into a blog post MDX
file. Kept here so it survives losing the ChatGPT chat that normally does this.

## How to use it

Paste the **instructions** block below plus the raw **input** into a fresh chat
(or do it by hand following the rules). Ask for two things:

1. The MDX file contents, copy-pasteable.
2. The MDX filename, copy-pasteable, with the `.mdx` extension.

## Instructions to give the model

> Output the MDX file so I can copy-paste. Also: give me a copy-able output of
> the MDX name **including** the `.mdx` extension. Example name for the input
> below: `2025-08-30-summer-in-amsterdam.mdx`

### Rules

- **Filename**: `<date>-<kebab-title>.mdx` — date is the leading `YYYY-MM-DD`
  from the input, title slugified (lowercase, spaces → `-`).
- **Frontmatter**:
  - `title` — the event name (no date).
  - `date` — quoted `YYYY-MM-DD`.
  - `category` — single value, the post type (e.g. `Timelapse`). This replaced
    the old `Timelapse` / `Vatsim` tags — do **not** put those in `tags`.
  - `tags` — remaining tags only (e.g. `Dutch VACC`). Omit `Timelapse` and
    `Vatsim`; they live in `category` / are dropped now.
  - `banner` — `/static/images/<slug>/banner.png` (same slug as the filename,
    without `.mdx`).
- **Body**:
  - First YouTube link → `<Youtube id="<video-id>" />` (id is the part after
    `youtu.be/`).
  - Remaining links → an `### Extra views` list, each `- [label](url)`, keeping
    the original label text (brackets in labels like `[EHAA_CTR]` stay).

> Note on the `.mdx` filename: a couple of legacy files were saved with a double
> extension (`...city-shuttle.mdx.mdx`). Always emit a single `.mdx`.

## Example

### Input

```
2025-08-30 Summer in Amsterdam

Approach + Ground view: https://youtu.be/dxwje29VxQM
ACC / Centre [EHAA_CTR] view: https://youtu.be/BFMEctiNRto
ACC / Centre [EHAA_CTR] view (alternate): https://youtu.be/D0a2neW9LIw
Approach [EHAM_APP]: https://youtu.be/St_NyHgZmuc
Ground [EHAM_GND/TWR]: https://youtu.be/wpeEYwWTDlw
```

### Output filename

```
2025-08-30-summer-in-amsterdam.mdx
```

### Output MDX

```mdx
---
title: Summer in Amsterdam
date: "2025-08-30"
category: Timelapse
tags:
  - Dutch VACC
banner: /static/images/2025-08-30-summer-in-amsterdam/banner.png
---

<Youtube id="dxwje29VxQM" />

### Extra views

- [ACC / Centre [EHAA_CTR] view](https://youtu.be/BFMEctiNRto)
- [ACC / Centre [EHAA_CTR] view (alternate)](https://youtu.be/D0a2neW9LIw)
- [Approach [EHAM_APP]](https://youtu.be/St_NyHgZmuc)
- [Ground [EHAM_GND/TWR]](https://youtu.be/wpeEYwWTDlw)
```
