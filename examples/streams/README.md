# Node.js Streams Examples

This section demonstrates how to use streams in Node.js for efficient data processing.

## Why Streams Matter
- Streams let you process data piece by piece, without loading everything into memory.
- Essential for working with large files, network data, or any scenario where you want to process data as it arrives.

## Types of Streams
- **Readable**: Source of data (e.g., file, HTTP request)
- **Writable**: Destination for data (e.g., file, HTTP response)
- **Duplex**: Both readable and writable (e.g., TCP socket)
- **Transform**: Modifies data as it passes through (e.g., compression, encryption)

## Examples
- `basic-file-copy.js`: Copies a file using readable and writable streams with piping.
- `uppercase-transform.js`: Reads a file, transforms its content to uppercase, and writes to a new file using a transform stream.
- `echo-server.js`: A simple HTTP server that echoes back whatever you send it, using network streams.

### How to Run
#### File Copy
1. Create an `input.txt` file in this directory with some text.
2. Run:
   ```
   node basic-file-copy.js
   ```
3. Check `output.txt` for the copied content.

#### Uppercase Transform
1. Create an `input.txt` file in this directory with some text.
2. Run:
   ```
   node uppercase-transform.js
   ```
3. Check `output-uppercase.txt` for the result.

#### Echo Server
1. Run:
   ```
   node echo-server.js
   ```
2. In another terminal, try:
   ```
   curl -d 'hello world' http://localhost:3000/
   ```
   You should see `hello world` echoed back.

## What You Learn
- How to use readable, writable, and transform streams
- How to pipe streams together
- How to use streams for network servers

## Further Reading
- [Node.js Streams Docs](https://nodejs.org/api/stream.html) 