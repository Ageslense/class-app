document.querySelectorAll(".main-nav-item").forEach(function(element){
   element.addEventListener('click', function(){

      // Close other tab options
      document.querySelectorAll('.main-nav-item').forEach(function(e){
         e.parentElement.classList.remove('active');
      });

      // Open tab options
      element.parentElement.classList.add('active');

      let tabCategory = '.main-content';


      switch(element.id){

         case 'users-toggler':
            tabID = '#users';
            break;

         case 'teaching-toggler':
            tabID = '#teaching';
            break;
      }
      
      tabChange(tabCategory, tabID);
   })
})

document.querySelectorAll(".tab-option").forEach(function(element){
   element.addEventListener('click', function(){

      // Close other tab options
      element.parentElement.querySelectorAll('.tab-option').forEach(function(e){
         e.classList.remove('active');
      });

      // Open tab options
      element.classList.add('active');

      switch(element.parentElement.parentElement.id){

         case 'users-toggler':
            tabCategory = '.users-secondary';
            break;

         case 'teaching-toggler':
            tabCategory = '.teaching-secondary';
            break;
      }

      switch(element.id){

         case 'view-users-toggler':
            tabID = '#view-users';
            break;

         case 'add-user-toggler':
            tabID = '#add-user';
            break;

         case 'manage-classes-toggler':
            tabID = '#manage-classes';
            break;

         case 'manage-tags-toggler':
            tabID = '#manage-tags';
            break;

         case '':
            tabID = '#teaching-sub-tab';
            break;
      }
      
      tabChange(tabCategory, tabID);
   })
})

document.querySelectorAll(".view-user-link").forEach(function(element){
   element.addEventListener('click', function(){

      // Close other tab options
      document.querySelectorAll('.tab-option').forEach(function(e){
         e.classList.remove('active');
      });

      let tabCategory = '.dotted-content-container';

      let tabID = '#view-users'
      
      tabChange(tabCategory, tabID);
   })
})

document.querySelector("#add-user-btn").addEventListener('click', function(){

      // Close other tab options
      document.querySelectorAll('.tab-option').forEach(function(e){
         e.classList.remove('active');
      });

      document.querySelector('#add-user-toggler').classList.add('active');

      let tabCategory = '.dotted-content-container';
      
      tabChange(tabCategory, '#add-user');
   })

document.querySelectorAll('.show-btn').forEach(function(btn){
   
   btn.addEventListener('click', function(){
         
      switch(btn.innerHTML){
   
         case 'SHOW':
            btn.innerHTML = 'HIDE';
            btn.previousElementSibling.style.display = 'block'
            break;

         case 'ADD NEW':
            btn.innerHTML = 'SAVE';
            document.querySelector('.input-small').style.display = 'block'
            break;
   
         case 'HIDE':
            btn.innerHTML = 'SHOW';
            btn.previousElementSibling.style.display = 'none'
            break;

         case 'SAVE':
            btn.innerHTML = 'ADD NEW';
            document.querySelector('.input-small').style.display = 'none'
            break;
      }
   
   })
})

document.querySelectorAll('.search-btn').forEach(function(btn){
   
   btn.addEventListener('click', function(e){

      let filter = e.target.nextElementSibling.value.toLowerCase();

      filterTable(e.target, filter, 'text');

      e.target.nextElementSibling.value = '';
})})


// Checkbox filter
document.querySelectorAll('[filterBy="checkbox"]').forEach(function(checkbox){

   checkbox.addEventListener('mouseup', function(){

      let input = checkbox.querySelector('input')

      if(input.value == "on"){

         let filterValue = checkbox.nextElementSibling.innerHTML.toLowerCase();

         filterTable(checkbox, filterValue, 'checkbox');

      } else {

         filterTable(checkbox, "", 'checkbox')
      }
   })
})

function tabChange(tabCategory, tabID){
   let primaryTabs = document.querySelectorAll(tabCategory);
   let reqTab = document.querySelector(tabID);

   primaryTabs.forEach(function(primaryTab){
      primaryTab.style.display = 'none';
   })
   
   reqTab.style.display = 'block';
}

async function filterTable(UIfilter, filter, filterPos){

   let UItable = document.querySelector(UIfilter.getAttribute("filterTarget"));
   let items = UItable.querySelectorAll('.table-column p')
   let attr;

   switch (filterPos){

      case 'text': 
      attr = 'text-filter';
      break;

      case 'select': 
      attr = 'select-filter';
      break;

      case 'checkbox': 
      attr = 'checkbox-filter';
      break;
   }

   await items.forEach(function(e){
      e.parentElement.parentElement.setAttribute(attr, 1)     
   })

   await items.forEach(function(e){

      if(e.textContent.toLowerCase().indexOf(filter) != -1){
         e.parentElement.parentElement.removeAttribute(attr)
      } 
   })

   removeFiltered(UItable)
}

function removeFiltered(table){


   table.querySelectorAll('.custom-table-row').forEach(function(e){
      e.style.display = 'grid'
   })

   // table.querySelectorAll('.custom-table-row').forEach(function(e){

   //    if(e.classList.contains('filtered')){
   //       e.parentElement.style.display = 'grid'

   //    }
   // })

   table.querySelectorAll('[text-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[select-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[checkbox-filter]').forEach(function(e){
      e.style.display = "none"
   })
}