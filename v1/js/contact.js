var Config = {
    apiKey: "AIzaSyCZP65NowJEhbucSC0DZlUU1NI-hje_iQ8",
    authDomain: "vworkcontactinfo.firebaseapp.com",
    databaseURL: "https://vworkcontactinfo.firebaseio.com",
    projectId: "vworkcontactinfo",
    storageBucket: "vworkcontactinfo.appspot.com",
    messagingSenderId: "976309253950",
    appId: "1:976309253950:web:6eb8d50b3aa69127fede6f",
    measurementId: "G-XJFPY72GPK"
};  
 

var SelctedFile;
// Initialize Firebase
firebase.initializeApp(Config);

// Reference messages collection
// TO DO: i have to Initialize another ref for the indivisual contact
var messagesRef = firebase.database().ref('companyContactform');

// contactForm is the id of the form container 
$('#CompanyContactForm').submit(function (e) {
    e.preventDefault();

    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });

    $('.success-message').show();

    $('#CompanyContactForm')[0].reset();
});// Collecting the data and pushing it to the real database end Here


// Reference messages collection
// TO DO: i have to Initialize another ref for the indivisual contact
var messagesRef2 = firebase.database().ref('contactformmessages');

// contactForm is the id of the form container 
$('#CompanyContactForm').submit(function (e) {
    e.preventDefault();

    var newMessageRef2 = messagesRef2.push();
    newMessageRef2.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });

    $('.success-message').show();

    $('#CompanyContactForm')[0].reset();
});// Collecting the data and pushing it to the real database end Here


$("#upload-file").on("change", function (event) {
    SelctedFile = event.target.files[0];
});


function uploadfile() {
    var filename = SelctedFile.name;
    // Create a root reference
    var storageRef = firebase.storage().ref('/InternCV/' + filename);
    var UploadTask = storageRef.put(SelctedFile)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    UploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        UploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
        });
    });

}