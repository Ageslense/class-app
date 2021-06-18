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
      document.querySelectorAll('.tab-option').forEach(function(e){
         e.classList.remove('active');
      });

      // Open tab options
      element.classList.add('active');

      let tabCategory = '.dotted-content-container';

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
      }
      
      tabChange(tabCategory, tabID);
   })
})

document.querySelectorAll(".edit-user").forEach(function(element){
   element.addEventListener('click', function(){

      // Close other tab options
      document.querySelectorAll('.tab-option').forEach(function(e){
         e.classList.remove('active');
      });

      let tabCategory = '.dotted-content-container';

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
            tabID = '#edit-user';
            break;
      }
      
      tabChange(tabCategory, tabID);
   })
})

document.querySelector('.show-btn').addEventListener('click', function(){
   
   let btn = document.querySelector('.show-btn');
   
   switch(btn.innerHTML){

      case 'SHOW':
         btn.innerHTML = 'HIDE';
         btn.previousElementSibling.style.display = 'block'
         break;

      case 'HIDE':
         btn.innerHTML = 'SHOW';
         btn.previousElementSibling.style.display = 'none'
         break;
   }

})

function tabChange(tabCategory, tabID){
   let primaryTabs = document.querySelectorAll(tabCategory);
   let reqTab = document.querySelector(tabID);

   primaryTabs.forEach(function(primaryTab){
      primaryTab.style.display = 'none';
   })
   
   reqTab.style.display = 'block';
}