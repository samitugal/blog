---
title: "How the Brain Learns"
date: 2026-04-25
lastmod: 2026-04-25
draft: false
description: "How does the brain learn, where is information stored, why do we forget? Sternberg's intelligence types, biological learning mechanisms and where modern AI gets stuck."
summary: "How does the brain learn, where is information stored, and why do we forget? In this post, I explore types of intelligence, the biological learning mechanism, and where modern AI gets stuck in this process."
slug: "how-brain-learns"
keywords: ["learning", "brain", "artificial intelligence", "spaced repetition", "Sternberg intelligence theory", "Kahneman", "memory"]
tags: ["science", "brain", "learning", "AI"]
categories: ["general"]
images:
  - "/images/how-brain-learns/brain-header.png"
author: "Sami Tuğal"
---

![Brain and circuit board hybrid, 8-bit pixel art](/images/how-brain-learns/brain-header.png)
*The intersection of biological learning and artificial learning.*

## What Is Intelligence?

What is intelligence? Starting with such a direct question feels a bit strange. We all know what intelligence is, yet we can't seem to find a common definition. To me, intelligence is an individual's ability to understand and learn a subject from scratch. If you're wondering what I mean, imagine you're a teacher. While explaining a topic to your students, you notice that some understand immediately, some struggle a bit, and others don't understand at all. Same topic, same teacher, same environment—yet some students can learn and apply the subject faster. In my view, these differences indicate varying levels of intelligence. Of course, we can't make this judgment from a single lesson; external factors may also play a role, but on average, this is roughly how I define intelligence.

Intelligence is a learning differential that we know matters, but finding a definition that fully explains this intellectual horsepower is difficult. Psychologists have been trying to crack this construct since the twentieth century; various theories have been built around it, but proving these theories is extremely challenging.

Traditionally, IQ tests are used to measure a person's logical and verbal potential; they yield an *intelligence quotient*, calculated by multiplying the ratio of mental age to physical age by one hundred. So an eight-year-old who can solve problems that ten-year-olds solve has an IQ of 125.

*For the verbally inclined, let's prove it: (10 / 8) × 100 = 125*

IQ was once thought to be fixed from birth, but such traditional ideas about intellectual capacity are being challenged today. As I mentioned in [my previous post]({{< relref "how-brain-works.md" >}}): while 50% of our brain comes from genetics, the remaining 50% is shaped by the environment; this is called *plasticity*.

---

## Types of Intelligence

