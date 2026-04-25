---
title: "Memory Usage & Types in Agents"
date: 2025-06-19
lastmod: 2025-06-19
draft: false
description: "AI agent memory architectures: sensory, short-term, long-term and semantic memory types. Context management in LLM-based systems."
summary: "In this post, I explain why memory structures are critical in agent architectures, detailing types from sensory to semantic memory and how they are practically applied."
slug: "agent-memory-usage"
keywords: ["agent memory", "LLM", "artificial intelligence", "semantic memory", "context window", "RAG", "memory management"]
tags: ["generative ai", "mcp", "agents"]
categories: ["tech"]
author: "Sami Tuğal"
---

## Why Is Memory Important?

Contrary to popular belief, LLMs don’t actually hold state. Every query — no matter how conversational it feels — is treated as an isolated call. There’s no underlying connection; each message is sent “standalone,” without context.

So if you want two messages to be related, you have to build that relationship yourself. That means re-sending previous conversations, uploaded documents, code snippets — everything — with every new request.

After learning this, maybe it’s time to close that ChatGPT tab that’s been open for a month 😄 There’s no actual memory — you’re just repeating yourself every time.

That’s why memory plays a critical role in LLM-based agent architectures. It’s the simulated memory that gives users the illusion of an ongoing conversation. Otherwise, single-turn responses with no connection to prior messages quickly lose meaning.

But there's a tradeoff here: if a conversation goes on too long, token cost rises. And if too much content is stuffed into the prompt, the model may lose focus and veer off-topic.

Memory management is crucial — for functionality, for cost, and for user experience.

---

## How Memory Works in Agents

Let’s go a bit deeper into the **“simulated memory”** concept we just mentioned.
Agents don’t actually remember the past. Instead, we need to remind them of it, repeatedly. Usually this means:
Adding prior messages into the context,
Or fetching information from an external store (like a vector database) and injecting it back into the model.
Agents operate through three main types of memory:

- **Short-term memory**: Things kept in the context window like prior messages, tool calls, etc.
- **Long-term memory**: Retrieved via vector search from earlier sessions or documents.
- **Working memory**: Temporary values related to the current task, such as the output of a previous tool call.

We’ll go into more detail shortly, but here’s the big picture:
Different agent frameworks (LangChain, Semantic Kernel, ReAct, AutoGPT) implement this triad in different ways:

- Some inject the entire history into context (expensive),
- Some run vector search and only return relevant bits,
- Some summarize and store session insights (like name, project, location),
- Some manage tool state via custom memory layers (e.g., scratchpads, tool buffers).

Ultimately, an agent’s memory usage is about what to remember, when to recall it, and how to bring it back.
Without a solid memory strategy, an agent is just a fancy one-shot function runner.

## Memory Types

---

### Sensory Memory

This is the shortest-lived memory in the stack — like the brain’s fleeting visual or auditory impressions.
Same idea for agents: the very first thing the system perceives ends up here.

Examples:
The user’s initial message
- A dropped-in image
- An audio clip from the mic

This memory fades fast. It usually survives for just one operation before disappearing.

But don’t underestimate it — some frameworks forward sensory data into longer-lasting memory types:
- Image → caption model → written to context
- Audio → ASR → converted to text → sent to embedding

Sensory memory is often a transition point — critical if you’re aiming for human-like behavior.

Curious what else is needed for a human-like memory? Check this out.

--- 

#### Visual Buffer

Think of this like the agent’s short-term visual memory. Humans hold onto images briefly — even after looking away. This buffer does the same.

In LLM-based agents, especially in multimodal setups:

- An image is uploaded  
- A caption model processes it → _e.g., “a cat looking out a window 😺”_  
- The resulting description is temporarily stored in context or held for a few steps

This helps with continuity.  
If a user later asks: _“What is the cat doing?”_ — the model can respond, assuming the buffer still holds the caption.

But if the buffer has cleared?  
You might get a confused: _“What cat?”_ 😅

Unlike **Sensory Memory**, the Visual Buffer stores **processed** content — not raw images, but **their meaning**.

---

#### Audio Buffer

Now let’s talk hearing.  
Ever had a sentence echo in your head after someone said it? Agents have that too — via the **Audio Buffer**.

This memory holds the **processed meaning** of recent voice input — not the raw audio itself.

Typical workflow:

- Mic input is captured  
- ASR (Automatic Speech Recognition) converts it to text  
- The text is added to the context window

This mechanism is commonly used in:

- Voice assistants  
- Real-time meeting tracking agents  
- Multimodal interfaces

**Key difference from Visual Buffer?**  
> Same short lifespan — but stores **transcripts** instead of **captions**.

---

### Short-Term Memory

Now we’re moving up the memory ladder — into **short-term recall**.

This layer answers the question: _“What’s happening right now?”_

It holds:

- Recent decisions  
- Tool outputs  
- Snippets of conversation  

…but only for a short while. This memory fades quickly — just like your own working memory when distracted.

And if it fails?  
The agent starts behaving like **Dory from Finding Nemo** — forgetting what just happened 😅

---

**How is it implemented?**  
Typically via a **sliding context window**, feeding recent messages back to the model:

