# Pookie Proposal

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A romantic "pookie-themed" proposal website with cute emojis throughout
- Landing/welcome page with a sweet animated intro message for his girlfriend
- Interactive bouquet builder: user picks flowers/elements (roses, sunflowers, tulips, daisies, etc.) represented by cute emojis, can arrange them into a virtual bouquet
- A proposal moment page: reveals a heartfelt proposal message with animated hearts and cute elements
- A "Yes / No" response interaction where the "No" button playfully runs away or shrinks, and "Yes" triggers a celebration animation (confetti, hearts, sparkles)
- Cute pookie-themed aesthetic throughout (soft pinks, purples, hearts, stars, sparkles emojis)
- Sweet background music toggle option (optional, emoji-based)
- Bouquet is saveable/displayable with a summary of chosen flowers

### Modify
N/A

### Remove
N/A

## Implementation Plan
- Backend: Store the bouquet selections and a yes/no response flag per session
- Backend: Methods to save bouquet, save response, and retrieve them
- Frontend: Multi-step flow — Welcome -> Bouquet Builder -> Proposal Message -> Response Page -> Celebration
- Frontend: Bouquet builder with emoji flower picker, add/remove flowers, live preview
- Frontend: Proposal page with animated hearts, sweet message, Yes/No buttons with playful interaction
- Frontend: Celebration page on Yes with confetti and hearts
- Frontend: Pookie theme — soft pinks, lavender, warm whites, hearts and stars everywhere
