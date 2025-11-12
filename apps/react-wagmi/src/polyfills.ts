import { Buffer } from "buffer"

// Make Buffer available globally for libraries that need it
// Reference: https://developers.binance.com/docs/binance-w3w/evm-compatible-provider#buffer-is-not-defined
window.Buffer = Buffer
