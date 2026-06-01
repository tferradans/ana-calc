# Anamorphic Calculator

A lightweight web tool for filmmakers to calculate field of view, vignetting, and diopter requirements when shooting with anamorphic adapters.

## What it does

Two calculators in one tabbed interface:

### Anamorphic Calculator

Given your lens and adapter setup, the calculator tells you the resulting horizontal field of view, the final aspect ratio, and whether vignetting is expected. It also works in reverse — input a desired hFOV and get the taking lens you need.

### Diopter Calculator

Given your lens's native focus range, calculates what diopter strength you need to achieve a target minimum or maximum focus distance — and vice versa.

---

## Anamorphic Calculator — Inputs

| Field | Description |
|---|---|
| **Taking Lens** | Focal length of your taking lens in mm |
| **Pancake Lens?** | Check if using a pancake lens — applies a wider vignette tolerance |
| **Camera/Sensor Size** | Crop factor of your camera body, or Custom for unlisted sensors |
| **Focal Reducer** | Speedbooster or similar, or Custom. Use None if not applicable |
| **Anamorphic Adapter** | The squeeze factor of your anamorphic lens, or Custom. Enable **Baby Scope?** for projection lenses used as adapters |
| **Single Focus Solution** | Rangefinder, FM Lens, or Rectilux attachment, if any. Reveals a focus distance slider that affects the hFOV calculation |
| **Sensor Aspect Ratio** | Native aspect ratio of your sensor |
| **Resulting hFOV** | Calculated horizontal field of view (equivalent focal length) |
| **Resulting Aspect Ratio** | Final desqueezed aspect ratio |

All dropdown fields accept a **Custom** option for unlisted values.

## Anamorphic Calculator — Outputs

**hFOV button** — calculates the resulting horizontal field of view and aspect ratio from your setup.

**I Want a Taking Lens** — works in reverse: given a desired hFOV and aspect ratio, calculates the taking lens focal length required.

**Will it Vignette?** — assesses whether the combination will produce full vignetting, dark corners, or no vignetting based on measured real-world data. Shows "Not enough data!" for combinations outside the known dataset.

**Max Effective Aperture** — input the rear element diameter of your anamorphic scope to find the maximum aperture before light transmission is lost.

The **lens chain diagram** at the top visualises your full setup — camera, reducer, taking lens, anamorphic adapter, and single focus solution — updating live as you change fields.

---

## Diopter Calculator — Inputs & Outputs

| Field | Description |
|---|---|
| **Max Focus Distance** | Your desired new maximum focus (right column). Left column is fixed at infinity |
| **Min Focus Distance** | Your lens's native minimum focus (left), and the new minimum with the diopter (right) |
| **Diopter Strength** | The strength of the close-up filter |

Any one value can be the unknown. Edit the fields you know and press **Calculate** — the calculator determines which value to solve for based on what you last changed.

---

## Usage

1. Fill in your setup values
2. Press **hFOV**, **I Want a Taking Lens**, or **Calculate** — or hit **Enter**
3. Invalid inputs are highlighted in red

## Sharing

After calculating, all settings are written to the URL as query parameters. Copy and share the link to send an exact configuration — the page auto-calculates on load.

## Offline / PWA

The app is installable as a Progressive Web App and works fully offline after the first load. Use the install prompt in your browser, or add to home screen on mobile.
