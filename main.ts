interface UserFormData {
    name: string;
    email: string;
    education: string;
    workExperience: string;
    skills: string;
    profileimage: string;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement;
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData: UserFormData = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLTextAreaElement).value,
        workExperience: (document.getElementById("work-experience") as HTMLTextAreaElement).value,
        skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
        profileimage: await getBase64((document.getElementById("profile-image") as HTMLInputElement).files[0])
      };
  
      localStorage.setItem("resumeData", JSON.stringify(formData));
      window.location.href = "resume.html";
    });
  
    function getBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }
  });
  
  
  
  






