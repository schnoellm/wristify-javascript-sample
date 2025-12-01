import express from 'express'
import basicAuth from 'express-basic-auth'
import bodyParser from 'body-parser'
import { createHash } from 'crypto';

var selectedColor = null;

const app = express();
app.use(bodyParser.json());
const port = 3000;

const shutdown = () => {
    console.log("Shutting donw ...");
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const apiRouter = express.Router();

apiRouter.get("/endpoints", (req, res) => {

    const data = {
        endpoints: [
            {
                id: "instructions",
                name: "Instructions",
                description: "Explains Wristify"
            },
            {
                id: "text-sample",
                name: "Sample text",
                description: "Shows a sample text"
            },
            {
                id: "trend-sample",
                name: "Sample trend",
                description: "Displays a sample trend"
            },
            {
                id: "image-sample",
                name: "Image sample",
                description: "Displays a random image"
            },
            {
                id: "action-sample",
                name: "Sample Action",
                description: "Demonstrates actions to select from"
            },
            {
                id: "color-selection",
                name: "Color selection",
                description: "Choose a color for the trend"
            },
            {
                id: "current-color",
                name: "Current color",
                description: "Shows the currently selected color"
            },
            {
                id: "exit-on-back-behaviour",
                name: "Exit on back behaviour",
                description: "Shows how to exit the app from the payload loading properties object"
            }
        ],
        groups: [
            {
                name: "How to use",
                endpoints: ["instructions"]
            },
            {
                name: "First group",
                endpoints: ["trend-sample", "color-selection", "current-color"]
            },
            {
                name: "Second group",
                endpoints:["text-sample","image-sample","action-sample"]
            },
            {
                name: "Third group",
                endpoints: ["exit-on-back-behaviour"]
            }
        ]
    }

    let payloadToHash = JSON.stringify(data);
    let hash = createHash("sha256").update(payloadToHash).digest("base64");
    data.hash = hash;

    if (req.query.hashonly === "true") {
        res.send({hash: data.hash});
        return;
    }

    res.send(data);
})

apiRouter.post("/endpoints/:id", async (req, res) => {

    const endpointId = req.params.id;
    let payload = {};
    const body = req.body;


    switch (endpointId) {
        case "instructions":
            payload = [
                {text: "Wristify allows you to easily access your custom REST web service from your Garmin watch."},
                {text: "In order to do so, you need to implement and host your own REST web service."},
                {text: "This way you can implement custom actions and provide desired information and data to the watch via a predefined API specification."},
                {text: "To implement your own service, check out the description in the garmin store and the instructions in the linked GitHub repository."},
                {text: "The sample code of this API, which you are currently accessing, is available as nodejs sample on GitHub as well."},
                {text: "Happy coding!"}
            ]
            break;

        case "text-sample":
            payload = {
                text: "Some sample text, that can be displayed on the Wristify Garmin Widget."
            }
            break;

        case "trend-sample":
            payload = {
                data: [
                    {
                        name: "Line 1",
                        color: selectedColor ?? "yellow",
                        data: [
                            {
                                t: 1741906800,
                                y: 6
                            },
                            {
                                t: 1741993200,
                                y: 4
                            },
                            {
                                t: 1742079600,
                                y: 6
                            },
                            {
                                t: 1742166000,
                                y: 6
                            },
                            {
                                t: 1742252400,
                                y: 10
                            }
                        ]
                    },
                    {
                        name: "Line 2",
                        color: "white",
                        data: [
                            {
                                t: 1741906800,
                                y: 3
                            },
                            {
                                t: 1741993200,
                                y: 2
                            },
                            {
                                t: 1742079600,
                                y: 3
                            },
                            {
                                t: 1742166000,
                                y: 1
                            },
                            {
                                t: 1742252400,
                                y: -4
                            }
                        ]
                    }
                ]
            };
            break;

        case "image-sample":
            payload = [
                {text: "Random image from picsum.photos"},
                {image: {
                    url: "https://picsum.photos/200/100",
                    width: 200,
                    height: 100,
                    "open-on-mobile": true
                    }
                }
            ];
            break;

        case "current-color":

            if (selectedColor) {
                payload = { text: `The selected color is:\n ${selectedColor}` };
            } else {
                payload = {"text": "No color was selected so far"}
            }
            
            break;

        case "color-selection":

            if (body.parameter) {
                if (body.parameter == "reset") {
                    selectedColor = null;
                    payload = { text: "You have reset the color" };
                } else {
                    selectedColor = body.parameter;
                    payload = { text: `You selected the color:\n ${body.parameter}` };
                }
            } else {
                payload = [{"text": "Select your favourite color:"},
                    { actions: [
                        {name:"blue", parameter: "blue", description:"I like the color blue"},
                        {name:"red", parameter: "red", description:"I like the color red"},
                        {name:"green", parameter: "green", description:"I like the color green"},
                        {name:"reset", parameter: "reset", description:"Reset the selected color"},
                    ]
                }]
            }
            
            break;

        case "action-sample":

            if (body.parameter) {
                payload = { text: `received parameter:\n ${JSON.stringify(body.parameter, null, 2)}` };
            } else {
                payload = [{"text": "Select one of the following actions:"},{ actions: [{name:"first action", parameter: "first parameter", description:"description of first action"},
                    {name:"second action", parameter: {field1: "second parameter", random: Math.random()*100}, description:"description of second action"},
                    {name:"third action", parameter: ["list1","list2","list3"], description:"description of third action"}]
                }]
            }
            
            break;

        case "exit-on-back-behaviour":

            payload = [
                {text: "Some sample text, that can be displayed on the Wristify Garmin Widget."},
                {properties: {backBehaviour: "exit"}}
            ];
            
            break;

        default:
            payload = null;
            break;
    }

    if (payload) {
        return res.send(payload);
    }

    res.sendStatus(404);
    return;
});

app.use(basicAuth({
    users: { "username": "password" }
}))

app.use("/api/v1", apiRouter);

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
