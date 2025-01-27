# Simple Command Execution API in Go

This is a simple Go application that provides an API to execute Unix commands on a system. It is designed to run on a Raspberry Pi 3B but can be adapted for other platforms.

## Features

- A single POST endpoint `/api/cmd` to execute Unix commands.
- Listens on port `3030` (configurable in the code).
- Logs useful information for debugging and monitoring.
- Built specifically for Raspberry Pi 3B (ARM architecture).
