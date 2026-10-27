# Payer Delta

[Public website](https://payerdelta.josephjilovec.com/) presenting a denial-to-packet workflow for medical billing and RCM teams.

## Current public implementation

A static HTML/CSS/JavaScript presentation with a five-part, entirely synthetic working file: remittance context, policy-source status, supporting-document checklist, illustrative draft, and human review questions.

The file exposes missing information instead of inventing policy citations or patient details. It has no upload, approval, claims submission, authenticated record access, or live clinical/billing integration. Private service capabilities and integration scope must be confirmed separately; a functioning public demonstration is not proof of them.

The original walkthrough email destination and Google Calendar booking link are preserved. Validation should inspect those links without sending an email or creating a booking.

## Behavior

The packet navigation progressively enhances the five ordinary page anchors into keyboard-operable tabs. Arrow keys, Home, and End move between sections. Without JavaScript, all five document pages remain readable in order. Source cross-references open the relevant page and move focus to its heading.

The existing #pipeline, #operational-focus, and #teams anchors remain available. The existing desk photograph remains in the repository but is not required to explain the document workflow.

## Deployment

No framework or dependency installation is required. Serve the repository root using the existing deployment arrangement. site.js can be checked with `node --check site.js`.

The parent venture studio and Kinetic repositories are outside this implementation's write scope.
