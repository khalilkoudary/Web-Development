Name: Khalil Koudary
Student ID: 40088454

WebCodecs Demo

This is a simple web application that demonstrates the use of WebCodecs for video recording and playback. 
The application consists of two main components: an HTML file for the user interface and a server-side JavaScript file for handling video uploads and serving video files.
I've experienced difficulty with segmenting the video and uploading to the university server; therefore, this implementation of the lab lacks video segmentation and works on my local server. 

Prerequisites:

Before you can run the WebCodecs Demo, you need to have the following software installed on your system:

Node.js: A JavaScript runtime that allows you to run JavaScript code on the server side. Download and install the latest LTS version from the official website.
npm: The package manager for JavaScript and Node.js, which is included with Node.js by default. You'll use npm to install the required dependencies for the server.

Files:

index.html

index.html is the main user interface for the WebCodecs Demo. It contains:

1. Two video elements: one for displaying the live video feed from the user's camera and another for playing back the recorded videos.
2. Start and stop recording buttons: these buttons control the recording of the live video feed.
3. List Videos button: this button fetches the list of recorded videos from the server.
4. An unordered list element: this element displays the list of recorded videos.

The JavaScript code embedded in index.html handles the following tasks:

1. Requesting access to the user's camera and microphone.
2. Starting and stopping the video recording using the WebCodecs API.
3. Saving the recorded video to the server using an XMLHttpRequest.
4. Fetching the list of recorded videos from the server and updating the video list in the user interface.
5. Playing back the recorded videos when a user clicks on a video in the list.

server.js

server.js is a server-side JavaScript file that uses Express to create a simple web server. The server is responsible for:

1. Serving the static video files from the videos folder.
2. Handling video uploads using the multer library for file uploads.
3. Storing the uploaded video files on the server's file system using the fs library.
4. Providing an endpoint to list the available video files.

The server has two main endpoints:

1. POST /save-video: This endpoint accepts an uploaded video file, generates a unique filename for it, and saves it to the videos folder.
2. GET /list-videos: This endpoint reads the contents of the videos folder and returns a JSON list of the available video files, filtered to include only .mp4 files.