In the previous paragraph, I stated that there's no common definition of intelligence. Scientists have proposed various theories for types of intelligence as well. For instance, one of the strangest theories to me is psychologist Howard Gardner's theory of intelligence. According to Gardner, there are eight different types of intelligence. I don't want to explain each one here and digress from the topic; here's a link for those interested: [Howard Gardner's Theory of Multiple Intelligences](https://www.verywellmind.com/gardners-theory-of-multiple-intelligences-2795161). Other psychologists at least agree that there are two different types of intelligence: *fluid intelligence (new problem-solving) and crystallized intelligence (accumulated knowledge)*. However, the intelligence definition I want to address is the theory developed by Robert Sternberg, because I believe it's the model that most concretely explains how intelligence works in everyday life.

### Robert Sternberg's Theory of Intelligence

Sternberg models intelligence not as a single score but as a triangle. According to him, there are three separate dimensions: **analytical**, **creative**, and **practical**. These three answer not the "how much" question but the "how" question—essentially, what type of thinking are you strong in.

What makes this model appealing to me is this: the people we call "smart" in our lives are actually smart in different ways. One person easily solves a complex equation but gets confused about what to buy at the grocery store. Another builds and runs a company for years with just a high school diploma. A single IQ score can't explain this difference; Sternberg's model can.

Let me make an observation about myself. When I see a system, I can break it down and analyze it in detail: what each component does, what the inputs and outputs are—I can extract all of it easily. But when it comes to creating something from scratch, I struggle. The reason is most likely that my creative side is lacking.

![Sternberg's triarchic model: scientist, artist, craftsman](/images/how-brain-learns/sternberg.png)
*Analytical, creative, practical; the three don't substitute for each other.*

#### Analytical Intelligence

Analytical intelligence is what we classically call "test smarts." Reasoning, problem-solving, comparing, evaluating. The ability to take information, break it into parts, and combine those parts in different ways (the intelligence possessed by those who rank in the top 10,000 on university entrance exams).

This is largely what IQ tests measure. Academic success, chess, mathematical problem-solving—all fall within this domain. If a child solves equations and cracks logic puzzles in seconds, we say their analytical intelligence is high.

I think this is what gets exercised the most in the early years of software development. You look at algorithm problems, search for bugs in code reviews, break down complex systems in your head—all analytical. But this alone isn't enough; I'll touch on that below.

#### Creative Intelligence

Creative intelligence is the part that kicks in when you encounter a problem you've never seen before. Combining known information in new ways, making unusual connections, imagining a solution that doesn't yet exist.

The key concept here is *novelty*. Not applying known methods, but producing a new method. Sternberg also calls this *experiential intelligence*; because it usually involves intuitively combining previous experiences to produce a new output.

An interesting parallel: during in-context learning, an LLM is essentially trying to mimic creative intelligence; it combines old patterns in new ways in a context it has never seen before. But whether it can truly produce something original is still debatable. After all, the working principle of LLMs is based on predicting the next token.

#### Practical Intelligence

Practical intelligence is what we commonly call "street smarts." According to Sternberg, perhaps the least known of the three but the most useful in daily life. Definition: the ability to apply your knowledge to the environment, read the context, the intuition of "when to do what."

Consider an engineer: they produce great solutions on paper but can't communicate their point in team meetings, can't grasp what the customer really wants. Practical intelligence is exactly what's missing here. The reverse also exists: a shopkeeper without a diploma can read within minutes who's a buyer and who's just browsing the display.

The concept to underline here is *tacit knowledge*—knowledge not found in any written rule, picked up from the environment. The knowledge of "who to go to for faster resolution" within an organization is a product of practical intelligence; no organizational chart tells you this.

> The three don't substitute for each other: analytical intelligence makes you capable of solving problems, creative intelligence makes you capable of defining new problems, and practical intelligence makes you capable of implementing your solutions in the real world.

---

## Two Systems of Knowing

In *(Thinking, Fast and Slow)[http://kisaurl.nl/vz9wv]*, Daniel Kahneman talks about two thinking systems. System 1 is intuitive; it operates automatically and quickly, producing decisions instantly through instinct and feelings. Like a footballer adjusting their shot based on the pass coming to their feet: without thinking, instantly. System 2 is the system of conscious analysis and reasoning. Here we evaluate options, make decisions, apply self-control. It's slow, requires effort, but it's flexible.

System 2's most important function is to train System 1. As a repeated situation is learned sufficiently, control gradually transfers from System 2 to System 1. Think about learning to drive. In the beginning, everything is under System 2's control: check the rearview mirror before overtaking, signal, turn the steering wheel, press the gas. Every step is conscious, every step is slow. As years pass, these steps are delegated to System 1; an experienced driver no longer "thinks" about anything when changing lanes. The essence of learning is exactly this: moving a behavior from System 2's control to System 1's automatism.

![Novice and experienced driver comparison, 8-bit](/images/how-brain-learns/system1-system2-driving.png)
*Same driver, same road; the difference lies in the years of transition from System 2 to System 1.*

This process is the exact equivalent of Reinforcement Learning in computer science. In fact, RL's fundamental inspiration comes from this psychological principle: reinforcing the correct action over time through reward-punishment cycles, eliminating wrong approaches. For the brain, this process takes years, not hours (the downside of organic programming), but the logic is the same.

---

## How Does Learning Happen?

So how does learning happen? How do I know I've learned something—is there a test for this? For example, if I remember a topic a week after learning it, does that count as learning? Of course not. Because remembering is not the same as learning. Learning means knowing what the information means, how to apply it, when to use it, and being able to summon it from the dark corridors of your brain when needed. I can't actively hold information in my head constantly; for this, we have an area in our brain called **working memory**, and its capacity varies for everyone. Think of it like RAM in computers. For me to learn something, I first need to hold it in working memory, then embed it in long-term memory.

### Learning Biologically

To learn a piece of information, it first needs to pass through the brain's attention filter. In other words, you can learn a topic you like, value, or find noteworthy. Otherwise, the information stays in working memory for a while, then gets forgotten. If you have a friend with attention deficit, you can easily observe this—if it doesn't catch their interest, they most likely won't remember anything you said, but if the topic reaches something that interests them, they can explain it down to the smallest detail.

If information catches the brain's interest, it's processed in the brain's region called the hippocampus and stays there for a while. Then, if the brain needs to remember this information, it's transferred from the hippocampus to the cortex during REM sleep at night. During this time, new connections are formed between neuron groups related to that information, and synapses between neurons that fire together are strengthened. The brain thus moves information from a temporary buffer to a permanent network.

![Data transfer from hippocampus to cortex, REM sleep](/images/how-brain-learns/hippocampus-cortex.png)
*Temporary buffer → permanent network. Transfer happens during sleep.*

But the work doesn't end there. Just because information is written to the cortex once doesn't mean it stays there forever. That neuron group needs to fire again at regular intervals—meaning the information needs to be used repeatedly. Otherwise, the connections between them weaken over time and eventually break. The brain doesn't leave those freed neurons idle; it reprograms them for other information. The reason we can't remember the formulas we wrote fluently in high school today is exactly this: the connections broke, the neurons were put to work for other tasks.

> Right now I'm trying to remember electron configurations from high school: it started with 1s2, 2s2, 2p6, 3s2, 3d6. I don't remember the rest, and maybe even what I remember is wrong 😄

A simple but critical conclusion emerges from this: learning is not a one-time event but a process requiring continuous maintenance. Writing to the cortex once isn't enough; you need to go over what's written, use that path frequently.

### Encoding

Encoding is the entry stage of information into the brain. Data taken into working memory leaves a "trace" here, and the depth of this trace determines whether you can recall that information later. In other words, the quality of learning is largely determined in this first step.

There's a classic distinction in psychology here: **shallow encoding** and **deep encoding** (Craik and Lockhart, 1972). Shallow encoding means taking information only by its form; reading a definition, seeing a sentence. Deep encoding means connecting information to your existing knowledge network; asking "where does this fit, what does it resemble, in what situation is it useful." The same information, when deeply encoded, lasts much longer.

This is why just reading a topic doesn't work. Expressing it in your own words, summarizing by writing on a blank page, explaining to someone else, relating to what you already know—all are tools of deep encoding. The Feynman technique is fundamentally based on this principle: when you try to explain a concept in simplified terms, your brain is forced to deeply encode it.

### Consolidation

Encoding gets information into the brain, but keeping it there is another matter. Consolidation is exactly the name for this: making a path permanent by repeating an encoded trace frequently enough over time.

The most critical concept here is **spaced repetition**. Hermann Ebbinghaus's forgetting curve studies in the 19th century showed this: information is quickly forgotten after learning, but when recalled again, the next decay curve slows down. So information revisited at 1 day, 3 days, 1 week, 1 month intervals becomes far more permanent than information studied for 10 hours straight. Apps like Anki and Quizlet are based exactly on this logic.

In contrast, **cramming** (stuffing the night before an exam) fails; because it doesn't give consolidation the time it needs. The brain needs sleep and intervals to write information to the cortex; this process is physical and cannot be accelerated. So studying left to the last day has no contribution—though it might ease your conscience a bit.

A similar principle operates in modern AI training: a model sees the same data not in one go but repeatedly across multiple epochs. With each pass, weights are updated a bit more. So the artificial intelligence equivalent of spaced repetition is this: not one-time, but gradual step-by-step consolidation.

### Retrieval

Retrieval is bringing stored information to consciousness when needed. But here's a surprising fact: retrieval is also part of learning. It's not just the "use" stage of information but also the "strengthening" stage.

This is called the **testing effect**: trying to pull information from your own mind with the book closed, rather than passively reading it, strengthens learning much more. Because each successful retrieval re-fires the relevant neuron pathway and thickens the connection. This is exactly why repetition with flash cards is more effective than re-reading the book.

Another important point: retrieval is often not a question of "has the information been lost?" but "couldn't I find the path to the information?" The information may be sitting in the dark corridors of the brain, but it can't be reached without the right cue at that moment. The "it's on the tip of my tongue but I can't remember" situation is exactly this. When someone gives you the context and you say "oh yes!" and remember, it's simply the return of the lost cue, not the lost information.

An interesting parallel: a RAG system does exactly this. Information sits in the vector database, but it needs to be called with the right query when needed. I detailed this mechanism in [my Agent Memory post]({{< relref "agent-memory.md" >}}). The brain doesn't work differently; storing and retrieving are two separate problems, and the second is often more critical.

---

## Methods I Use

These days I've started paying more attention to this topic. After all, if we forget, what's the point of learning? So I read Peter C. Brown's *[Make It Stick](https://www.amazon.com/Make-Stick-Science-Successful-Learning/dp/0674729013)*; most of the information here comes from that book. Preparing Anki cards while reading a book is really hard work, but we're software developers and automation is part of our job. LLMs easily automate this kind of task.

I upload the books I read to Claude as PDFs and set it up to extract key points every night. A scheduled task processes the books I take notes on in Obsidian and produces a summary document for me. Additionally, another scheduled task sends reminders and quizzes at certain times to help me do recall. This way, I make my learning process more efficient.

In addition to these, I keep my notes the old-fashioned way with pen and paper. This way, I think more deeply and make connections more easily. When transferring to the computer, I also refresh the information by doing a second recall.

Tactics like these are a topic for another post; if I try to explain them here, the post will get too scattered. Those interested can also reach out to me privately.

---

![Robot in front of a locked library, 8-bit](/images/how-brain-learns/frozen-library.png)
*A library with locked doors but full inside.*

Ultimately, learning is not an event but a habit. It's not something you can pick up once and set aside; it's a living network whose connections you need to keep tightening by returning to it constantly. Today's language models can't establish exactly this cycle; they freeze after pre-training, their parameters get locked. An AI that constantly retrieves, constantly consolidates, and rewires its own connections will be the first artificial intelligence that truly "learns." Until then, what we have is extremely impressive but essentially a library whose doors are locked once it's filled.
