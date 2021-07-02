
function getTeachingData(){

   const xhr = new XMLHttpRequest();

   xhr.open('GET', 'http://3.217.89.121:10550/api/pages/teaching/analyzeLRV', true);

   xhr.onload = function(){

      if(this.status === 200){
         const response = JSON.parse(this.responseText);

         const users = response

         console.log(users);
      } 
   }

   xhr.send()
}

function getUsers(){

   const xhr = new XMLHttpRequest();

   xhr.open('GET', 'http://3.217.89.121:10550/api/pages/users/viewall', true);

   xhr.onload = function(){

      if(this.status === 200){
         const response = JSON.parse(this.responseText);

         const users = response.data
         const languages = response.languagesData


         populateViewUsers(users)
      } 
   }

   xhr.send()
}

function editUser(id){

   const xhr = new XMLHttpRequest();

   xhr.open('GET', `http://3.217.89.121:10550/api/pages/users/edit/${id}`
   , true);

   xhr.onload = function(){

      if(this.status === 200){
         const response = JSON.parse(this.responseText).data;
         const page = document.getElementById('edit-user');

         console.log(response);

         page.querySelector('.user-name').innerHTML = `${response.firstName.toUpperCase()} ${response.lastName.toUpperCase()}`

         page.querySelector('[name="email"]').value = `${response.email}`
         page.querySelector('[name="name"]').value = `${response.firstName}`
         page.querySelector('[name="lName"]').value = `${response.lastName}`
         page.querySelector('[name="password"]').value = `${response.password}`
         page.querySelector('[name="role"]').value = `${response.role.toLowerCase()}`
         // page.querySelector('[name="term"]').value = `${response.term_id}`
         // page.querySelector('[name="class"]').value = `${response.class.toLowerCase()}`

         page.querySelectorAll('select').forEach(function(e){
            selectChange(e)
         })

         // selectChange(document.page.querySelectorAll('.test-select'))
      } 
   }

   xhr.send()
}

function populateViewUsers(users){
   const table = document.getElementById('view-users-table')
   table.innerHTML = '';
   
   users.forEach(function(e){

      e.language_id

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
         <p>${e.term}</p>
      </div>
      <div class="table-column">
         <p>${e.title}</p>
      </div>
      <div class="table-column">
         <p>${e.lastLogin}</p>
      </div>
      <div class="table-column hidden">
         <p>${e.language_id}</p>
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
}

function usersAdd(){

   const xhr = new XMLHttpRequest();

   xhr.open('GET', 'http://3.217.89.121:10550/api/pages/class/viewall', true);

   xhr.onload = function(){

      if(this.status === 200){
         const response = JSON.parse(this.responseText);

         const users = response

         console.log(users);

      } 
   }

   xhr.send()

}

function onLoad(){

   getUsers();

   // getTeachingData();

}



window.addEventListener('load', onLoad())

