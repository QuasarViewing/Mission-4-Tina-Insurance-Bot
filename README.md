# Tina — AI Insurance Chatbot

An AI-powered insurance consultant for Turners Car Insurance. Tina asks customers short questions about their vehicle and recommends the right insurance product based on their situation.

## What It Does

Tina conducts a short conversation to find out what the customer needs, then recommends one or more of three insurance products. She enforces strict business rules — she will never recommend the wrong product regardless of how the conversation goes.

## The Three Products

| Product | Covers | Restriction |
|---------|--------|-------------|
| Mechanical Breakdown Insurance (MBI) | Mechanical and electrical failures | Not available for trucks or racing cars |
| Comprehensive Car Insurance | Own vehicle + third party damage | Only for vehicles under 10 years old |
| Third Party Car Insurance | Damage to other vehicles | Available for any vehicle |

## Tech Stack

- HTML, CSS, Vanilla JavaScript — frontend
- Google Gemini API (gemini-2.5-flash) — AI brain
- Node.js + Express — backend API server
- Docker + nginx — containerised deployment
- docker-compose — runs frontend and backend together

## Architecture

The app is split into two containers:
