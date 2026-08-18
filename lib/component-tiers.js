const COMPONENT_TIERS = Object.freeze({
  1: Object.freeze({
    agents: Object.freeze([
      "macro-designer",
      "prototype-coder",
      "cycle-reviewer",
      "stage-router",
    ]),
    skills: Object.freeze([
      "pitch-one-pager",
      "macro-design-5p",
      "forbidden-in-macro",
      "prototype-hypothesis",
      "disposable-prototype",
    ]),
  }),
  2: Object.freeze({
    agents: Object.freeze([
      "tech-decider",
      "vs-spec-writer",
      "scope-estimator",
    ]),
    skills: Object.freeze([
      "playtest-log-template",
      "tech-decision-template",
      "vs-spec-template",
    ]),
  }),
  3: Object.freeze({
    agents: Object.freeze([
      "art-director",
      "decision-recorder",
      "kill-arbiter",
    ]),
    skills: Object.freeze([
      "art-direction-5p",
      "decision-record-1p",
      "forbidden-meta-sections",
      "kill-criteria",
    ]),
  }),
});

function cumulativeComponents(tier, type) {
  const selected = [];
  for (let level = 1; level <= Number(tier); level += 1) {
    selected.push(...COMPONENT_TIERS[level][type]);
  }
  return selected;
}

module.exports = { COMPONENT_TIERS, cumulativeComponents };
