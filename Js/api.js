function easyHTTP(){
   this.http = new XMLHttpRequest;
}

// HTTP GET request
easyHTTP.prototype.get = function(url, callback){

   this.http.open('GET', url, true);

   let self = this;
   this.http.onload = function() {
      if(self.http.status === 200){
         callback(JSON.parse(self.http.responseText));
      }
   }

   this.http.send();
}

// HTTP POST request
easyHTTP.prototype.post = function(url, data, callback){

   this.http.open('POST', url, true)

   this.http.setRequestHeader('Content-type', 'application/json');

   let self = this;
   this.http.onload = function() {
      if(self.http.status === 200){
         callback(JSON.parse(self.http.responseText));
      }
   }
      
   this.http.send(JSON.stringify(data))
}

// HTTP PUT request
easyHTTP.prototype.put = function(url, data, callback){

   this.http.open('PUT', url, true)

   this.http.setRequestHeader('Content-type', 'application/json');

   let self = this;
   this.http.onload = function() {
      if(self.http.status === 200){
         callback(JSON.parse(self.http.responseText));
      }
   }
      
   this.http.send(JSON.stringify(data))
}

// HTTP DELETE request
easyHTTP.prototype.delete = function(url, callback){

   this.http.open('DELETE', url, true);

   let self = this;
   this.http.onload = function() {
      if(self.http.status === 200){
         callback(JSON.parse(self.http.responseText));
      }
   }

   this.http.send();
}

const http = new easyHTTP;

//Populate view all

function populateViewUsers(){

   http.get('https://mayalingo.jedburghco.com/api/pages/users/viewall', function(usersData){

   const users = usersData.data;
   const languages = usersData.languagesData;
   const terms = usersData.termsData;
   
   const table = document.getElementById('view-users-table')
   table.innerHTML = '';
   
   users.forEach(function(e){

      const userTerm = e.term_id
      const userLanguages = e.languages_id

      let languageHtml = '';
      let termHtml = terms.find(x => x.id === userTerm).name;

      userLanguages.forEach(function(e){
         languageHtml += languages.find(x => x.id === e).name
      })


      table.innerHTML += `<div  class="custom-table-row">
      <div class="first-col table-column">
         <label class="checkbox-container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
      </div>
      <div class="table-column">
         <p userId=${e.id} class="row-name edit-user">
           ${e.firstName} ${e.lastName}
         </p>
      </div>
      <div class="table-column large-column">
         <p>${e.email}</p>
      </div>
      <div class="table-column">
         <p>${termHtml}</p>
      </div>
      <div class="table-column">
         <p>${e.title}</p>
      </div>
      <div class="table-column">
         <p>${e.lastLogin}</p>
      </div>
      <div class="table-column hidden">
         <p>${languageHtml}</p>
      </div>

   </div>`
   })

   document.querySelectorAll(".edit-user").forEach(function(element){
      element.addEventListener('click', function(e){
   
         // Close other tab options
         document.querySelectorAll('.tab-option').forEach(function(e){
            e.classList.remove('active');
         });
   
         let tabCategory = '.dotted-content-container';
   
         tabID = '#edit-user'
         
         tabChange(tabCategory, tabID);

         editUser(e.target.getAttribute('userId'))

      })
   })

})
}

//Edit User
function editUser(id){

   http.get(`https://mayalingo.jedburghco.com/api/pages/users/edit/${id}`, function(user){

      const page = document.getElementById('edit-user');
      page.setAttribute('user', id)
      const response = user.data;
      const terms = user.termsData;
      const classes = user.classes;

      const userTerm = terms.find(x => x.id === response.term_id).name
      let userClasses = ''
      
      classes.forEach(function(e){
         // userClasses += classes.find(x => x.id === response.class_id).name
         userClasses += classes.find(x => x.id === 2).name
         
      })

      
      page.querySelector('.user-name').innerHTML = `${response.firstName.toUpperCase()} ${response.lastName.toUpperCase()}`

      page.querySelector('[name="email"]').value = `${response.email}`
      page.querySelector('[name="name"]').value = `${response.firstName}`
      page.querySelector('[name="lName"]').value = `${response.lastName}`
      page.querySelector('[name="password"]').value = `${response.password}`
      page.querySelector('[name="role"]').value = `${response.role.toLowerCase()}`
      page.querySelector('[name="term"]').value = `${userTerm}`
      page.querySelector('[name="class"]').value = `${userClasses}`

      page.querySelectorAll('select').forEach(function(e){
         selectChange(e)
      })

   })

      // selectChange(document.page.querySelectorAll('.test-select'))
   

}

