window.addEventListener("DOMContentLoaded",function(){
    let header=document.querySelector("#header");
    let menuList=document.querySelectorAll("#gnb li");        
    let sub=document.querySelectorAll("section");
    let mMenu=document.querySelector(".mobilemenu")
    let mGnb=document.querySelector(".m_gnb")
    let tab=document.querySelector(".tab")
    let dim=document.querySelector(".dim")
    let mGnbList=document.querySelectorAll(".m_gnb li")
    // console.log(sectionPage);
    let pageList=[];
    pageList[0]=document.querySelector("#main");

    sub.forEach(function(item, i){
        pageList.push(item);
    })
    // console.log(pageList)
    let gnbList=[];
    gnbList[0]=document.querySelector("#header .logo");
    menuList.forEach(function(item, i){
        gnbList.push(item);
    })
    // console.log(gnbList);
    pageList.forEach(function(item, i){
        const tl=gsap.timeline({
            scrollTrigger : {
                trigger : item,
                start : "top 10%",
                // end : "bottom 100%", 
                // markers : true,               
                onEnter : function(){
                    pageInteraction(i);
                },
                onEnterBack : function(){
                    pageInteraction(i);
                }                
            }
        });
    });
    function pageInteraction(n){
        if(n!=0){
            header.classList.add("fixed");            
        }
        else{
            header.classList.remove("fixed");            
        }       
        gnbList.forEach(function(item,i){
            if (i==n){
                gnbList[i].classList.add("active");
            }
            else{
                gnbList[i].classList.remove("active");
            }
        })        
    }   
    gnbList.forEach(function(item,i){
        item.addEventListener("click",function(e){
            e.preventDefault();
            gsap.to(window, {scrollTo:pageList[i].offsetTop, duration:0.4})
        })
    });
    
	let menuClose=false;
	let menuTarget=0;

	tab.addEventListener("click", function(e){
		e.preventDefault();

		document.body.classList.toggle("fixed");
		mGnb.classList.toggle("active");        
		tab.classList.toggle("active");
		dim.classList.toggle("active");
	});

	dim.addEventListener("click", function(){
		document.body.classList.remove("fixed");
		mGnb.classList.remove("active");
		tab.classList.remove("active");
		dim.classList.remove("active");
	});

	mGnbList.forEach(function(item, i){
		item.addEventListener("click", function(e){
			e.preventDefault();

			menuClose=true;
			menuTarget=pageList[i].offsetTop;
			document.body.classList.remove("fixed");
			mGnb.classList.remove("active");
			tab.classList.remove("active");
			dim.classList.remove("active");
		});
	});

	mGnb.addEventListener("transitionend", function(){
		if(menuClose){
			menuClose=false;
			gsap.to(window, { scrollTo: menuTarget, duation: 0.5 });
		}
	});

    // cover timeline
    const coverTl=gsap.timeline({
        scrollTrigger : {
            trigger:"#main",
            start : "top 50%",
            toggleActions:"restart none restart none"
        }
    })
    function coverFloat(){
        gsap.to(".cover_title h1 span:first-child",{
            y:5, duration:0.5, repeat:-1, yoyo:true, ease:"sine.inOut"
        });
        gsap.to(".cover_title h1 span:last-child",{
            y:-5, duration:0.5, repeat:-1, yoyo:true, ease:"sine.inOut"
        });
    };
    coverTl
    .from(".cover_title h1 span:first-child",{y:-50, opacity:0, duration:0.4})
    .from(".cover_title h1 span:last-child",{y:50, opacity:0, duration:0.4},"<")    
    .from(".cover .s_title",{y:-50, opacity:0, duration:0.6},"<")
    .from(".cover .name",{y:50, opacity:0, duration:0.6},"<")
    .call(coverFloat)

    //about timeline
    const aboutTl=gsap.timeline({
        scrollTrigger : {
            trigger:".about",
            start : "top 50%",
            toggleActions:"restart none restart none"
        }
    })
    aboutTl
    .from(".about .title",{y:50, opacity:0, duration:0.4})
    .from(".about .left_content",{y:50, opacity:0, duration:0.4})
    .from(".about .right",{y:50, opacity:0, duration:0.4},"<")

    //index timeline
    const indexTl=gsap.timeline({
        scrollTrigger : {
            trigger:".index",
            start : "top 50%"
        }
    })
    indexTl
    .from(".index .title",{y:50, opacity:0, duration:0.4})
    .from(".index .content li:nth-child(1)",{y:50, opacity:0, duration:0.4})
    .from(".index .content li:nth-child(2)",{y:50, opacity:0, duration:0.4})
    .from(".index .content li:nth-child(3)",{y:50, opacity:0, duration:0.4})
    

});