# Bishal & Aastha

## Current State
Single-page proposal app with:
- Welcome page
- Bouquet builder (save to backend)
- Proposal love letter
- Proposal yes/no page (save response to backend)
- Celebration page

Backend stores: bouquet (flowers list), proposal response (bool).

## Requested Changes (Diff)

### Add
- **Relationship timer**: Displays time together since May 21, 2025, counting years, months, days, hours, minutes, seconds live on screen.
- **Bouquet Builder**: Keep existing but enhance — both Bishal and Aastha can each build and save their own bouquet (two separate bouquets).
- **Letters section**: Both users can write typed love letters to each other and read the other person's letters. Letters have author, content, timestamp.
- **Handwritten notes section**: Both users can draw/write on a canvas and save as a PNG-encoded handwritten note. Notes displayed as images with author and timestamp.
- **Wedding Certificate / Legal Agreement page**: A decorative "wedding certificate" page showing both names (Bishal Dey & Aastha Sarkar), date of union, fields for signature/input. Certificate is styled ornately as a Gen-Z cartoonistic love certificate. Has an "I Do" button for each person to digitally sign.
- **Navigation**: Tab/section navigation between: Home (timer), Bouquet, Letters, Notes, Certificate.
- **Theme**: Gen-Z cartoonistic love theme — bubbly fonts, playful pastel gradients, cartoon hearts/stars, doodle-style borders, animated stickers.

### Modify
- Remove the old single-step proposal flow (welcome > bouquet > letter > yes/no > celebration). Replace with a multi-section app with persistent navigation.
- Existing bouquet builder: now has two bouquets (Bishal's bouquet for Aastha, Aastha's bouquet for Bishal).
- Backend: expand to store letters, handwritten notes, two bouquets, and certificate signatures.

### Remove
- Old linear step-by-step proposal flow (Step 0-4).
- Old `saveProposalResponse` and single bouquet backend.

## Implementation Plan
1. Generate new Motoko backend with: letters CRUD, handwritten notes CRUD, two bouquets (bishal/aastha), wedding certificate signatures.
2. Frontend: multi-page app with nav tabs: Home, Bouquet, Letters, Notes, Certificate.
3. Home: animated relationship timer since May 21 2025, big romantic hero section.
4. Bouquet: two side-by-side bouquet builders (one per person), both saved to backend.
5. Letters: text area to write letter, list of letters from both people, shown with cute card UI.
6. Notes: HTML5 canvas drawing pad to write/draw handwritten note, save as base64 PNG, display saved notes as image cards.
7. Certificate: ornate wedding certificate with Bishal Dey & Aastha Sarkar pre-filled, date input, "I Do" buttons for each person to sign digitally.
8. All sections use Gen-Z cartoonistic love theme: bubbly fonts (Pacifico, Nunito), pastel gradients, animated emoji stickers, doodle borders.