- Last 3–5 user queries  
- Names of recently called tools  
- Tool outputs or decisions made

> It ensures the model retains short-term continuity — for just long enough to finish the task at hand.


### Context Window

This is where **short-term memory** actually lives.

Remember — LLMs **don’t retain anything** between calls.  
Every bit of information must be **explicitly re-sent**, and it all goes into the **context window**.

---

**What goes into it?**

- The ongoing chat history  
- System instructions  
- Tool/function definitions  
- Tool calls and their responses  

---

**But it has limits!**

- GPT-4: ~128K tokens  
- Gemini: up to 1M tokens  

If it **overflows**, the model starts forgetting:

> “Who are you again?”

---

**To manage overflow:**

- Summarize earlier threads  
- Strip unnecessary/redundant lines  
- Limit memory to the _last N interactions_  

---

> The context window is your agent’s **present awareness**.  
> Clear, focused, and up-to-date context = better, more relevant answers.


### Working Memory

Ever had that “what was I doing again?” moment?

Working memory prevents that for agents by holding transient, task-specific data.

This memory only stores information relevant to the current operation — it’s temporary but essential.

**Examples:**
- Tracking loop iterations
- Holding a temporary plan
- Retaining tool output between steps

In various frameworks, this layer might be called:
- `scratchpad`
- `intermediate_steps`
- `tool buffer`

If short-term memory is about awareness of the recent past,  
**working memory is about focus on the current task.**


### Tool Invocation Buffer

What did the agent do?

This memory layer keeps a short-term log of tool usage, capturing:

- Tool names
- Input parameters
- Output results

For example, if a tool fetched data three steps ago and the agent forgets that, it might either repeat the call or fail to proceed.

The tool invocation buffer prevents this by maintaining a temporary record of recent tool interactions.

Most frameworks store the last 1–N invocations within the context window for easy recall and continuity.


### Long-Term Memory

Now we go deep: long-term memory.

Some frameworks call this **vector memory**, others refer to it as a **knowledge base** — but the purpose remains the same:

> “Don’t forget the important stuff. You’ll need it later.”

This memory is **external**, typically stored in a vector database or structured store, and persists across sessions.

**Typical use cases:**

- Save facts about the user (e.g., name, preferences, past actions)
- Inject those facts into system prompts or retrieve them dynamically

Example:

```plaintext
System Prompt: User's name is Ali. Last worked on ExampleProject.

Human: Hey  
Agent: Hey Ali! Continuing on ExampleProject today?
```

**Things to keep in mind:**

- Don’t store irrelevant data — it clutters the context.
- Avoid storing excessive detail — it can lead to token overflow.
- Use summarized, meaningful embeddings for better efficiency.

> Long-term memory = personality + experience + patience.


### Semantic Memory

This is the smart memory.

Rather than just storing facts, semantic memory captures and organizes **meaning**.

Example:
> User said “analyze stock” — that probably refers to the finance tool.

**How it works behind the scenes:**

- Past messages and tool calls are embedded into vector representations.
- These embeddings are clustered by semantic similarity.
- New user queries are matched via similarity search to return relevant information.

This is similar to **RAG** (Retrieval-Augmented Generation):

- Not based on keywords.
- Based on **semantic proximity**.

---

### Episodic Memory

Think of this as the agent’s **diary** — recording not just data points, but sequences of events in context.

Example:
> User checked stock list → exported PDF → hit an error → moved on.

**Episodic memory is great for:**

- Tracking long or multi-step tasks
- Debugging interaction history
- Personalizing future conversations

**How it works:**

- Each session is summarized by task, tools used, and outcome.
- These summaries are stored with timestamps and metadata.
- When a new session starts, similar episodes can be retrieved and referenced.

**Key difference:**

- **Semantic memory** answers: *What was this about?*
- **Episodic memory** answers: *What happened and how did it unfold?*


### Structured Memory

This is memory with a fixed structure — predefined schema and known fields.

Imagine your agent always needs to track:

- User name  
- Company  
- Last session date  
- Current project  
- Preferred output format  

Structured memory would store this as a structured object:

```json
{
  "user_id": "123",
  "name": "Ali",
  "company": "Logo Software",
  "last_seen": "2025-06-10",
  "active_project": "Phoenix",
  "preferred_format": "Excel"
}
```

**Common use cases include:**

- Personal assistant agents  
- Session-based applications  
- Role- or permission-specific systems  

This approach is fast, predictable, and lightweight for prompt injection.


## Conclusion

Agents aren’t just clever bots calling tools — they’re systems with memory, attention, and identity.

In this post, we explored:

- **Sensory memory** – initial signals and perception  
- **Visual / audio buffers** – short-lived sensory traces  
- **Context and working memory** – reasoning in the short term  
- **Long-term, semantic, episodic, and structured memory** – deeper knowledge and continuity  

A real agent isn’t just a powerful model — it’s a well-architected memory system.

Because without memory:

- Meaning breaks down  
- Continuity fails  
- Personalization becomes impossible  

I hope this post helped clarify the layers and roles of memory in modern agent architectures.

I’d love to hear your thoughts, suggestions, or personal implementations.  
See you in the next post!


