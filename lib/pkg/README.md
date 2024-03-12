# Project Name

UPLC-JS

## Overview

This project utilizes a WebAssembly module to decode flat data, providing a crucial tool for the Cardano Explorer. Leveraging Aiken's library https://github.com/aiken-lang/aiken, we've built a WebAssembly version of the decoder, making it accessible for web applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Update](#update)
- [Special Thanks](#special-thanks)

## Installation

Describe how to install and set up your project. Include any prerequisites, such as Rust and wasm-pack, if necessary.

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    ```
2. Install Rust:
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
3. Install wasm-pack:
    ```bash
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
    ```
4. Build the project:
    ```bash
    wasm-pack build --target web
    ```

## Usage

### Using the WebAssembly Module

1. Add the following script tag to your HTML file:
    ```html
    <script type="module">
        import { decode } from './pkg/uplc-js.js';
        
        async function run() {
            const yourFlat = "abc123";
            const decoded = decode(yourFlat);
            console.log(decoded)
        }
        
        run();
    </script>
    ```
2. Call the exported functions from your JavaScript code:
    ```javascript
    decode();
    ```

## Update

Now we are using uplc rust package version 1.0.14-alpha, you can update this version and rebuild by updating this version in Cargo.toml file.
```
uplc = { version = "1.0.14-alpha" }
```



## Special Thanks

Special thanks to Aiken for providing the library for decoding flat data. Now, we can build it to WebAssembly and use it in the Cardano Explorer.
