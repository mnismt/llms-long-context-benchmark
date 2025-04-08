# LLMs Long Context Benchmark

A visualization tool for comparing the performance of various LLMs across different context window sizes based on the Fiction.LiveBench benchmark.

## Project Overview

This project visualizes benchmark results from Fiction.LiveBench to compare how well different LLMs maintain accuracy as context window size increases. The visualization shows performance metrics for leading models from Anthropic, OpenAI, Google, DeepSeek, Meta, Qwen, and other providers.

## Data Source

All data comes from Fiction.LiveBench for Long Context Deep Comprehension (April 6, 2025). The benchmark data is located in `src/data/benchmark.ts`.

Fiction.LiveBench is a benchmark specifically designed to measure LLMs' deep comprehension abilities across long contexts. Unlike many other benchmarks that test retrieval or basic understanding, Fiction.LiveBench evaluates how well models can:

- Maintain coherent understanding of complex narratives
- Track characters, events, and plot developments across very long contexts
- Accurately answer questions that require deep comprehension of the entire context

The benchmark presents models with increasingly longer fictional texts and measures their ability to accurately answer detailed questions about the content.
## Implementation

This project is built with:
- React
- TypeScript
- Recharts for data visualization
- Tailwind CSS for styling

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build
```

## Author

Created by [@leodoan_](https://x.com/leodoan_)
