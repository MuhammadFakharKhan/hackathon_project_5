// Import jsPDF from "jspdf" library for generating PDFs
// import jsPDF from "jspdf";
// // Import html2canvas library for converting HTML elements to canvas
// import html2canvas from "html2canvas";
// Add an event listener to run when the document's DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the div where the resume will be displayed
    var output = document.getElementById("resume-output");
    // Retrieve the resume data from local storage
    var resumeData = localStorage.getItem("resumeData");
    // Check if resume data exists
    if (resumeData) {
        // Parse the stored resume data into a JavaScript object
        var data_1 = JSON.parse(resumeData);
        // Inject the resume data into the HTML structure
        output.innerHTML = "\n      <div class=\"resume-header\">\n        <img src=\"".concat(data_1.profileimage, "\" alt=\"Profile image\" class=\"profile-image\">\n        <div class=\"personal-info\">\n          <h2 contenteditable=\"true\" class=\"editable\" data-field=\"name\">").concat(data_1.name, "</h2>\n          <p><strong>Email:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"email\">").concat(data_1.email, "</span></p>\n        </div>\n      </div>\n      <div class=\"resume-section\">\n        <h3>Education</h3>\n        <p contenteditable=\"true\" class=\"editable\" data-field=\"education\">").concat(data_1.education, "</p>\n      </div>\n      <div class=\"resume-section\">\n        <h3>Work Experience</h3>\n        <p contenteditable=\"true\" class=\"editable\" data-field=\"workExperience\">").concat(data_1.workExperience, "</p>\n      </div>\n      <div class=\"resume-section\">\n        <h3>Skills</h3>\n        <p contenteditable=\"true\" class=\"editable\" data-field=\"skills\">").concat(data_1.skills, "</p>\n      </div>\n    ");
        // Make all editable elements update the local storage on blur (when losing focus)
        var editableElements = document.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            element.addEventListener("blur", function () {
                // Get the field name from the data-field attribute
                var field = element.getAttribute("data-field");
                // Update the corresponding field in the data object
                data_1[field] = element.textContent || "";
                // Save the updated data back to local storage
                localStorage.setItem("resumeData", JSON.stringify(data_1));
            });
        });
        // Handle PDF download (using print functionality)
        document.getElementById('download-pdf').addEventListener('click', function () {
            window.print(); // Trigger browser print dialog to save as PDF
        });
        // Handle share link
        document.getElementById('share-link').addEventListener('click', function () {
            var url = window.location.href;
            navigator.clipboard.writeText(url).then(function () {
                alert("Shareable link copied to clipboard!");
            }).catch(function (err) {
                console.error("Failed to copy link: ", err);
            });
        });
    }
});
// Handle PDF download when the "Download PDF" button is clicked
// document.getElementById('download-pdf').addEventListener('click', () => {
//   generatePDF();
// });
//     // Handle share link when the "Copy Shareable Link" button is clicked
//     document.getElementById('share-link').addEventListener('click', () => {
//       const url = window.location.href;
//       navigator.clipboard.writeText(url).then(() => {
//         alert("Shareable link copied to clipboard!");
//       }).catch(err => {
//         console.error("Failed to copy link: ", err);
//       });
//     });
//   }
// });
// Function to generate a PDF of the resume
// async function generatePDF() {
//   const doc = new jsPDF(); // Create a new jsPDF instance
//   const element = document.getElementById('resume-output') as HTMLElement; // Get the resume output element
// Check if the element exists
//   if (element) {
//     try {
//       // Convert the element to canvas
//       const canvas = await html2canvas(element);
//       // Get the image data from the canvas
//       const imgData = canvas.toDataURL('image/png');
//       // Add the image data to the PDF
//       doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
//       // Save the PDF with the filename "resume.pdf"
//       doc.save('resume.pdf');
//     } catch (error) {
//       console.error("Error generating PDF:", error); // Log any errors
//     }
//   } else {
//     console.error("Element not found for PDF generation"); // Log an error if the element is not found
//   }
// }
