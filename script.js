// Load models for face-api.js
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  }
  
  // Start the webcam without displaying the video feed
  async function startWebcam() {
    const video = document.getElementById('videoInput');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {}  // Request video stream from the webcam
    });
    video.srcObject = stream;
  
    // Wait for the video to load and start detecting faces
    video.onloadeddata = () => {
      detectFace();
    };
  }
  
  // Detect faces and perform facial recognition
  async function detectFace() {
    const video = document.getElementById('videoInput');
    
    // Continuously detect faces every 100ms
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();
      
      if (detections.length > 0) {
        console.log('Face detected:', detections);
        
        // Example: You can add your facial recognition logic here to match with student data
        // For instance, you could compare the face descriptor with stored descriptors.
      }
    }, 100);
  }
  
  // Call the load models and start the webcam when the page loads
  window.onload = () => {
    loadModels().then(() => {
      startWebcam();
    });
  };
  
  // Example functions for student management (not modified)
  function addStudent() {
    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const course = document.getElementById('course').value;
    const marks = document.getElementById('marks').value;
  
    const studentList = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const newRow = studentList.insertRow();
    
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${rollNumber}</td>
      <td>${course}</td>
      <td>${marks}</td>
      <td><button onclick="deleteStudent(this)">Delete</button></td>
    `;
  }
  
  function deleteStudent(button) {
    const row = button.closest('tr');
    row.remove();
  }
  
  function predictGrade() {
    const mathMarks = document.getElementById('math').value;
    const englishMarks = document.getElementById('english').value;
    const scienceMarks = document.getElementById('science').value;
  
    // Predict grade based on marks (example logic, can be replaced with actual model prediction)
    const totalMarks = parseInt(mathMarks) + parseInt(englishMarks) + parseInt(scienceMarks);
    let grade = '';
  
    if (totalMarks >= 240) {
      grade = 'A';
    } else if (totalMarks >= 180) {
      grade = 'B';
    } else {
      grade = 'C';
    }
  
    document.getElementById('predictedGrade').textContent = 'Predicted Grade: ' + grade;
  }
  