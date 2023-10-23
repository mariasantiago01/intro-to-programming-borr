//Footer Section
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `Maria Santiago ${thisYear}`;

const socialMedia = document.createElement('p');
socialMedia.innerHTML = `<a class="fa fa-linkedin" href="https://www.linkedin.com/in/mariaisantiago/"></a>
<a class="fa fa-github" href="https://github.com/mariasantiago01"></a>`;


footer.appendChild(copyright);
footer.appendChild(socialMedia);

//Hamburger Menu Section
const hamburger = document.querySelector('.hamburger');
const navMenu= document.querySelector('.menu-items');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
})

document.querySelectorAll('nav a').forEach(n => 
n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}))

//Skills Section
const skills = ["HTML", "CSS", "JavaScript", "Node.js"];

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
    <p><span class="added-message" contenteditable="false">${message}</span></p>`;

    //**Stretch Goal**  Messages Heading 
    const messageHeading = messageSection.querySelector('h2');
    messageHeading.innerHTML = "Messages";

    // Create edit button
    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.setAttribute('type','button');

    let editableMessage = document.getElementsByClassName("added-message");
    
    //Give functionality to edit button
    editButton.addEventListener('click', (e) => {
        editableMessage[0].style.padding = "5px";
        editableMessage[0].style.backgroundColor = "#b7a9d3"; 
        editableMessage[0].style.borderRadius = "3px";
        editableMessage[0].style.border = "#5e548e 1px solid";          
        editableMessage[0].setAttribute("contenteditable", true);
        editButton.innerText= 'done';

        //"done button" event after clicking it 
        editButton.addEventListener('click', (e) => {
            editableMessage[0].style.backgroundColor = ""; 
            editableMessage[0].style.border = ""; 
            editableMessage[0].setAttribute("contenteditable", false);
            editButton.remove();
        });
    })

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
    newMessage.appendChild(editButton);
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
