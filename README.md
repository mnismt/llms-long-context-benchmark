# LLMs Long Context Benchmark Visualization

A visualization website for comparing the performance of various LLMs across different context window sizes based on the Fiction.LiveBench benchmark.

![LLMs Long Context Benchmark](https://github.com/user-attachments/assets/07cbe37e-83d8-4cba-a03d-d3f7d6d7a024)

## Data Source

All data comes from [Fiction.LiveBench](https://fiction.live/stories/Fiction-liveBench-April-6-2025/oQdzQvKHw8JyXbN87) for Long Context Deep Comprehension (April 6, 2025). The benchmark data is located in `src/data/benchmark.ts`.

Fiction.LiveBench is a benchmark specifically designed to measure LLMs' deep comprehension abilities across long contexts. Unlike many other benchmarks that test retrieval or basic understanding, Fiction.LiveBench evaluates how well models can:

- Maintain coherent understanding of complex narratives
- Track characters, events, and plot developments across very long contexts
- Accurately answer questions that require deep comprehension of the entire context

The benchmark presents models with increasingly longer fictional texts and measures their ability to accurately answer detailed questions about the content.

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
