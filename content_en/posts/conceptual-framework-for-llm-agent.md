---
title: "A Conceptual Framework for LLM-Based Agent Systems"
date: 2026-01-11
draft: false
summary: "I attempt to build a framework-agnostic conceptual model that covers the core components of LLM-based agent systems and the relationships between them."
tags: ["llm", "agent", "agent-framework"]
categories: ["ai"]
---

## 1. Introduction
Due to my work, I have been working with LLM-based AI Agents for a long time. I’ve even written agent frameworks from scratch a few times, and from time to time I dig into and debug the source code of open-source agent frameworks. I do this to see whether a new feature has been added, what changed in the architecture, and to make sure I don’t fall behind the pace of the industry.

During this process, I noticed something: even though names, APIs, and abstractions change, almost all agent frameworks are built from the same fundamental components.

There is a memory layer that holds conversation history. It may have different types, strategies, and usage patterns, but it serves the same purpose. There is an LLM. There is a set of tools that give this LLM “superpowers.” There is a session initiated by the user, and within that session messages flow and outputs are produced.

Over the last three years, the agent ecosystem has evolved at an incredible pace and seems to have reached a kind of common structure unintentionally. Of course, there is no guarantee that this won’t change in the coming months. This field is full of surprises.

Another thing I noticed is that most of the papers and studies I read focus on how to make these components more efficient. They try to answer questions like: how can memory be optimized, how can tool calls be improved, how can orchestration be made smarter?

In contrast, I haven’t seen much work that brings these components together, answers the higher-level question “what makes an agent an agent?”, and clearly reveals the relationships between the components.

In my earlier post, *Metadata Management and the MOF Concept*, I mentioned that things in the world can be treated as entities, and that by identifying shared properties we can move up to higher-level contracts. I wondered: why not apply the same perspective to LLM-based agents?

## 2. The Mistake of Thinking of an Agent as a Single Thing
Contrary to popular belief, LLMs do not come with “superpowers” out of the box. At its core, an LLM is a massive autocomplete mechanism. What makes an LLM autocomplete and what makes an agent are not the same thing. Turning an LLM into an agent is not a single step—it requires passing through multiple layers.

Let’s start with the simplest example: LLMs are stateless. In other words, there is no natural connection between your first request and your second request. On every call, the model starts from scratch and does not “remember” the previous context. That’s why we add a memory component to an LLM—so it can know what was discussed in the past and what steps have already been taken. And it doesn’t stop there. We need prompts that define the domain expertise the LLM will operate in. These prompts need to be managed, versioned, and designed to be resilient against attacks like prompt injection. And for the agent to actually complete what the user asks, it needs tools it can interact with. Accessing the file system, calling APIs, processing data, or touching the outside world happens through this layer.

The list can go on. But the core idea doesn’t change: an LLM alone is not an agent.

We can think of an LLM as a brain. But a brain alone is not an organism. Without layers that protect the brain, enable interaction with the outside world, and provide the ability to act, we can’t talk about a healthy body. An agent is exactly what emerges when these layers come together.

## 3. Core Components That Make Up an Agent
We’ve seen why it’s wrong to think of an agent as a single entity. In reality, an agent is not a singular thing—it is a structure formed by multiple entities coming together in specific relationships. Different frameworks may present these components under different names. But in practice, when we look closely, we see that almost all LLM-based agent systems use the same foundational entities.

In this section, I will try to discuss the core components that make up an agent and the relationships between those components in a framework-agnostic way.

## 3.1. The Agent Core Layer
At the center of all the components that make up an agent, there is a core that holds the system together. This core is the “agent” concept itself—one that is often misunderstood.

In many places, agents are positioned as if they are entities that directly do work. But in practice, an agent is not a component that directly performs work. The agent’s true role is to make decisions, provide direction, and manage orchestration.

An agent evaluates the input it receives, looks at the current context, uses past interactions when needed, and decides what the next step should be. That step may be to generate a message, call a tool, or hand the process off to another agent. But none of these actions are “performed by the agent itself.” The agent determines how and when these actions will happen.

That’s why we should think of an agent not as a worker, but as an orchestrator. An agent doesn’t read a file—it decides which file should be read. Depending on the contents of the file, it may respond to the user or invoke another tool.

This becomes very clear when we look across different agent frameworks. Names change, abstractions differ, APIs evolve—but the core role of the agent is almost always the same: being the decision point.

For an agent to fulfill this role, it is surrounded by a set of configurations. Which model it uses, which prompts guide it, which rules (policies) it must follow, and how it uses memory are all defined via these configurations. However, these configurations are not the agent itself; they are external layers that shape the agent’s behavior. The agent uses these layers, but it cannot be reduced to them.

In real-world systems, a single agent is often not enough. This is where the concept of an agent group comes in. An agent group is a logical organization of multiple agents working together toward a specific goal. Each agent retains its own role and responsibility, but overall coordination is handled at the group level. This structure forms the basis of multi-agent systems and enables complex tasks to be broken down and managed.

In short, the Agent Core layer is not what makes an agent “smart”; it is what makes it controlled, steerable, and extensible. The value of an agent comes not from what it does on its own, but from how it orchestrates the other components.

## 3.2. The Interaction and Flow Layer
No matter how well an agent is designed, it cannot make meaningful decisions without context. Agents do not operate in an abstract void; they operate within a flow that includes time, ordering, and interaction. The structure that represents this flow is the concept of a session.

A session covers a specific interaction process between a user and an agent. It has a beginning, it progresses, it produces outputs, and it eventually completes. All decisions an agent makes, all messages it generates, all tools it calls, and all outputs it produces happen within the context of a session.

