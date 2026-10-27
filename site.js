/* Progressive enhancement for a synthetic, non-submitting document example. */
(() => {
  "use strict";
  const nav = document.querySelector(".packet-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("[data-stage]")];
  const stages = links.map(link => link.dataset.stage);
  const context = {
    item: {title:"Keep the original context.",copy:"The example starts with the record being reviewed. A stable reference connects each part of the packet without inventing missing details.",focus:"Input and identity",status:"Synthetic remittance context"},
    source: {title:"A source is more than a citation.",copy:"Authority, version, timing, and applicability matter. This file keeps an absent policy visible instead of filling the gap with a plausible-looking quotation.",focus:"Source authority and date",status:"Authoritative policy source missing"},
    support: {title:"Presence is not completeness.",copy:"The checklist separates an example that exists from records that still need to be obtained and reviewed. No clinical records are attached.",focus:"Document availability and suitability",status:"Supporting information remains open"},
    draft: {title:"Structure does not prove readiness.",copy:"The draft preserves its links to the item and the open source questions. A polished document must not conceal missing evidence.",focus:"Traceable draft assembly",status:"Illustrative draft; not ready for submission"},
    review: {title:"Keep the last decision human.",copy:"An authorized reviewer needs the record, the basis, the gaps, and the workflow responsibility. This demonstration cannot approve or submit anything.",focus:"Biller responsibility and unresolved questions",status:"Human review required; open questions remain"}
  };
  nav.setAttribute("role", "tablist");
  const horizontal = window.matchMedia("(max-width: 900px)");
  const orientation = () => nav.setAttribute("aria-orientation", horizontal.matches ? "horizontal" : "vertical");
  orientation(); horizontal.addEventListener("change", orientation);
  links.forEach(link => {
    const id = link.dataset.stage;
    link.setAttribute("role", "tab");
    link.setAttribute("aria-controls", id);
    const page = document.getElementById(id);
    page.setAttribute("role", "tabpanel");
    page.tabIndex = 0;
    page.setAttribute("aria-labelledby", link.id);
    link.addEventListener("click", event => { event.preventDefault(); openStage(id); });
    link.addEventListener("keydown", event => {
      const index = stages.indexOf(id); let next;
      if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % stages.length;
      else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + stages.length) % stages.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = stages.length - 1;
      if (next === undefined) return;
      event.preventDefault(); openStage(stages[next]); links[next].focus();
    });
  });
  function openStage(id, focusHeading = false, updateAddress = true) {
    if (!stages.includes(id)) return;
    links.forEach(link => {
      const selected = link.dataset.stage === id;
      link.setAttribute("aria-selected", String(selected));
      link.tabIndex = selected ? 0 : -1;
      document.getElementById(link.dataset.stage).hidden = !selected;
    });
    const note = context[id];
    document.getElementById("context-title").textContent = note.title;
    document.getElementById("context-copy").textContent = note.copy;
    document.getElementById("context-focus").textContent = note.focus;
    document.getElementById("section-status").textContent = "Section " + (stages.indexOf(id) + 1) + " of 5 / " + note.status + ".";
    if (updateAddress) history.replaceState(null, "", "#" + id);
    if (focusHeading) document.getElementById(id + "-title").focus();
  }
  document.querySelectorAll("[data-open]").forEach(link => link.addEventListener("click", event => {
    const id = link.dataset.open;
    if (stages.includes(id)) { event.preventDefault(); openStage(id, true); }
  }));
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (stages.includes(id)) openStage(id, false, false);
  });
  const initial = location.hash.slice(1);
  openStage(stages.includes(initial) ? initial : "item", false, false);
})();
