# QUIZ_TEMPLATE.md

> CyberAtlas Quiz Template
>
> Version: 1.0

---

# Purpose

This template defines the standard format for every quiz question in CyberAtlas.

Questions should evaluate understanding rather than memorization.

Every question must have exactly one correct answer.

---

## Metadata

```yaml
id:
lesson:
difficulty:
estimatedTime:
points:
concepts:
tags:
```

Example

```yaml
id: q-001
lesson: lesson-04
difficulty: medium
estimatedTime: 45
points: 5
concepts:
  - Firewall
  - Defense in Depth
tags:
  - perimeter
```

---

# Question

```md
## Question

<question text>
```

Example

```md
## Question

Which security control provides the greatest protection against unauthorized inbound traffic?
```

---

# Scenario (Optional)

```md
### Scenario

<context>
```

Example

```md
### Scenario

A company has recently opened remote access for all employees using VPN.
The security team wants to reduce the attack surface exposed to the Internet.
```

---

# Diagram (Optional)

```md
:::
firewall-topology
:::
```

---

# Image (Optional)

Embed an image anywhere in the question text or the scenario:

```md
![[dmz-topology.png]]
```

The file must exist in `content/media/` or `content/assets/`. The embed is
stripped from the text and rendered below the scenario. A question that
describes a drawing must embed it — an embed of a missing file fails the
build.

---

# Answers

```md
A.

B.

C.

D.
```

Example

```md
A. Install an IDS

B. Deploy a Firewall

C. Disable DNS

D. Remove VPN
```

---

# Correct Answer

```yaml
correct: B
```

---

# Explanation

```md
### Explanation

Explain why the correct answer is correct.

Explain why the other answers are incorrect.
```

Example

```md
The Firewall filters incoming traffic before it reaches internal systems.

IDS detects attacks but does not block them.

DNS is unrelated.

Removing VPN does not solve the original problem.
```

---

# Learning Objective

```yaml
objective:
```

Example

```yaml
objective:
Understand the purpose of perimeter security.
```

---

# Cognitive Skill

Allowed values

```yaml
remember

understand

apply

analyze

evaluate
```

Example

```yaml
cognitive: analyze
```

---

# Question Type

Supported values

```yaml
multiple-choice

scenario

diagram

architecture

comparison

incident-response

attack-analysis

best-practice
```

---

# Difficulty

```yaml
easy

medium

hard
```

---

# Concepts Tested

```yaml
concepts:

- Firewall

- DMZ

- IDS
```

---

# Common Misconception

(Optional)

```yaml
misconception:
```

Example

```yaml
misconception:
Students often confuse IDS with IPS.
```

---

# AI Generation Rules

AI should:

- Create realistic scenarios.
- Use plausible distractors.
- Test conceptual understanding.
- Avoid trivia.
- Use cybersecurity terminology correctly.
- Ensure only one answer is correct.

---

# Example

```md
---
id: q-021
lesson: lesson-05
difficulty: medium
points: 5
estimatedTime: 60
concepts:
  - Firewall
  - Perimeter Security
cognitive: analyze
type: scenario
---

## Question

Which security control should be deployed first to reduce unauthorized inbound network traffic?

### Scenario

A small company is exposing a new web application to the Internet.

The application contains sensitive customer information.

### Answers

A. Install an IDS

B. Deploy a Firewall

C. Disable DNS

D. Remove HTTPS

correct: B

### Explanation

A Firewall filters unwanted traffic before it reaches the internal network.

IDS only detects attacks.

DNS is unrelated.

Removing HTTPS decreases security.

objective:
Understand the role of perimeter security.

misconception:
Students often believe IDS blocks attacks.
```

---

# Golden Rules

- Exactly one correct answer.
- Every distractor must be technically plausible.
- Prefer real-world scenarios.
- Test reasoning rather than recall.
- Always include an explanation.
- Questions should resemble university exam quality.