---
title: "Designing an AI Native System from Scratch"
date: 2026-03-28
lastmod: 2026-03-28
draft: false
description: "AI native system design: designing systems for agents from the ground up instead of retrofitting. Agent organization and architectural principles."
summary: "Instead of retrofitting agents into existing systems, I discuss what it means to design a system for agents from the ground up and how agent organization should be structured."
slug: "ai-native-system-design"
keywords: ["AI native", "agent system", "AI architecture", "agentic system", "system design", "multi-agent"]
tags: ["ai", "agent", "agentic-system", "architecture"]
categories: ["technology"]
images:
  - "/images/ai-native-hero-eng.png"
author: "Sami Tuğal"
---

![Designing an AI Native System from Scratch](/images/ai-native-hero-eng.png)

## Introduction

In my [previous blog post]({{< relref "knowledge-infrastructure.md" >}}), I talked about the challenges of making existing systems compatible with agents. Existing systems were designed with humans in mind, knowledge was embedded in people's heads, and agents were being retrofitted into this structure after the fact.

In this post, I wanted to flip that question. What should we do if we don't want to deal with this problem at all? What does it look like to design a system from scratch, knowing that agents will be working within it?

Let's design a workflow: when a Jira ticket is created, delegate it to an agent. The agent picks up the ticket, processes it, and updates Jira. It sounds simple enough, but to make this workflow work, the agent doesn't just need access to APIs — it needs to truly understand the system. The system built from scratch needs to be AI-native so that agents can operate at any point within it.

First, let's clarify what the AI Native concept means. Then we'll see how a system designed with this philosophy differs at the codebase level. Finally, we'll look at how the agents that will maintain this system should be organized.

## What Does AI Native Mean?

The essence of the AI Native concept boils down to a fairly simple question:

>"Was AI added to this system after the fact, or was the system designed from the beginning to work with AI?"

In my previous blog post, I explained that the vast majority of systems are designed as **human-centric**. After the AI hype wave, we're trying to make AI usage possible by adding various integrations on top of these systems.

However, this approach often falls short. Because the system itself was not designed to be **readable, understandable, and manageable** by AI.

In AI Native systems, the approach is different. When an agent is deployed, the system doesn't just offer a structure where it can call certain APIs. Instead, it provides a knowledge infrastructure where the agent can understand the system's overall structure, business domain, and existing operations.

For this reason, code development, database design, and deployment processes must be conducted according to specific standards.

For example, in many organizations, code development processes are governed by standards set by **Code Governance** teams. These rules must be documented in a way that is meaningful not only for humans but also for agents that will generate code or manage the system.

Similarly, domain knowledge, data models, and business processes related to the agent's working domain must be defined in a structured manner and made available for agents to use.

Consider enterprise resource planning (ERP) applications, for example. In such systems, domain knowledge is extremely dense and is often understood only by people who have used the system for a long time.

To give a concrete example, when someone says *issuing an invoice* in the ERP world, it has a specific meaning and process. Many details — which data will be created, which checks will be performed, which records will be updated — are a natural part of this operation.

A human user can learn this process over time. However, for an agent to perform the same operation correctly, this information needs to be explicitly and structurally defined within the system. Imagine a wiki page for the ERP system where the meaning of the Invoice Issuance process, which tables are written to, and which checks are required are clearly defined. When the agent can access this information, it can execute the process correctly.

### Traditional Systems vs AI Native Systems

The vast majority of traditional software systems are designed with human users in mind. Interaction with the system mostly happens through user interfaces, and knowledge about how business processes work is often stored within people's experience.

This usually doesn't create a problem for humans. A new employee gradually learns to use the system, grasps business processes through experience, and fills in the gaps by asking other team members.

However, the same doesn't apply to an AI agent. For an agent to use the system correctly, it's not enough for APIs to simply exist. Certain information about the system needs to be defined in an explicit, consistent, and machine-understandable format.

In AI Native systems, the architectural approach is therefore different. The system is conceived not only as an interface that human users interact with, but also as an operational environment where agents can work.

In this approach, system capabilities are presented as explicitly defined functions, domain knowledge is not left solely to human experience, and business processes are made as trackable by machines as possible.

Thanks to such an architecture, an agent ceases to be a passive tool that merely makes a single API call. Instead, it becomes an actor that can understand the system, discover available capabilities, and autonomously execute specific business processes.

![Traditional Systems vs AI Native Systems](/images/traditional-vs-ai-native-eng.png)

Let's close this section with a small thought experiment. In most organizations, this situation occurs: the system runs for years, but only three to five people truly understand it. When the people who know the work leave, the knowledge leaves with them. The AI Native approach tries to capture this hidden knowledge and embed it into the system itself. The transition of knowledge from human memory to a machine-readable structure — this is exactly where the quiet but profound transformation of software architecture begins.

## AI Native System Design

### Example Scenario: Agentic ERP System

We're building an ERP system from scratch. Humans will write the first phase, then agents will take over. Maintenance, bug fixes, new feature development — the responsibility for these operations will gradually shift to agents. So how should we write the system differently from the start to make this handover possible?

