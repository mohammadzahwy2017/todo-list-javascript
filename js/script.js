        let LIST
        let id
        const list = document.getElementById("list")
        const input = document.getElementById('input')
        const dateElement = document.getElementById('date')
        const clear = document.querySelector('.clear')
        
        const UNCHECK = 'fa-circle-thin' 
        const CHECK = 'fa-check-circle'
        const LINE_THROUGH = 'lineThrough'
        let today = new Date()
        let options = {weekday : 'long', month : 'short', day : 'numeric'}
        dateElement.innerHTML = today.toLocaleDateString('en-US',options)

        restoreFromLocalStorage()

        function loadList(array){
            array.forEach(function(item){
                addToDo(item.name,item.id,item.done,item.trash)
            })
        }
        function addToDo(todo,id,done,trash){

            if(trash){
                return
            }
            const DONE = done ? CHECK : UNCHECK
            const LINE = done ? LINE_THROUGH : ""

            const text = '<li class="item">'+
                    '<i class="fa '+DONE+' co" job="complete" id="'+id+'" aria-hidden="true"></i>'+
                    '<p class="text '+LINE+'">'+todo+'</p>'+
                    '<i class="fa fa-trash de" job="delete" id="'+id+'" aria-hidden="true"></i>'+
                '</li>'
            const position = "beforeEnd"
            list.insertAdjacentHTML(position,text)
        }

        function completeToDo(element){
            element.classList.toggle(CHECK)
            element.classList.toggle(UNCHECK)
            element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
            LIST[element.id].done = LIST[element.id].done ? false : true;
        }

        function removeToDo(element){
            element.parentNode.parentNode.removeChild(element.parentNode)
            LIST[element.id].trash = true
            
        }

        function saveToLocalStorage(){
            localStorage.setItem('TODO',JSON.stringify(LIST))
        }

        function restoreFromLocalStorage(){
            let data = localStorage.getItem('TODO')
            if(data){
                LIST = JSON.parse(data)
                loadToDo(LIST)
                id = LIST.length
            }else{
                LIST = [];
                id = 0;
            }
        }

        function loadToDo(array){
            array.forEach(function(item){
                addToDo(item.name,item.id,item.done,item.trash)
            })
        }

        clear.addEventListener('click', function(event){
            localStorage.clear()
            location.reload()
        })

        document.addEventListener('keyup',function(event){
            if(event.keyCode == 13){
                const ToDo = input.value;
                if(ToDo){
                    addToDo(ToDo,id,false,false)
                    LIST.push(
                        {
                            name : ToDo,
                            id : id,
                            done : false,
                            trash : false
                        }
                    )
                    localStorage.setItem('TODO',JSON.stringify(LIST))

                    id++
                    input.value= ""
                }
                else{
                    alert("Enter Something")
                }
            }
        })


        list.addEventListener('click', function(event){
            let element = event.target
            const elementJOB = event.target.attributes.job.value
            if(elementJOB == "complete"){
                completeToDo(element)
            }else if(elementJOB == "delete"){
                removeToDo(element)
            }
            localStorage.setItem('TODO',JSON.stringify(LIST))
        })

        clear.addEventListener('click', function(event){
            localStorage.clear()
        })