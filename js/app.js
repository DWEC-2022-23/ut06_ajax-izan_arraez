document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  const lis = document.createElement('li');

  //creates de cons
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  const xhr = new XMLHttpRequest();

  filterLabel.textContent = "Ocultar los que no hayan respondido";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';  
        } else {
          li.style.display = 'none';                        
        }
      }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }                                 
    }
  });
  
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);  
      element[property] = value; 
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element); 
      return element;
    } 

    const li = document.createElement('li');

      appendToLI('span', 'textContent', text);     
      appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
      appendToLI('button', 'textContent', 'edit');
      appendToLI('button', 'textContent', 'remove');
  
    return li;
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if(text != ""){
      input.value = '';
      const li = createLI(text);
      ul.appendChild(li);
    }
  });
    
  ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
    
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';  
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';        
        }
      };
      
      // select and run action in button's name
      nameActions[action]();
    }
  }); 

  const add = async (dato)=>{
    try {
      const añadir = await new Promise((resolve,reject)=>{
        xhr.open('GET',"http://localhost:3000/invitados");
        xhr.onload = ()=>{resolve(xhr.responseText)};
        xhr.onerror = ()=>{reject(xhr.statusText)};
        xhr.send(JSON.stringify(data));
      });
      const datos = JSON.parse(añadir);
      console.log(datos);
    } catch (error) {
      console.log(error);
    }
  }

  const update = async (id,dato)=>{
    try {
      const nuevo = await new Promise((resolve,reject)=>{
        xhr.open('GET',"http://localhost:3000/invitados");
        xhr.onload = ()=>{resolve(xhr.responseText)};
        xhr.onerror = ()=>{reject(xhr.statusText)};
        xhr.send(JSON.stringify(data));
      });
      const datos = JSON.parse(nuevo);
      console.log(datos);
    } catch (error) {
      alert(error)
    }
  }

const open = async ()=>{
  try {
    const abrir = await new Promise((resolve,reject)=>{
      xhr.open('GET',"http://localhost:3000/invitados");
      xhr.onload = ()=>{resolve(xhr.responseText)};
      xhr.onerror = ()=>{reject(xhr.statusText)};
      xhr.send();
    });
    const datos = JSON.parse(abrir);
    for(const lso of datos){
      const li = createLI(lso.nombre);
      ul.appendChild(li);
    }
  } catch (error) {
    alert(error)
  }
}
open();
});  
  
  
  
  
  
  
  
  
  