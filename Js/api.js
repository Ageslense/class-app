function easyHTTP(){
   this.http = new XMLHttpRequest;
}

const classArrays = {

      languages: [

   ],

      departments: [

   ],
      terms: [

   ]
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

   console.log(usersData);

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

      console.log(classes);

      const userTerm = terms.find(x => x.id === response.term_id).name
      let userClasses = ''
      
      classes.forEach(function(e){
         // userClasses += classes.find(x => x.id == response.class_id).name         
         userClasses += classes.find(x => x.id == 2).name         
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

   data.languagesData.forEach(function(e){
      classArrays.languages.push(e)
   })

   data.departments.forEach(function(e){
      classArrays.departments.push(e)
   })

   data.termsData.forEach(function(e){
      classArrays.terms.push(e)
   })

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

         e.addEventListener('click', async function(e){
            let classId = e.target.getAttribute('class-id');
            const page = document.querySelector(e.target.getAttribute('data-bs-target'))

            editClass(classId);
      
         })
      })

      populateStudentsSelect()
   })



}

// Edit class GET
function editClass(id){

   const page = document.getElementById('edit-class-modal');
   const table = page.querySelector('.table-body')

   http.get(`https://mayalingo.jedburghco.com/api/pages/class/viewall`, async function(data){

      const chosenClass = data.data.find(x => x.id === id)

      const users = chosenClass.usersInClass

      page.setAttribute('class-id', id)
      
      // page.querySelector('.user-name').innerHTML = `${response.firstName.toUpperCase()} ${response.lastName.toUpperCase()}`

      page.querySelector('[name="department"]').value = `${chosenClass.department.name}`
      page.querySelector('[name="name"]').value = `${chosenClass.name}`
      page.querySelector('[name="instructor"]').value = `${chosenClass.instructor.id}`
      page.querySelector('[name="team-lead"]').value = `${chosenClass.teamLead.id}`
      page.querySelector('[name="language"]').value = `${chosenClass.language.id}`

      table.innerHTML = '';
      
      users.forEach(function(e){
      
         table.innerHTML +=`<div class="custom-table-row">
         <div class="first-col table-column">
            <label class="checkbox-container">
               <input checked type="checkbox">
               <span class="checkmark"></span>
             </label>
         </div>
         <div class="table-column">
            <p class="row-name">
               ${e.firstName} ${e.lastName}
            </p>
         </div>
         <div class="table-column large-column">
            <p>${e.email}</p>
         </div>
         <div class="table-column">
            <p>${e.term_name}</p>
         </div>
         <div class="table-column">
            <p>${e.role_name}</p>
         </div>

      </div>`
      })


   })

}

function addClass(){

   const page = document.getElementById('add-class-modal');
   const table = page.querySelector('.table-body')

   http.get(`https://mayalingo.jedburghco.com/api/pages/class/viewall`, async function(data){

      const chosenClass = data.data

      console.log(chosenClass);

      const users = chosenClass.usersInClass

      page.setAttribute('class-id', id)
      
      // page.querySelector('.user-name').innerHTML = `${response.firstName.toUpperCase()} ${response.lastName.toUpperCase()}`

      page.querySelector('[name="department"]').value = `${chosenClass.department.name}`
      page.querySelector('[name="name"]').value = `${chosenClass.name}`
      page.querySelector('[name="instructor"]').value = `${chosenClass.instructor.id}`
      page.querySelector('[name="team-lead"]').value = `${chosenClass.teamLead.id}`
      page.querySelector('[name="language"]').value = `${chosenClass.language.id}`

      table.innerHTML = '';
      
      users.forEach(function(e){
      
         table.innerHTML +=`<div class="custom-table-row">
         <div class="first-col table-column">
            <label class="checkbox-container">
               <input checked type="checkbox">
               <span class="checkmark"></span>
             </label>
         </div>
         <div class="table-column">
            <p class="row-name">
               ${e.firstName} ${e.lastName}
            </p>
         </div>
         <div class="table-column large-column">
            <p>${e.email}</p>
         </div>
         <div class="table-column">
            <p>${e.term_name}</p>
         </div>
         <div class="table-column">
            <p>${e.role_name}</p>
         </div>

      </div>`
      })


   })

}

