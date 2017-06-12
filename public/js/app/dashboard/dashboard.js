var dashboardController = function(DashboardService){
    'use strict';
    //var sidebarMenus =  $('#sidebar li');
    var allUrlContent = window.location.href.split('/');
    var currentPage = allUrlContent[allUrlContent.length -1];
    
    var selector = '#sidebar li' ;   
    // console.log(sidebarMenus);
    // sidebarMenus.each(function(index){
    //     var self = $(this);
    //     self.on('click',function(){
    //         var locationarray = window.location.pathname.split('/')
    //         console.log(locationarray[locationarray.length-1]);
    //         console.log(self);
    //     });
    // });
   // alert($.cookie("token"));
    // $(selector).on('click',function(){
    //     $(selector).removeClass('active');
    //     $(this).addClass('active');
    // });
    var token = $.cookie("token");    
}(DashboardService);