// Save user
function saveUser(){

   const page = document.getElementById('edit-user')

   const email = page.querySelector('[name=email]').value
   const name = page.querySelector('[name=name]').value
   const lName = page.querySelector('[name=lName]').value
   const role = page.querySelector('[name=role]').value
   const password = page.querySelector('[name=password]').value
   const term = page.querySelector('[name=term]').value
   const userClass = page.querySelector('[name=class]').value
   const notify = page.querySelector('[name=notify]').checked
   const id = page.getAttribute('user');

   const user = {
      "id":`${id}`,
      "email":`${email}`,
      "firstName":`${name}`,
      "lastName":`${lName}`,
      "role":`${role}`,
      "term_id":`${term}`,
      "class_id":`${userClass}`,
      "password":`${password}`,
      "isSendEmail":`${notify}`
   } 

   http.put('https://mayalingo.jedburghco.com/api/users', user, '')

   console.log(user);

}

// Add User
function addUser(){

   const page = document.getElementById('add-user');

   const email = page.querySelector('[name=email]').value
   const name = page.querySelector('[name=name]').value
   const lName = page.querySelector('[name=lName]').value
   const role = page.querySelector('[name=role]').value
   const password = page.querySelector('[name=password]').value
   const term = page.querySelector('[name=term]').value
   const userClass = page.querySelector('[name=class]').value
   const notify = page.querySelector('[name=notify]').checked

   const user = {
      "email":`${email}`,
      "firstName":`${name}`,
      "lastName":`${lName}`,
      "role":`${role}`,
      "term_id":`${term}`,
      "class_id":`${userClass}`,
      "password":`${password}`,
      "isSendEmail":`${notify}`
   }  

   http.post('https://mayalingo.jedburghco.com/api/users', user, '')

console.log(user);

}

// Populate view all classes
function populateViewClasses(){

   http.get('https://mayalingo.jedburghco.com/api/pages/class/viewall', function(data){

      const classes = data.data;
      
      const table = document.getElementById('manage-classes-table')
      table.innerHTML = '';
      
      classes.forEach(function(e){
   
         // const userTerm = e.term.name
         // const userLanguages = e.languages_id
   
         // let languageHtml = '';
         // let termHtml = terms.find(x => x.id === userTerm).name;
   
         // userLanguages.forEach(function(e){
         //    languageHtml += languages.find(x => x.id === e).name
         // })
   
   
         table.innerHTML +=`<div class="custom-table-row">
         <div class="first-col table-column">
            <label class="checkbox-container">
               <input type="checkbox">
               <span class="checkmark"></span>
             </label>
         </div>
         <div class="table-column">
            <p data-bs-toggle="modal" class-id="${e.id}" data-bs-target="#edit-class-modal" class="edit-class">
               ${e.department.name}
            </p>
         </div>
         <div class="table-column">
            <p>${e.language.name}</p>
         </div>
         <div class="table-column">
            <p>${e.term.name}</p>
         </div>
         <div class="table-column">
            <p>${e.teamLead.firstName} ${e.teamLead.lastName}</p>
         </div>
         <div class="table-column">
            <p>${e.usersInClass.length}</p>
         </div>

      </div>`
      })

      document.querySelectorAll('.edit-class').forEach(function(e){

         e.addEventListener('click', function(e){
            let classId = e.target.getAttribute('class-id');

            editClass(classId);
         })
      })
   })
}

// Edit class GET
function editClass(id){

   http.get(`https://mayalingo.jedburghco.com/api/pages/class/viewall`, function(data){

      const chosenClass = data.data.find(x => x.id === id)

      const page = document.getElementById('edit-class-modal');
      const users = chosenClass.usersInClass

      console.log(chosenClass);

      page.setAttribute('class-id', id)
      
      
      // page.querySelector('.user-name').innerHTML = `${response.firstName.toUpperCase()} ${response.lastName.toUpperCase()}`

      page.querySelector('[name="department"]').value = `${chosenClass.department.name}`
      page.querySelector('[name="name"]').value = `${chosenClass.name}`
      page.querySelector('[name="instructor"]').value = `${chosenClass.instructor.id}`
      page.querySelector('[name="team-lead"]').value = `${chosenClass.teamLead.id}`
      page.querySelector('[name="language"]').value = `${chosenClass.language.id}`

   })

      // selectChange(document.page.querySelectorAll('.test-select'))
   

}

function onLoad(){

   populateViewUsers()
}

onLoad()