// POST Class
function postClass(){

   const page = document.getElementById('add-class-modal')
   const table = page.querySelector('.table-body')

   const rows = table.querySelectorAll('.custom-table-row')

   let users = []

   rows.forEach(function(row){

      if(row.querySelector('input').checked == true){
         const name = row.querySelector(`.table-column:nth-child(2) p`).innerText.split(/(\s+)/).filter( e => e.trim().length > 0)

          const userId = row.getAttribute('userId');
          const firstName = name[0]
          const lastName = name[1]
          const email = row.querySelector(`.table-column:nth-child(3) p`).innerText;
          const term = row.querySelector(`.table-column:nth-child(4) p`).innerText;
          const role = row.querySelector(`.table-column:nth-child(5) p`).innerText;

         users.push({
            "id":`${userId}`,
            "firstName":`${firstName}`,
            "lastName":`${lastName}`,
            "term_name":`${term}`,
            "role_name":`${role}`,
            "email":`${email}`
         }) 

      }

   })

   const department = JSON.stringify(classArrays.departments.find(x => x.id == page.querySelector('[name="department"]').value))
   const name = page.querySelector('[name="name"]').value
   const instructor = page.querySelector('[name="instructor"]').value
   const teamLead = page.querySelector('[name="team-lead"]').value
   const language = JSON.stringify(classArrays.languages.find(x => x.id == page.querySelector('[name="language"]').value))


   const chosenClass = `{
      "name":${name},
      "instructor":[${instructor}],

      "usersInClass": ${JSON.stringify(users)}

      "language":${language},

      "department":{${department}},
      "teamLead":{${teamLead}}

   }`

   http.post('https://mayalingo.jedburghco.com/api/classes', chosenClass)
}

// PUT Class
function putClass(){

   const page = document.getElementById('edit-class-modal')
   const table = page.querySelector('.table-body')

   const rows = table.querySelectorAll('.custom-table-row')

   let users = []

   rows.forEach(function(row){

      if(row.querySelector('input').checked == true){
         const name = row.querySelector(`.table-column:nth-child(2) p`).innerText.split(/(\s+)/).filter( e => e.trim().length > 0)

          const userId = row.getAttribute('userId');
          const firstName = name[0]
          const lastName = name[1]
          const email = row.querySelector(`.table-column:nth-child(3) p`).innerText;
          const term = row.querySelector(`.table-column:nth-child(4) p`).innerText;
          const role = row.querySelector(`.table-column:nth-child(5) p`).innerText;

         users.push({
            "id":`${userId}`,
            "firstName":`${firstName}`,
            "lastName":`${lastName}`,
            "term_name":`${term}`,
            "role_name":`${role}`,
            "email":`${email}`
         }) 

      }

   })

   const department = JSON.stringify(classArrays.departments.find(x => x.id == page.querySelector('[name="department"]').value))
   const name = page.querySelector('[name="name"]').value
   const instructor = page.querySelector('[name="instructor"]').value
   const teamLead = page.querySelector('[name="team-lead"]').value
   const language = JSON.stringify(classArrays.languages.find(x => x.id == page.querySelector('[name="language"]').value))


   const chosenClass = `{
      "name":${name},
      "instructor":[${instructor}],

      "usersInClass": ${JSON.stringify(users)}

      "language":${language},

      "department":{${department}},
      "teamLead":{${teamLead}}

   }`

   http.put('https://mayalingo.jedburghco.com/api/classes', chosenClass)
}

// Teaching GET

