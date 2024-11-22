
interface UserFormData {
  name: string;
  email: string;
  education: string;
  workExperience: string;
  skills: string;
  profileimage: string;
}

// Add an event listener to run when the document's DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the div where the resume will be displayed
  const output = document.getElementById("resume-output") as HTMLDivElement;
  
  // Retrieve the resume data from local storage
  const resumeData = localStorage.getItem("resumeData");

  // Check if resume data exists
  if (resumeData) {
    // Parse the stored resume data into a JavaScript object
    const data: UserFormData = JSON.parse(resumeData);

    // Inject the resume data into the HTML structure
    output.innerHTML = `
      <div class="resume-header">
        <img src="${data.profileimage}" alt="Profile image" class="profile-image">
        <div class="personal-info">
          <h2 contenteditable="true" class="editable" data-field="name">${data.name}</h2>
          <p><strong>Email:</strong> <span contenteditable="true" class="editable" data-field="email">${data.email}</span></p>
        </div>
      </div>
      <div class="resume-section">
        <h3>Education</h3>
        <p contenteditable="true" class="editable" data-field="education">${data.education}</p>
      </div>
      <div class="resume-section">
        <h3>Work Experience</h3>
        <p contenteditable="true" class="editable" data-field="workExperience">${data.workExperience}</p>
      </div>
      <div class="resume-section">
        <h3>Skills</h3>
        <p contenteditable="true" class="editable" data-field="skills">${data.skills}</p>
      </div>
    `;

    // Make all editable elements update the local storage on blur (when losing focus)
    const editableElements = document.querySelectorAll(".editable");

    editableElements.forEach(element => {
      element.addEventListener("blur", () => {
        // Get the field name from the data-field attribute
        const field = element.getAttribute("data-field") as keyof UserFormData;
        
        // Update the corresponding field in the data object
        data[field] = element.textContent || "";
        
        // Save the updated data back to local storage
        localStorage.setItem("resumeData", JSON.stringify(data));
      });
    });

    // Handle PDF download (using print functionality)
    document.getElementById('download-pdf').addEventListener('click', () => {
      window.print(); // Trigger browser print dialog to save as PDF
    });

    // Handle share link
    document.getElementById('share-link').addEventListener('click', () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Shareable link copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy link: ", err);
      });
    });
  }
});

  