# Javascript sample implementation
This is a sample implementation in Javascript to show how an endpoint provider can be implemented using the API for the Wristify Garmin widget.
For information on the actual API description see [wristify-api-and-samples](https://github.com/schnoellm/wristify-api-and-samples).

## How to use the ready-made demo with Wristify
1. The code of this sample implementation is hosted on vercel.app on the following domain: https://wristify-javascript-sample.vercel.app
2. You can use that instance for checking out Wristify and get an idea of the possibilities.
3. Use the following information to configure Wristify using the Connect IQ mobile app. Navigate to the app settings and enter the respective configuration:
    - Endpoint url: `https://wristify-javascript-sample.vercel.app/api/v1/endpoints`
    - Username: `username`
    - Password: `password`
4. Save the configuration and restart the Wristify widget on your watch.
5. You can then access the sample implementation and check out the possibilities of Wristify.

**Important:** Keep in mind that you need to implement and deploy your own REST based web service in order to achieve customized functionality.

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
