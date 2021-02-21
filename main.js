window.onload = () =>{
    setTimeout(() => {
        let page_load = document.querySelector('.loading');
        page_load.remove();
       
    },3500);
    const meals = [{
        name: "01",
        url:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg"
    },
    {
        name: "02",
        url:"https://images.pexels.com/photos/208453/pexels-photo-208453.jpeg?cs=srgb&dl=pexels-pixabay-208453.jpg&fm=jpg",
        ad:"bon appetit"
    },
    {
        name:"03",
        url:"https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?cs=srgb&dl=pexels-buenosia-carol-406152.jpg&fm=jpg" ,
        ad:"don't sweat we have you covered"  
    },
    {
        name:"04",
        url:"https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?cs=srgb&dl=pexels-mali-maeder-65175.jpg&fm=jpg",
        ad:"Time to cook up a storm"
    }];
    let category = Array();
    /*var menu_bar = document.querySelector('.menu');
    let swipeUp = new Hammer(document.body);
    let swipeDown = new Hammer(document.body);
    //on scroll up 
    swipeUp.get('swipe').set({direction:Hammer.DIRECTION_ALL});
    swipeUp.on('swipeup',()=>{
        menu_bar.style.height=0;
        menu_bar.style.opacity=0;
    })
    //on scroll down show menu
    swipeDown.get('swipe').set({direction:Hammer.DIRECTION_ALL});
    swipeDown.on('swipedown',()=>{
        menu_bar.style.height="4rem";
        menu_bar.style.opacity=1;
    })*/
    const cate = (()=>{
        const display = document.querySelector('.criteria');
        //get the api
        fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            .then(res =>res.json())
            .then(data =>{
                for(let i=0;i<data.categories.length;i++){
                    

                    display.innerHTML +=`
                    
                    <div class="category">
                        <img src="${data.categories[i].strCategoryThumb}">
                       <h1> ${data.categories[i].strCategory}</h1>
                    </div>`
                }
                
            })
    })();
   
    const recepies =(_=>{
        const recep = document.querySelector('.recep-con');
        let mealId = Array();
        let id =52774;
        for (let i=0;i<10;i++){
                id++;
            console.log(id);
        
       

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res=> res.json())
        .then(data =>{
            const match =data.meals[0].strYoutube.match(/v=([0-9a-z_-]{1,20})/i);
            let strUrl = match?match['1']:false;
           // meals.push(data.meals[0].strMealThumb);
            
            recep.innerHTML +=`<span>Category: ${data.meals[0].strCategory}</span>
                             <div class="img-con">
                                <img src="${data.meals[0].strMealThumb}">
                                <i id="ing" class="bx bx-info-circle bx-xs"></i>
                                <i class="bx bx-play bx-md"></i>
                              </div>
                         <h3> ${data.meals[0].strMeal}</h3>
                         <p class="instructions">${data.meals[0].strInstructions}</p>`

                         let play_vid = document.querySelectorAll('.bx-play')
                          play_vid.forEach(btn => {
                              btn.addEventListener('click',()=>{
                                  img_con.innerHTML+=`<iframe src="https://www.youtube.com/embed/${strUrl}"  frameBorder=0 allowFullScreen ng-show="showvideo">`
                              })
                          });


                         let info_con = document.createElement('div');
                         var img_con = document.querySelector('.img-con')
                         info_con.className="info-con";
                         info_con.innerHTML+=`${data.meals[0].strIngredient1}`
                         img_con.appendChild(info_con);
                     
                    
    let info = document.querySelectorAll('#ing');
    info.forEach(el => {
        el.addEventListener('click',()=>{
            info_con.style.display='block';
            console.log(data.meals[0].strIngredient1)
            setTimeout(()=>{
                info_con.style.display="none";
            },5000)
            })
        });
       })
    }
        
    })();
    const slidDisplay = (()=>{
        let slide = document.querySelector('.head');
        let slideIndex =1;

        setInterval(()=>{
            if(slideIndex >meals.length){
                slideIndex =1;
            }
            if(slideIndex <1){
                slideIndex = meals.length;
            }
            slide.innerHTML=`<img src="${meals[slideIndex-1].url}">
                               `
            slideIndex++;
            console.log();
        },6000);
    })();
    const handleSearch = (()=>{
        let srcBtn = document.querySelector('.bx-search-alt-2');
        let input = document.querySelector('input');

        const getFood = (()=>{
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(res=>res.json())
            .then(data =>{
                srcBtn.addEventListener('click',()=>{
                    if(data.meals[0].strMeal.toUpperCase().indexOf(input.value.toUpperCase())>-1 ){
                        console.log(data.meals[0].strMeal);
                    }
                })
                
            })  
        })

        
    })();
}
