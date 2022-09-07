//Footer Section
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `Maria Santiago ${thisYear}`;

footer.appendChild(copyright);

//Skills Section
const skills = ["HTML", "CSS", "JavaScript"];

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
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
    
    newMessage.innerHTML = `
    <p><a href="mailto: ${email}">${name}</a> wrote: </p>
    <p><span>${message}</span></p>`;

    //**Stretch Goal**  Messages Heading 
    //only works when message list starts out empty
    const messageHeading = messageSection.querySelector('h2');
    messageHeading.innerHTML = "Messages";

    //**Stretch Goal** Edit button - *****HIDDEN*****UNDER-CONSTRUCTION*****
    //I tried to use the following line, but it wouldn't work.
        //const editMessage = newMessage.getElementsByName('message');
    //Add a class to the newMessage portion... **under-construction**

    //edit button (do not change)
    //const editButton = document.createElement('button');
    //editButton.innerText='edit';
    //editButton.setAttribute('type', 'button');

    //const finishEditing = document.createElement('button');
    //finishEditing.innerText = 'done';
    //finishEditing.setAttribute('type', 'button');

    //editButton.addEventListener('click', (e) => {
       //initially used this, which didn't work
        //editMessage.contentEditable = true;
        //messageEdit.contentEditable = true;

       //the above works, but it allows to edit the whole newMessage textline, not just the message portion.
    //});

    //finishEditing.addEventListener('click', (e) => {
        //editMessage.contentEditable = false;
        //newMessage.contentEditable = false;
    //});

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
    //newMessage.appendChild(editButton); //Under-Construction
    //newMessage.appendChild(finishEditing); //Under-construction

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
            //initially was innerText
            project.innerHTML = `<a href=${repositories[i].html_url}>${repositories[i].name}</a>  
            ${new Date(repositories[i].created_at)}`;
            projectList.appendChild(project);
        }
    })
    .catch(function(error) {
        console.error("There has been a problem with the fetch operation: ", error);
    });