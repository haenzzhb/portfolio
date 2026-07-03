window.addEventListener("DOMContentLoaded",function(){
    let header=document.querySelector("#header");
    let menuList=document.querySelectorAll("#gnb li");        
    let sub=document.querySelectorAll("section");    
    let mGnb=document.querySelector(".m_gnb")
    let tab=document.querySelector(".tab")
    let dim=document.querySelector(".dim")
    let mGnbList=document.querySelectorAll(".m_gnb li")
    let topBtn=document.querySelector(".top_btn")
    
    let pageList=[];
    pageList[0]=document.querySelector("#main");
    let contact=document.querySelector("#contact");
    
    sub.forEach(function(item, i){
        pageList.push(item);     
    })
    pageList.push(contact); 

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

    // top btn
    topBtn.addEventListener("click",function(){
        // e.preventDefault();      
        gsap.to(window, {scrollTo : 0, duration:0.4})      
    })
    

    // cover timeline
    const coverTl=gsap.timeline({
        scrollTrigger : {
            trigger:"#main",
            start : "top 50%",
            toggleActions:"restart none none none"
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
            trigger: ".about",
            start: "top 50%",
            toggleActions:"restart none none none"
        }
    })
    aboutTl
    .from(".about .title",{y:50, opacity:0, duration:0.4})
    .from(".about .left_content",{y:50, opacity:0, duration:0.4})
    .from(".about .right",{y:50, opacity:0, duration:0.4},"<")

    //index timeline
    const indexTl=gsap.timeline({
        scrollTrigger : {
            trigger: ".index",
            start: "top 50%",
            end: "bottom 100%",
            toggleActions:"restart none none none"
        }
    })
    indexTl
    .from(".index .title",{y:50, opacity:0, duration:0.4})
    .from(".index .content li",{y:50, opacity:0, duration:0.4, stagger:0.2})
    
    // selecto overview Tl
    const stOverviewTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#selecto .overview",
            start: "top 50%",            
            end: "bottom 100%",          
            toggleActions:"restart none none none"
        }
    })
    if(window.innerWidth >= 930){     
        stOverviewTl
        .from("#selecto .overview img.desktop", {x:20, opacity:0, duration:0.4})
        .from("#selecto .overview img.mobile", {x:20, opacity:0, duration:0.4})
        .from("#selecto .overview .title", {x:-20, opacity:0, duration:0.4})    
        .from("#selecto .overview .desc", {x:-20, opacity:0, duration:0.4},"<")    
        .from("#selecto .overview .taskdesc", {x:-20, opacity:0, duration:0.4})   
    }
    else {
        stOverviewTl
        .from("#selecto .overview .title", {x:-20, opacity:0, duration:0.4})    
        .from("#selecto .overview .desc", {x:-20, opacity:0, duration:0.4},"<")  
        .from("#selecto .overview img.desktop", {x:20, opacity:0, duration:0.4})
        .from("#selecto .overview img.mobile", {x:-20, opacity:0, duration:0.4})         
        .from("#selecto .overview .taskdesc", {x:20, opacity:0, duration:0.4})   
    }
   
    // selecto color system Tl
    const stColorTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#selecto .design_system",
            start: "top 50%",            
            end: "bottom 100%",
            toggleActions:"restart none none none"           
        }
    })
    stColorTl
    .from("#selecto .color_system .title", {y:20, opacity:0, duration:0.4})
    .from("#selecto .color_system .content", {y:20, opacity:0, duration:0.4})

    // selecto typo system Tl
    const stTypoTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#selecto .typo_system",
            start: "top 50%",            
            end: "bottom 100%",
            toggleActions:"restart none none none"           
        }
    })
    stTypoTl
    .from("#selecto .typo_system .title", {y:20, opacity:0, duration:0.4})
    .from("#selecto .typo_system .content", {y:20, opacity:0, duration:0.4})

    // selecto Asis Tl
    const stAsisTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#selecto .asis",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    stAsisTl
    .from("#selecto .asis .title", {y:20, opacity:0, duration:0.4})
    .from("#selecto .asis .desc", {y:20, opacity:0, duration:0.4})
    .from("#selecto .asis .asis_img", {y:20, opacity:0, duration:0.4})

    // select Tobe Tl
    const stTobeTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#selecto .tobe",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    stTobeTl
    .from("#selecto .tobe .title", {y:20, opacity:0, duration:0.4})
    .from("#selecto .tobe .desc", {y:20, opacity:0, duration:0.4})
    .from("#selecto .tobe_desktop h4", {y:20, opacity:0, duration:0.4})
    .from("#selecto .tobe_desktop .img_area1", {y:20, opacity:0, duration:0.4})    
    gsap.from("#selecto .tobe_desktop .img_area2 img", {y:20, opacity:0, duration:0.4, stagger:0.15,
        scrollTrigger:{
            trigger : "#selecto .img_area2",
            start:"top 50%",            
        }
    })
    gsap.from("#selecto .tobe_mobile h4", {y:20, opacity:0, duration:0.4, 
        scrollTrigger:{
            trigger : "#selecto .tobe_mobile",
            start:"top 50%",            
        }
    })
    gsap.from("#selecto .tobe_mobile img", {y:20, opacity:0, duration:0.4, stagger:0.15,
        scrollTrigger:{
            trigger : "#selecto .tobe_mobile",
            start:"top 50%",            
        }
    })

    // snpmall overview Tl
    const snpOverviewTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#snpmall .overview",
            start: "top 50%",            
            end: "bottom 100%",          
            toggleActions:"restart none none none"
        }
    })
    if(window.innerWidth >= 930){     
        snpOverviewTl
        .from("#snpmall .overview img.desktop", {x:20, opacity:0, duration:0.4})
        .from("#snpmall .overview img.mobile", {x:20, opacity:0, duration:0.4})
        .from("#snpmall .overview .title", {x:-20, opacity:0, duration:0.4})    
        .from("#snpmall .overview .desc", {x:-20, opacity:0, duration:0.4},"<")    
        .from("#snpmall .overview .taskdesc", {x:-20, opacity:0, duration:0.4})   
    }
    else {
        snpOverviewTl
        .from("#snpmall .overview .title", {x:-20, opacity:0, duration:0.4})    
        .from("#snpmall .overview .desc", {x:-20, opacity:0, duration:0.4},"<")  
        .from("#snpmall .overview img.desktop", {x:20, opacity:0, duration:0.4})
        .from("#snpmall .overview img.mobile", {x:-20, opacity:0, duration:0.4})         
        .from("#snpmall .overview .taskdesc", {x:20, opacity:0, duration:0.4})   
    }
   
    // snpmall color system Tl
    const snpColorTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#snpmall .design_system",
            start: "top 50%",            
            end: "bottom 100%",
            toggleActions:"restart none none none"           
        }
    })
    snpColorTl
    .from("#snpmall .color_system .title", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .color_system .content", {y:20, opacity:0, duration:0.4})

    // snpmall typo system Tl
    const snpTypoTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#snpmall .typo_system",
            start: "top 50%",            
            end: "bottom 100%",
            toggleActions:"restart none none none"           
        }
    })
    snpTypoTl
    .from("#snpmall .typo_system .title", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .typo_system .content", {y:20, opacity:0, duration:0.4})

    // snpmall Asis Tl
    const snpAsisTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#snpmall .asis",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    snpAsisTl
    .from("#snpmall .asis .title", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .asis .desc", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .asis .asis_img", {y:20, opacity:0, duration:0.4})

    // snpmall Tobe Tl
    const snpTobeTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#snpmall .tobe",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    snpTobeTl
    .from("#snpmall .tobe .title", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .tobe .desc", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .tobe_desktop h4", {y:20, opacity:0, duration:0.4})
    .from("#snpmall .tobe_desktop .img_area1", {y:20, opacity:0, duration:0.4})    
        gsap.from("#snpmall .tobe_desktop .img_area2 img", {y:20, opacity:0, duration:0.4, stagger:0.15,
            scrollTrigger:{
                trigger : "#snpmall .img_area2",
                start:"top 50%",            
            }
        })
        gsap.from("#snpmall .tobe_mobile h4", {y:20, opacity:0, duration:0.4, 
            scrollTrigger:{
                trigger : "#snpmall .tobe_mobile",
                start:"top 50%",            
            }
        })
        gsap.from("#snpmall .tobe_mobile img", {y:20, opacity:0, duration:0.4, stagger:0.15,
            scrollTrigger:{
                trigger : "#snpmall .tobe_mobile",
                start:"top 50%",            
            }
        })

    // detail page Tl
    const dpageTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#work",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })    
    dpageTl
    .from("#work h2", {y:20, opacity:0, duration:0.4})
    .from("#detail_page h3", {y:20, opacity:0, duration:0.4})    
    .from("#detail_page .content li", {y:20, opacity:0, duration:0.4, stagger:0.15})    
    
    // event page Tl
    const epageTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#work #event_page",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    epageTl    
    .from("#event_page h3", {y:20, opacity:0, duration:0.4})
    .from("#event_page .content li", {y:20, opacity:0, duration:0.4, stagger:0.15})

    // package Tl
    const packageTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#work #package",
            start: "top 50%",                        
            toggleActions:"restart none none none"          
        }
    })
    packageTl    
    .from("#package h3", {y:20, opacity:0, duration:0.4})
    .from("#package .content li", {y:20, opacity:0, duration:0.4, stagger:0.15})
    

    // 갤러리 썸네일 상세 보기
    const thumbs = document.querySelectorAll(".thumb");
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal_content img");
    const modalTitle = document.querySelector(".modal_title");
    const modalRole = document.querySelector(".modal_role");
    const modalTool = document.querySelector(".modal_tool");
    const modalSize = document.querySelector(".modal_size");
    const modalDesc = document.querySelector(".modal_desc");
    const closeBtn = document.querySelector(".close");

    thumbs.forEach(item=>{
        item.addEventListener("click",()=>{
            modal.classList.add("active");
            modalImg.src=item.querySelector("img").dataset.full;            
            modalTitle.textContent = item.dataset.title;
            modalRole.textContent = item.dataset.role;
            modalTool.textContent = item.dataset.tool;
            modalSize.textContent = item.dataset.size;
            modalDesc.textContent = item.dataset.desc;

            document.body.style.overflow="hidden";
        });
    });
    function closeModal(){
        modal.classList.remove("active");
        document.body.style.overflow="";
    }
    closeBtn.addEventListener("click",closeModal);

    modal.addEventListener("click",(e)=>{
        if(e.target===modal){
            closeModal();
        }
    });
    window.addEventListener("keydown",(e)=>{
        if(e.key==="Escape"){
            closeModal();
        }
    });

    // contact Tl
    const contactTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#contact",
            start: "top 50%",                        
            toggleActions:"restart none none none"           
        }
    })
    contactTl
    .from("#contact .title", {y:20, opacity:0, duration:0.4})
    .from("#contact .closing", {y:20, opacity:0, duration:0.4})
    .from("#contact .info", {y:20, opacity:0, duration:0.4})
});