function getTeaching(){

   http.get('https://mayalingo.jedburghco.com/api/pages/teaching/analyzeLRV', function(data){

      const page = document.getElementById('teaching-sub-tab')
      const classesSelect = page.querySelector('[name=classes]')
      const studentsSelect = page.querySelector('[name=students]')
      const users = data.usersData

      console.log(data);

      studentsSelect.innerHTML = ''
      classesSelect.innerHTML = ''

      users.forEach(function(user){

         studentsSelect.innerHTML += `
            <div class="custom-select-option">
            <label class="checkbox-container me-3">
               <input filterBy="checkbox-mult" multiFilter='teaching' type="checkbox">
               <span class="checkmark"></span>
            </label>

            <p>${user.firstName} ${user.lastName}</p>
         </div>
         `
      })

      data.classesData.forEach(function(clss){
         classesSelect.innerHTML += `
         <div class="custom-select-option">
         <label class="checkbox-container me-3">
            <input filterBy="checkbox-mult" multiFilter='teaching' type="checkbox">
            <span class="checkmark"></span>
         </label>

         <p>${clss.name}</p>
      </div>
      `
      })

      document.querySelectorAll('[multiFilter]').forEach(function(e){

         const filterType = e.getAttribute('filterBy');
         const tables = document.querySelectorAll('[teaching-table]') 
      
         switch(filterType){
      
            case 'checkbox-mult':
      
               e.addEventListener('change', function(){
      
                  tables.forEach(function(table){
      
                     switch(e.checked){
         
                        case true:
                           let filterValue = e.parentElement.nextElementSibling.innerHTML.toLowerCase();
                           filterTableByCheckboxMulti(table, filterValue);
      
                           console.log(11);
                           break;
               
                        case false:
                           filterTableByCheckboxMulti(table, "")
                           break;
                     }
                  })
      
               })
         }
      })

      const listeningTable = page.querySelector('#listening').querySelector('.table-body')
      const readingTable = page.querySelector('#reading').querySelector('.table-body')
      const vocabTable = page.querySelector('#vocab').querySelector('.table-body')

      listeningTable.innerHTML = ''
      readingTable.innerHTML = ''
      vocabTable.innerHTML = ''

      data.listeningData.forEach(function(e){

         const data = e.ilrData

         let scores = ''

         data.forEach(function(e){
            scores += `
               <div class="d-flex flex-column table-secondary-cell">
               <p>${e.n}</p>
            </div>
            
            <div class="d-flex flex-column table-secondary-cell">
               <p>${e.p}</p>
            </div>
            `
         })

         listeningTable.innerHTML += `
         <div userId='${e.userId}' class="table-secondary-row">
   
                                 <div class="table-secondary-first">
                                    <p class="row-name">${users.find(x => x.id == e.userId).firstName} ${users.find(x => x.id == e.userId).lastName}</p>
                                 </div>
   
                                ${scores}
   
                          
                               
                              </div>
         
         `
      })

      data.readingData.forEach(function(e){

         const data = e.ilrData

         let scores = ''

         data.forEach(function(e){
            scores += `
               <div class="d-flex flex-column table-secondary-cell">
               <p>${e.n}</p>
            </div>
            
            <div class="d-flex flex-column table-secondary-cell">
               <p>${e.p}</p>
            </div>
            `
         })

         readingTable.innerHTML += `
         <div userId='${e.userId}' class="table-secondary-row">
   
                                 <div class="table-secondary-first">
                                    <p class="row-name">${users.find(x => x.id == e.userId).firstName} ${users.find(x => x.id == e.userId).lastName}</p>
                                 </div>
   
                                ${scores}
   
                          
                               
                              </div>
         
         `
      })

      data.vocabData.forEach(function(e){

         const data = e.ilrData

         let scores = ''

         data.forEach(function(e){
            scores += `
               <div class="d-flex flex-column table-secondary-cell">
               <p>${e.n}</p>
            </div>
            
            <div class="d-flex flex-column table-secondary-cell">
               <p>${e.p}</p>
            </div>
            `
         })

         vocabTable.innerHTML += `
         <div userId='${e.userId}' class="table-secondary-row">
   
                                 <div class="table-secondary-first">
                                    <p class="row-name">${users.find(x => x.id == e.userId).firstName} ${users.find(x => x.id == e.userId).lastName}</p>
                                 </div>
   
                                ${scores}
   
                          
                               
                              </div>
         
         `
      })


   })
}

function populateStudentsSelect(){

   http.get('https://mayalingo.jedburghco.com/api/pages/users/viewall', function(usersData){

      const users = usersData.data;

      document.querySelectorAll('[name="students-select"]').forEach(function(e){
   
         let selectOptions = e;

         selectOptions.innerHTML = ''
   
         users.forEach(function(e){
   
            selectOptions.innerHTML += `<div userId="${e.id}" class="custom-select-option">
            <label class="checkbox-container me-3">
               <input type="checkbox">
               <span class="checkmark"></span>
             </label>
   
             <p>${e.firstName} ${e.lastName}</p>
         </div>`
         })
   
         selectOptions.innerHTML += '<div add-student-to-table class="align-self-end dropdown-btn btn btn-light-custom">ADD</div>'

         document.querySelectorAll('[add-student-to-table]').forEach(function(e){

            e.addEventListener('click', function(){

               addSelectedStudents(e.parentElement.parentElement.parentElement.parentElement, users)
            })
         })


      })

      
   })
}

function addSelectedStudents(target, users){

   const select = target.querySelector('.custom-select-secondary')
   const table = target.querySelector('.table-body')

   table.innerHTML = ''

   select.querySelectorAll('input').forEach(function(checkbox){

      if(checkbox.checked == true){
   
         const userId = checkbox.parentElement.parentElement.getAttribute('userId')
         const user = users.find(x => x.id === userId)

         table.innerHTML +=`<div class="custom-table-row">
         <div class="first-col table-column">
            <label class="checkbox-container">
               <input checked type="checkbox">
               <span class="checkmark"></span>
             </label>
         </div>
         <div class="table-column">
            <p class="row-name">
               ${user.firstName} ${user.lastName}
            </p>
         </div>
         <div class="table-column large-column">
            <p>${user.email}</p>
         </div>
         <div class="table-column">
            <p>${user.term_name}</p>
         </div>
         <div class="table-column">
            <p>${user.role_name}</p>
         </div>

      </div>`   
         
      }
   })



}

function onLoad(){
   populateViewUsers()
}

onLoad()