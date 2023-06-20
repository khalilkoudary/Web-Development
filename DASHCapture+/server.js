// Import the 'express' library for creating the server
const express = require('express');

// Import the 'multer' library for handling file uploads
const multer = require('multer');

// Import the 'fs' library for reading and writing to the file system
const fs = require('fs');

// Import the 'child_process' library for executing shell commands
const { exec } = require('child_process');

// Create a new Express app
const app = express();

// Serve the static video files from the 'videos' folder
app.use('/videos', express.static('videos'));

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Counter for naming recorded videos
let videoCounter = 0;

// Endpoint for saving a recorded video
app.post('/save-video', upload.single('file'), (req, res) => {
  // Function to generate a unique filename for the recorded video
  function getNextVideoFilename() {
    const filename = `recorded_video_${videoCounter}.mp4`;
    
    // Check if the filename already exists
    if (fs.existsSync(`./videos/${filename}`)) {
      videoCounter++; // If it does, increment the counter and try again
      return getNextVideoFilename();
    }
    return filename; // If the filename doesn't exist, return it
  }

  const videoFilename = getNextVideoFilename(); // Generate a filename for the recorded video
  console.log(`Saved: ${videoFilename}`);

  // Write the recorded video to disk
  fs.writeFileSync(`./videos/${videoFilename}`, req.file.buffer);

  // Send a response indicating that the video was saved successfully
  res.status(200).send('Video saved');
});

// Endpoint for listing the available videos
app.get('/list-videos', (req, res) => {
  const videoDirectory = './videos';

  // Read the contents of the video directory
  fs.readdir(videoDirectory, (err, files) => {
    if (err) {
      // Log an error and send an error response if there is a problem reading the directory
      console.error('Error reading video directory:', err);
      res.status(500).send('Error reading video directory');
    } else {
      // Filter the list of files to only include .mp4 files and send the list as a JSON response
      res.status(200).json(files.filter(file => file.endsWith('.mp4')));
    }
  });
});

// Start the server and log the URL
app.listen(6670, () => {
  console.log('Server started on http://localhost:6670');
});
