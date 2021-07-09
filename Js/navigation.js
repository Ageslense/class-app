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

         case 'home-toggler':
            tabID = '#home';
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
            populateViewClasses()

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

document.querySelector('.save-user-btn').addEventListener('click', function(){
   saveUser()
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

document.querySelectorAll('.add-dept-btn').forEach(function(e){

   e.addEventListener('click', function(e){

      console.log(2);

      const input = e.target.nextElementSibling;

      switch(e.target.textContent){

         case '+':
            input.classList.add('active');
            e.target.classList.add('active');
            e.target.textContent = 'SAVE';
            break;

         case 'SAVE':
            input.classList.remove('active');
            e.target.classList.remove('active');
            e.target.textContent = '+';
            break;
      }
   })
})

document.querySelectorAll('.add-dept-input').forEach(function(e){

   e.addEventListener('keypress', function(e){

      const btn = e.target.previousElementSibling;

      if(e.key === 'Enter'){

         e.target.classList.remove('active')
         btn.textContent = '+'
         btn.classList.remove('active')
      }
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

document.querySelectorAll('.search-btn-singular').forEach(function(btn){
   
   btn.addEventListener('click', function(e){

      let filter = e.target.nextElementSibling.value.toLowerCase();

      filterTable(e.target, filter, 'text');

      e.target.nextElementSibling.value = '';
})})

document.querySelectorAll('.search-input').forEach(function(btn){
   
   btn.addEventListener('keypress', function(e){

      if(e.key === 'Enter'){
         let filter = e.target.value.toLowerCase();
   
         filterTable(e.target, filter, 'text');
   
         e.target.value = '';
      }

})})

// Checkbox filter
document.querySelectorAll('[filterBy="checkbox"]').forEach(function(checkbox){

   checkbox.addEventListener('change', function(){

      // if(checkbox.getAttribute('filterMultipleTarget') != null){

      //    attr = checkbox.getAttribute('filterMultipleTarget');

      //    console.log(attr);


      //    return;
      // }

      switch(checkbox.checked){

         case true:
            let filterValue = checkbox.parentElement.nextElementSibling.innerHTML.toLowerCase();
            filterTableByCheckbox(checkbox, filterValue);
            break;

         case false:
            filterTableByCheckbox(checkbox, "")
            break;
      }

   })
})

//Teaching filters
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

document.querySelectorAll('.search-btn-multi').forEach(function(btn){
   
   const tables = document.querySelectorAll('[teaching-table]') 

  
   btn.addEventListener('click', function(e){

      let filter = e.target.nextElementSibling.value.toLowerCase();

      tables.forEach(function(table){

         filterTableMulti(table, filter);
      })


      e.target.nextElementSibling.value = '';

})})

document.querySelectorAll('.search-input-multi').forEach(function(btn){
   
   btn.addEventListener('keypress', function(e){

      const tables = document.querySelectorAll('[teaching-table]') 

      if(e.key === 'Enter'){
         let filter = e.target.value.toLowerCase();

         tables.forEach(function(table){
         
            filterTableMulti(table, filter);

         })
   
         e.target.value = '';
      }

})})

document.querySelectorAll('[typefilter]').forEach(function(e){

   e.addEventListener('change', function(e){

      const target = e.target.getAttribute('typefilter')
      console.log(target);

      teachingFilter(e, target)
   })
})

//Bulk actions
document.querySelectorAll('[target]').forEach(function(checkbox){

   checkbox.addEventListener('change', function(){

      const target = document.getElementById(checkbox.getAttribute("target"))
      
      if(checkbox.checked == true){
  
         switch(checkbox.getAttribute('action')){

            case 'check-all':
               target.querySelectorAll("input[type='checkbox']").forEach(function(e){
                  e.checked = true;
               });
               checkbox.parentElement.parentElement.parentElement.querySelector('[action="clear-all"]').checked = false;
               break;
   
            case 'clear-all':
               target.querySelectorAll("input[type='checkbox']").forEach(function(e){
                  e.checked = false;
               });
               checkbox.parentElement.parentElement.parentElement.querySelector('[action="check-all"]').checked = false;
               break;
         }
            
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

//Sorting tables
document.querySelectorAll('.sort-btn').forEach(function(e){

   if(e.classList.contains('sort-btn-up')){

      e.addEventListener('click', function(){
         sortTable(e, 1)
      })
   } else{
      e.addEventListener('click', function(){
         sortTable(e, 0)
      })
   }

})

async function filterTableByCheckboxMulti(target, filter){

   let items = target.querySelectorAll('.table-secondary-first p')
   let attr = 'checkbox-filter';

   await items.forEach(function(e){
      e.parentElement.parentElement.setAttribute(attr, 0)    
   })

   await items.forEach(function(e){

      console.log(e.textContent.toLowerCase());
      if(e.textContent.toLowerCase().indexOf(filter) != -1){
         e.parentElement.parentElement.setAttribute(attr, 1)
      } 
   })

   removeFiltered(target)
}

async function filterTableByCheckbox(UIfilter, filter){

   let UItable = document.querySelector(UIfilter.getAttribute("filterTarget"));
   let items = UItable.querySelectorAll('.table-column p')
   let attr = 'checkbox-filter';

   await items.forEach(function(e){
      e.parentElement.parentElement.setAttribute(attr, 0)    
   })

   await items.forEach(function(e){

      if(e.textContent.toLowerCase().indexOf(filter) != -1){
         e.parentElement.parentElement.setAttribute(attr, 1)
      } 
   })

   removeFiltered(UItable)
}

async function filterTableMulti(target, filter){

   let items = target.querySelectorAll('.table-secondary-first p')
   let attr = 'text-filter'

   await items.forEach(function(e){
      e.parentElement.parentElement.setAttribute(attr, 1)        
   })

   await items.forEach(function(e){

      if(e.textContent.toLowerCase().indexOf(filter) != -1){
         e.parentElement.parentElement.removeAttribute(attr)

      } 

      
   })
   
   removeFilteredMulti(target)
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

      case 'select-two': 
      attr = 'select-two-filter';
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

function teachingFilter(e, target){

   if(e.target.checked == true){

      document.getElementById(target).style.display = 'block'
   } else{

      document.getElementById(target).style.display = 'none'
   }
}

function removeFilteredMulti(table){

   table.querySelectorAll('.table-secondary-row').forEach(function(e){
      e.style.display = 'grid'
   })
   
   table.querySelectorAll('[checkbox-filter]').forEach(function(e){

      const att = e.getAttribute('checkbox-filter');
      
      switch (att){

         case '1':
            e.style.display = 'grid'
            break;

         case '0':
            e.style.display = 'none'
            break;
      }
   })

   table.querySelectorAll('[text-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[select-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[select-two-filter]').forEach(function(e){
      e.style.display = "none"
   })

  
}

function removeFiltered(table){

   table.querySelectorAll('.custom-table-row').forEach(function(e){
      e.style.display = 'grid'
   })
   
   table.querySelectorAll('[checkbox-filter]').forEach(function(e){

      const att = e.getAttribute('checkbox-filter');
      
      switch (att){

         case '1':
            e.style.display = 'grid'
            break;

         case '0':
            e.style.display = 'none'
            break;
      }
   })

   table.querySelectorAll('[text-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[select-filter]').forEach(function(e){
      e.style.display = "none"
   })

   table.querySelectorAll('[select-two-filter]').forEach(function(e){
      e.style.display = "none"
   })

  
}

function sortTable(e, ascending){

   const table = e.parentElement.parentElement.parentElement.parentElement.querySelector('.table-body')
   const rows = table.querySelectorAll('.custom-table-row')
   const rowsArray = Array.from(rows);
   let order = 0;

   let child = e.parentElement.parentElement;

   while( (child = child.previousElementSibling) != null){
      order++;
   }

   let sortedList;

   if(ascending){

      sortedList = rowsArray.sort((a, b) => {
         
         if(a.querySelector(`.table-column:nth-child(${order+1}) p`).textContent > b.querySelector(`.table-column:nth-child(${order+1}) p`).textContent){
            return 1;
         } else{
            return -1;
         }
      
      });
   } else{
      sortedList = rowsArray.sort((a, b) => {
         
         if(a.querySelector(`.table-column:nth-child(${order+1}) p`).textContent > b.querySelector(`.table-column:nth-child(${order+1}) p`).textContent){
            return -1;
         } else{
            return 1;
         }
      
      });
   }

   table.innerHTML = '';

   sortedList.forEach(function(e){

      table.innerHTML += e.outerHTML;
   })

}

document.querySelector('.add-new-user-btn').addEventListener('click', function(){
   addUser()
})
