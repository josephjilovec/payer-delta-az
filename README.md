# Payer Delta Arizona

[Public website](https://payerdelta.josephjilovec.com/) for independent denial recovery, revenue integrity, RCM workflow support, payer intelligence, and cash forecasting for Arizona specialty practices and billing teams.

The homepage leads with the free S2 denial inventory review and commercial recovery offer. The continuing RCM and forecasting services have distinct sections. The recovery workspace and horizon explorer explain the service; neither contains client records, measured results, or a functioning claims portal.

## Hosting

Buildless HTML, CSS, and JavaScript. Compatible with the existing Vercel static deployment; no dependency installation or build command is required. Serve this directory as the site root. The canonical URL is `https://payerdelta.josephjilovec.com/`.

- `index.html`: page structure, service copy, metadata, and contact links.
- `styles.css`: responsive layouts, sticky recovery story, image treatments, and reduced-motion support.
- `site.js`: mobile navigation, progressive scroll reveals, recovery stages, and accessible forecasting tabs.
- `assets/`: responsive WebP images and image provenance.

Contact actions open the existing email and calendar destinations. Initial inquiries request organizational context only; the site has no file upload, account, backend, tracking script, or claim-submission action. Actual intake and service delivery arrangements are established separately.

## Checks

`node --check site.js` checks JavaScript syntax. Verify the mobile menu, Escape and keyboard focus behavior, forecasting tab Arrow/Home/End keys, responsive overflow, image loading, and reduced-motion behavior in a browser after changes. The site remains readable without JavaScript.

Commercial recovery and Medicare administrative preparation are presented separately. Filing windows depend on payer/product/stage. Any future outcome or case-study claim needs supporting evidence and permission before publication.
