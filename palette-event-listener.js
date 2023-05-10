module.exports = function(RED) {
    function PaletteEventListener(config) {
        const { exec } = require('child_process');
        RED.nodes.createNode(this, config);
        
        var node = this;

        node.on('input', function(msg) {
            // Send the message with the default values
            console.log('config : ',config);
            try{
                exec(`npm view ${config.packageName}`, (err, stdout, stderr)=> {
                    if(err){
                        // console.error("err :",err);
                        node.send([null,{payload : {packageName: config.packageName, operation: config.operation, error: err}} ]);
                    }else if(stderr){
                        // console.log("stderr : ",stderr);
                        node.send([null, {payload : {packageName: config.packageName, operation: config.operation, error: err}}]);
                    }else{
                        // console.log(stdout);
                        if(config,packageName == ""){
                            node.send([null, { payload: { packageName: config.packageName, operation: config.operation, error: "No package Name Specified" } }]);
                        }else{
                            node.send([{ payload: { packageName: config.packageName, operation: config.operation } }, null]);
                        }
                    }
                });
            }catch(e){
                // console.log("catch : ", e);
                node.error(e);
            }
            
        });

        RED.events.on("runtime-event", function(event) {
            console.log("RED.runtime : registry node type : ",event);
            const eventName = event.id;
            let packageName = '';
            switch(eventName){
                case 'node/added':
                    packageName = event.payload[0].module;
                    node.send([{packageName: packageName, action: 'install'}, null]);
                    break;
                case 'node/removed':
                    packageName = event.payload[0].module;
                    node.send([{packageName: packageName, action: 'remove'}, null]);
                    break;
                default:
                    console.log('')
                    break;
            }
        });

    }

    RED.nodes.registerType('palette-event-listener', PaletteEventListener);
}