That’s why thinking of a session as merely a technical detail or “an object that carries an id” is misleading. A session is the timeline of an agent’s thinking and decision-making process.

### Session: The Context Itself
Agents are built on top of stateless LLMs. That is, the model itself does not naturally establish a connection between two calls. This connection is provided by the session. An agent knows what was discussed in the past, what steps have been taken, and which stage the process is at through the session.

Without a session, questions like:
  * “what happened before?”
  * “where did this information come from?”
  * “why was this decision made?”
remain unanswered.

For this reason, a session is not just a container that holds messages; it is the fundamental structure that provides continuity for agent behavior.

### Message: The Basic Unit of Flow
The flow inside a session progresses through messages. A message is a single unit of communication coming from either the user or the agent. But thinking of a message as only “a piece of text” is incomplete. Messages have an order, belong to a role (user, assistant, system), and are produced at a specific point in time.

Thanks to these properties, the agent can understand which stage the dialogue is in, who is speaking, and in what context it should generate a response. In other words, messages are the raw signals that feed an agent’s decisions.

### Why Is Flow So Important?
In an agent system, the real complexity comes not from individual components, but from how those components interact over time. The session and message layer makes this interaction visible and traceable.

A user makes a request -> the agent receives it as a message -> it looks back at previous messages when needed -> it makes a decision -> it generates a message or calls a tool.

All of this is part of a single flow, and this flow is tracked through the session. This approach makes the system both debuggable and analyzable. Which decision was made in which context, and which message led to which outcome becomes understandable through this layer.

### Observation: Making the Invisible Visible
During this flow, not everything appears as a message. Data such as token usage, latency, error conditions, or cost information is not directly part of the dialogue. However, it is critical for the health and behavior of the system.

This is where the concept of observation comes in. Observations represent measurements and logs about operations that occur during a session. This allows agent systems to be evaluated not only by “what it said,” but also by “how it worked.”

### The Role of the Interaction Layer
The interaction and flow layer does not increase an agent’s intelligence. But it makes the agent’s decisions traceable, analyzable, and reproducible. Without this layer, agents become black boxes that only produce answers. The session and message structure turns that black box into an understandable process. In the next step, we’ll look at how an agent touches the outside world within this flow—namely the tools and capabilities layer.

## 3.3. The Capabilities Layer
What makes an agent truly useful is its ability to interact with the outside world. The layer that makes this interaction possible is the capabilities layer. The main actors at the center of this layer are tools.

A tool is a functional external operation or an internal system function that can be invoked by the agent. In other words, tools enable the agent to touch its environment. Reading files, calling APIs, updating data, or communicating with another system is performed through this layer.

Here, it’s important to clarify a key distinction:
Tools are not active decision-makers. A tool does not run on its own, does not hold context, and does not decide what to do. It simply performs a defined job with the parameters it is given when invoked.

Let’s consider a concrete example. Suppose you have a ChatBot Agent used in a note-taking application. If this agent cannot read or edit your notes, the help it can provide will be quite limited. An agent that can only chat but cannot touch the application itself produces very little value in practice.

That’s where tools come in. If you implement methods that can read notes, edit notes, or add tags, and integrate them into the agent system as tools, the agent becomes capable of using those capabilities. The agent decides things like “which note should be read?” or “which tag should be added?”, but it does not perform those operations by itself. It calls the relevant tool and evaluates the result.

This distinction clarifies a critical point: the agent decides, the tool executes.

The capabilities layer does not give the agent intelligence. But it ensures that the agent’s decisions have a real-world effect. Without tools, agents remain entities that only produce responses. With tools, they become systems that interact with their environment and perform concrete work.

## 3.4. The Memory Layer
Memory is a broad topic in agent systems. I covered it in detail in my earlier post, *[Memory Usage and Types in Agents](/posts/agent-memory)*. Instead of repeating it here, I want to briefly position the role of the memory layer in the context of this post.

In the context of this post, I treat memory not as a structure that gives an agent “intelligence,” but as a layer that provides continuity and context. LLMs are stateless by nature; they cannot remember what was said in the past or which steps were taken on their own. The memory layer fills this gap. While session-based memory preserves short-term context, long-term memory enables leveraging past interactions. But the critical point is not the existence of memory—it is how and when it is used. The agent itself decides what information should be stored and what should be retrieved. In this sense, the memory layer provides an infrastructure that feeds the agent’s decision mechanism. It does not produce meaning on its own; when used correctly, it makes agent behavior consistent and context-aware.

# 4. Thinking of Agents as Systems, Not Objects
Throughout this post, I tried to explain why it is misleading to treat LLM-based agents as single, magical entities. In practice, an agent is not just a model, a few prompts, or an API call. An agent is a system formed by multiple components coming together in specific relationships.

The agent core makes decisions and manages orchestration. The interaction layer provides context and flow. The capabilities layer enables the agent to touch the outside world. The memory layer makes continuity possible.

Frameworks, names, and APIs may change over time. It’s also quite possible that the agent ecosystem will evolve in completely different directions in the coming months. But the underlying structure behind this change has largely been the same for a long time.

The goal of this post was not to propose a standard or define the “correct” agent architecture. The goal was to offer a higher-level mental model that can be used when thinking about agents. Considering agents not as individual objects, but as systems with components, relationships, and flow provides significant clarity in both design and maintenance.

As the agent ecosystem continues to grow, I believe the need for such shared representations and contracts will only increase.
