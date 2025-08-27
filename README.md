# Javascript sample implementation
This is a sample implementation in Javascript to show how an endpoint provider can be implemented using the API for the Wristify Garmin widget.
For information on the actual API description see [wristify-api-and-samples](https://github.com/schnoellm/wristify-api-and-samples).

## How to run on glitch.com

1. Use the following button to start a temporary instance of this sample on [glitch.com](https://glitch.com).

    [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/schnoellm/wristify-javascript-sample)

2. Once the glitch instance is up and running, use your temporary url of that instance (e.g. `https://universal-pollen-helenium.glitch.me/`) and use it with the Wristify Garmin app or with the `curl` commands below.
Make sure to append `api/v1/endpoints` to the path (e.g. `https://universal-pollen-helenium.glitch.me/api/v1/endpoints`).
3. Try to adapt the sample and play around with different response objects.
4. Run your own endpoint provider to automate any tasks with the help of your Garmin watch and the Wristify Widget.


## How to run locally
1. Clone the whole repository `git clone https://github.com/schnoellm/wristify-javascript-sample.git`
2. Change the directory `cd wristify-javascript-sample`
3. Install dependencies `npm install`
4. Run the sample `npm start`
5. By default it will run on port `3000`

## How to run it locally using docker/podman
1. Clone the whole repository `git clone https://github.com/schnoellm/wristify-javascript-sample.git`
2. Change the directory `cd wristify-javascript-sample`
3. Build the image `podman build -t wristify-javascript-sample .`
4. Run the container `podman run --rm -p 3000:3000 wristify-javascript-sample`
5. By default it will run on port `3000`


## How to use
Use curl to interact with the sample implementation. The Wristify Garmin Widget performs the same requests.
Use either `localhost` or the temporary url of your `glitch.me` instance.

**List available endpoints**
- Use curl to list the available endpoints  
    `curl -X GET http://localhost:3000/api/v1/endpoints -u "username:password"`

**Call an endpoint**
- Call one of the listed endpoints (e.g. `text-sample-1`)  
    `curl -X POST http://localhost:3000/api/v1/endpoints/text-sample-1 -u "username:password"`

**Call an action endpoint**
1. First query the available actions (e.g. `action-sample`)  
    ```sh
    curl -X POST http://localhost:3000/api/v1/endpoints/action-sample -u "username:password"
    ```
2. Check the response and select a desired action. Pass the received `parameter` value in the request  
    ```sh
    curl -X POST http://localhost:3000/api/v1/endpoints/action-sample -u "username:password" -d '{"parameter":"first parameter"}' -H "Content-Type: application/json"
    ```
3. The `parameter` value can be of any type (e.g. string, JSON object, JSON array)  
    ```sh
    curl -X POST http://localhost:3000/api/v1/endpoints/action-sample -u "username:password" -d '{"parameter":{"field1":"second parameter","random":97.58451351385055}}' -H "Content-Type: application/json"
    ```

## Debug
Use **Visual Studio Code** or **Code OSS** and the configuration in `.vscode/launch.json` to debug the sample.

## Authentication
The sample uses the HTTP basic authentication to ensure user authentication.
Change the credentials accordingly and provide them in the Garmin Connect IQ app along with the actual endpoint address you are using. Make sure to use a trusted HTTPs certificate for hosting this sample.