Let's make it concrete. A Jira ticket was opened: "Add VAT exemption to the invoice module." The agent picks up this ticket and looks at the codebase. What does it see?

If we didn't design the system as AI Native, it probably sees this: functions exist, they work, but it's unclear why they were written that way. VAT calculation happens somewhere, there's no comment about under which conditions exemption applies, and the business rule is buried in the code. The agent can't figure out where to make the change. Worse, if it makes it in the wrong place, invoicing breaks. If invoicing breaks, the customer makes errors and gets fined. Then they hold us responsible, and so on. This doomsday scenario never ends.

This scenario is not an AI problem — it's a system design problem.

### The Codebase Is an Interface

In the traditional view, the codebase is written for human developers. Comments are optional, naming conventions vary by team, and business rules live sometimes in the code, sometimes in a wiki, and usually in the senior developer's head.

If we want to build an AI Native system, this understanding must change. The codebase is no longer just for humans — it's also an interface for the agents that will take over the system. When an agent opens a module, it needs to understand not only what it does but also why it was designed that way.

What does this mean in practice? The comment above a function must now explain not "what this does" but "why it does it this way." Module boundaries are not drawn randomly but determined according to domain boundaries. Architectural decisions are written as Architecture Decision Records — otherwise, the agent might misunderstand the same decision and reverse it. The knowledge that a senior developer carries in their head — like "don't call this service directly, always go through this facade" — must be explicitly represented in the code.

```python
# Bad example: Describes what it does, not why
def calculate_vat(amount: float, is_exempt: bool) -> float:
    """
    Calculates VAT for the given amount.
    params:
        amount: float - The amount to calculate VAT for
        is_exempt: bool - Whether the amount is exempt from VAT
    returns:
        float - The calculated VAT amount
    """
    if is_exempt:
        return 0.0
    return amount * 0.20
```
 
```python
# Good example: The agent sees what it needs to know before making changes
def calculate_vat(amount: float, is_exempt: bool) -> float:
    """
    Calculates VAT based on Turkish tax regulation (KDV).
 
    Business rules:
    - Standard VAT rate is 20% (updated from 18% in July 2023, TR legislation).
    - Exemption applies to: exported goods, medical supplies, educational materials.
    - is_exempt flag must be set by the caller; this function does not determine
      eligibility. Exemption logic lives in InvoiceService.resolve_vat_exemption().
 
    WARNING: Do not hardcode the rate elsewhere. If legislation changes,
    update VAT_RATE in config/tax_constants.py — this function reads from there.
    """
    if is_exempt:
        return 0.0
    return amount * VAT_RATE
```

In the examples above, in the arguably bad example, the agent sees the 0.20 value but doesn't know why it's 0.20. Who determines the exemption, can this value change, where should it be updated if it changes — it can't see any of this. It looks at this function to add VAT exemption and touches the wrong place.
In the good example, the agent sees the full context before making any changes: the source of the rate, where the exemption logic lives, and what it shouldn't touch.

Don't mind me calling it a bad example — in most places, there isn't even this much detail in comments across the entire codebase.

These are things that good software engineering already requires. The difference with being AI Native is this: these rules are no longer optional. The agent doesn't forgive. If information is written, it uses it; if it's not written, it guesses — and guessing doesn't always work.

![Traditional Codebase vs AI Native Codebase](/images/traditional-vs-agentic-codebase-eng.png)

### Domain Model

Codebase-level cleanliness isn't enough. The agent also needs to understand the business domain the system operates in.

Let's return to the ERP example. Issuing an invoice is not a function call — it's a business process. Which tables are written to, which checks are performed, under which conditions the transaction is rejected, under which conditions VAT exemption applies. All of these questions are business rules, and the vast majority of them currently live either in someone's head or on a scattered wiki page.

In an AI Native system, domain knowledge is represented in a structured manner. What each business process means, which data models it affects, and which constraints it's subject to are explicitly defined and made accessible to agents. This could be a wiki page, a structured annotation within the code, or a separate domain documentation layer. The format doesn't matter; what matters is that this information exists and is kept up to date.

Let me also add a small note here. Code snippets and their related documentation should be linked to each other in some way. You shouldn't have the expectation of "I wrote the code, I wrote the documentation, let the agent figure it out."

```python
@(domain_reference="erpwiki.com/invoice/vat")
def calculate_vat(amount: float, is_vat_exempt: bool = False) -> float:
    """
    Calculates VAT based on Turkish tax regulation (KDV).
 
    Business rules:
    - Standard VAT rate is 20% (updated from 18% in July 2023, TR legislation).
    - Exemption applies to: exported goods, medical supplies, educational materials.
    - is_exempt flag must be set by the caller; this function does not determine
      eligibility. Exemption logic lives in InvoiceService.resolve_vat_exemption().
 
    WARNING: Do not hardcode the rate elsewhere. If legislation changes,
    update VAT_RATE in config/tax_constants.py — this function reads from there.
    """
    if is_vat_exempt:
        return 0.0
    
    return amount * VAT_RATE
```

