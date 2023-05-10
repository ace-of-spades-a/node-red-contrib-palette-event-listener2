# Palette Event Listener

This is a custom node for Node-RED which listens to the events of any installation or removal of packages made in Node-RED through UI. It also takes the name of the NPM package and looks for it into Node-RED library. This node has an input field as well.

## Installation

To install `node-red-contrib-palette-event-listener2`, run the following command in your Node-RED user directory (typically `~/.node-red`):

```
npm install node-red-contrib-palette-event-listener2
```

## Usage

This node will listen for two types of events:

1. Whenever a package is installed using the Node-RED UI, this node will receive an `node/added` event containing the package name. The node will send a message with the package name and an action of `install`.

2. Whenever a package is removed using the Node-RED UI, this node will receive a `node/removed` event containing the package name. The node will send a message with the package name and an action of `remove`.

In addition, this node can be configured with a default package name and operation. If an input message is received, the node will use the configured package name and operation. If the package is found in the Node-RED library, the node will send a message with the package name and operation on the first output, and `null` on the second output. If the package is not found, the node will send `null` on the first output and a message with the package name, operation, and an error message on the second output. If no package name is specified in the configuration, the node will send a message with an error on the second output.

The node has two output junctions:

- `Output 1`: Sends a message with the `packageName` and `operation` values when a package is installed or removed.
- `Output 2`: Sends a message with an error object if there was an error with the npm command execution or if no `packageName` was specified.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
