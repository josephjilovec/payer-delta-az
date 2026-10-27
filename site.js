/* Progressive enhancement for a synthetic, non-submitting document example. */
(() => {
  "use strict";
  const nav = document.querySelector(".packet-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("[data-stage]")];
  const stages = links.map(link => link.dataset.stage);
  const context = {
    denial: {
      title: "Identify the stalled cash.",
      copy: "The denial arrives in your 835 remittance queue. High-volume billing teams lack the hours to research complex clinical necessity disputes, leaving cash unworked as the 180-day clock counts down.",
      focus: "CO-16 Medical Necessity Denial",
      status: "Initial Denial / Unworked Claim ($2,450.00)"
    },
    defense: {
      title: "Substantiate with policy, not prose.",
      copy: "We cross-reference the clinical encounter against exact payer Local Coverage Determinations (LCDs) and statutory billing guidelines, creating a defensible medical necessity packet with zero physician burden.",
      focus: "Statutory & Clinical Substantiation",
      status: "Turnkey Appeal Packet Ready for Review"
    },
    recovery: {
      title: "Collect the cash. Pay on results.",
      copy: "The payer overturns the wrongful denial. The recovered funds deposit directly into your practice bank account. We invoice our 22% contingency fee only after the money is collected.",
      focus: "Cash Collected / 22% Contingency",
      status: "Payment Overturned & Posted ($2,120.00)"
    }
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
    if (!page) return;
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
      const targetPanel = document.getElementById(link.dataset.stage);
      if (targetPanel) {
        targetPanel.hidden = !selected;
      }
    });
    const note = context[id];
    if (note) {
      const titleEl = document.getElementById("context-title");
      const copyEl = document.getElementById("context-copy");
      const focusEl = document.getElementById("context-focus");
      const statusEl = document.getElementById("section-status");
      if (titleEl) titleEl.textContent = note.title;
      if (copyEl) copyEl.textContent = note.copy;
      if (focusEl) focusEl.textContent = note.focus;
      if (statusEl) statusEl.textContent = "Stage " + (stages.indexOf(id) + 1) + " of 3 / " + note.status + ".";
    }
    if (updateAddress) history.replaceState(null, "", "#" + id);
    if (focusHeading) {
      const headingEl = document.getElementById(id + "-title");
      if (headingEl) headingEl.focus();
    }
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
  openStage(stages.includes(initial) ? initial : "denial", false, false);
})();
