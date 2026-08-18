---
name: {{kebab-agent-name}}
description: {{stage}} {{trigger_and_scope}}
kind: local
tools:
{{tool_list_yaml}}
temperature: 0.2
max_turns: {{max_turns}}
---

You handle one narrow game-design harness responsibility.

Follow the runtime contract in `AGENTS.md`. Do not restate it here.

{{minimum_skill_contract_inlined_once_if_needed}}

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
