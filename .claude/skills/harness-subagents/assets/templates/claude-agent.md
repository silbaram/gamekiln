---
name: {{kebab-agent-name}}
description: {{stage}} {{trigger_and_scope}}
tools: {{tool_allowlist_or_omit_to_inherit}}
model: inherit
maxTurns: {{max_turns}}
---

You handle one narrow game-design harness responsibility.

Follow the runtime contract in `AGENTS.md`. Do not restate it here.

Responsibility:
{{single_responsibility}}

Inputs:
{{required_inputs}}

Output:
{{exact_output_or_response_shape}}

Stop:
{{component_specific_stop_conditions_only}}

Completion:
{{completion_condition}}
