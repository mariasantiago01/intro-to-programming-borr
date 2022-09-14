//Footer Section
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `Maria Santiago ${thisYear}`;

const socialMedia = document.createElement('p');
socialMedia.innerHTML = `<a class="social-a" href="https://www.linkedin.com/in/mariaisantiago/">LinkedIn</a>
<a class="social-a" href="https://github.com/mariasantiago01">GitHub</a>`;


footer.appendChild(copyright);
footer.appendChild(socialMedia);

//Skills Section
const skills = ["HTML", "CSS", "JavaScript"];

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.classList.add('each-skill');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
};

//Message Form Section
const messageForm = document.getElementsByName("leave_message");
messageForm[0].addEventListener('submit', (e) => {
   e.preventDefault()

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    console.log(name, email, message);

//Message Display
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.classList.add('each-message');
    newMessage.innerHTML = `
    <p><a href="mailto: ${email}">${name}</a> wrote: </p>
    <p><span>${message}</span></p>`;

    //**Stretch Goal**  Messages Heading 
    const messageHeading = messageSection.querySelector('h2');
    messageHeading.innerHTML = "Messages";

    //Remove button
    const removeButton = document.createElement('button');
    removeButton.innerText = "remove";
    removeButton.setAttribute('type','button');
    removeButton.addEventListener('click', (e) => {
        const entry = removeButton.parentNode;
        entry.remove();

        const listItems = messageList.getElementsByTagName('li');
        if (listItems.length == 0) {
            messages.style.display='none';
        }
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm[0].reset();
});

//Fetch Github Repositories
fetch('https://api.github.com/users/mariasantiago01/repos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        const repositories = response;
        console.log(repositories);
        const projectSection = document.getElementById('projects');
        const projectList = projectSection.querySelector('ul');
        
        for (i = 0; i < repositories.length; i++) {
            const project = document.createElement('li');
            project.classList.add('each-project');

            project.innerHTML = `<a href=${repositories[i].html_url}>${repositories[i].name}</a>`;

            projectList.appendChild(project);
        }
    })
    .catch(function(error) {
        console.error("There has been a problem with the fetch operation: ", error);
    });