When a human starts as a new developer, they learn this knowledge over time through experience. For the agent, this process doesn't exist. Either the information is written, or the agent doesn't know it.

### Memory and Context Management

When an agent picks up a Jira ticket and dives into the codebase, one of the most concrete problems it faces is context management. Processing an entire large codebase is not possible. The agent must decide which information to load and when, which to keep temporarily, and which to commit to long-term memory.

This decision becomes easier or harder depending on how you designed the system from the start. If module boundaries are clearly drawn, the agent doesn't load irrelevant areas. If domain knowledge is in an accessible structure, the agent reaches the information it needs directly instead of scanning the codebase from scratch every time. If dependencies are explicitly defined, the agent can calculate the ripple effect of a change in advance.

In a poorly designed system, the agent either loads too much into its memory and loses its context, or makes a faulty decision unaware of critical information. This is, once again, not an AI problem — it's a consequence of the system not being readable by agents.

## What About the Agents?

Let's say we've designed the system as AI Native up to this point. Of course, the things we've discussed are not minor tweaks, but let's assume our codebase is readable and followable by agents, domain knowledge is structured, and dependencies are explicit. Now we come to another question: how should we organize the agents that will maintain this system?

### Why a Single Agent Isn't Enough

Let's return to the Jira ticket: "Add VAT exemption to the invoice module." If a single agent takes on this task, what does it need to do? First, it will analyze the ticket, then find the relevant modules in the codebase, identify affected areas, check domain rules, write the change, test it, and report the result.

Each of these steps requires a different context. While analyzing the codebase, the agent must keep the invoice module's dependencies in memory. While writing code, it must think about the testing strategy. While checking domain rules, it must see the entire business process. If a single agent handles all of these sequentially, its context bloats, it slows down, and at some point it loses a critical piece of information.

Why don't human teams work this way? Because they divide the work. One person analyzes, one writes, one reviews. Their areas of expertise differ and they work in parallel. The same logic applies to agents, and I believe this approach makes the most sense.

### Orchestrator Pattern

In the orchestrator pattern, there is a central coordinator agent. This agent takes the task, analyzes what needs to be done, and distributes the work to specialist agents. Each specialist agent works in its own domain: one examines the codebase, one checks domain rules, one writes the code, one runs the testing process. The coordinator collects these outputs, combines them, and reports the result.

The strongest aspect of this architecture is control. Every step is traceable, the source of every decision is known. If something goes wrong, it's possible to look back and see which agent made which decision with which information. In systems where critical business processes like ERP run, this traceability is very important. You want to know whose decision resulted in an incorrect invoice record.

At this point, let me share my own preference. Software development processes are more or less well-defined. A Jira ticket is opened, someone picks it up, develops it, sends it to testing, if the test fails it goes back to development, if it succeeds it goes to production. Rather than having a single coordinator agent manage the entire process, I'd prefer each phase to have its own workflow and its own agents. Like a state machine. Each workflow is a state, each transition is a rule.

### Mesh Pattern

In the mesh pattern, there is no coordinator. Agents work by communicating directly with each other. The codebase analyst passes context to the code writer, the code writer tells the tester what to test. Work flows without a central authority.

This approach is more flexible and more scalable. The coordinator bottleneck is eliminated, agents can work in parallel. However, this flexibility comes at a cost: it becomes harder to track what the system is doing. When something goes wrong, responsibility is distributed and finding the source of the error is difficult.

![Orchestrator vs Mesh Pattern](/images/orchestrator-mesh-eng.png)

### Which One to Choose?

Both architectures have valid use cases. But for a system that runs critical business processes like ERP, in my opinion the orchestrator pattern is the more appropriate choice.

Why? Because error tolerance is low in these systems. A wrongly written invoice, an incorrectly applied exemption rule, or an unexpected dependency change can have serious consequences. The orchestrator pattern manages this risk through centralized control and traceability. The flexibility of mesh doesn't meet this need for control.

Of course, this is a preference, not a universal rule. I just mentioned that I'd also prefer workflows. In less critical, more exploratory systems, the mesh pattern can be extremely efficient. But whichever architecture you choose, if the underlying system isn't designed as AI Native, no matter how good the agent coordination is, it can't compensate for the lack of context.

## Conclusion

In this post, we tried to answer two questions. First: what should we do differently when designing a system from scratch that agents will work in? Second: how should we organize the agents that will maintain this system?

The answers to these two questions are not independent of each other. No matter how well you build the agent architecture, if you don't design the system as AI Native, agents will fly blind. No matter how well you think through agent organization, if the underlying system isn't readable, agents will make mistakes.

In the previous post, I talked about the difficulty of making existing systems compatible with agents. This post is the answer to that problem: if you're building from scratch, you can eliminate this difficulty from the start. But to do so, you need to treat AI not as a feature but as a design principle of the system.

Ultimately, this is not an artificial intelligence issue. Writing a readable codebase, structuring domain knowledge, organizing agents correctly — all of these are things that good software engineering already requires. Being AI Native is simply about moving these principles from optional to mandatory.
