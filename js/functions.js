$(function(){

     var currentValue = 0;
     var isDrag = false;
     var preco_maximo = 70000;
     var preco_atual= 0;

    $('.pointer-barra').mousedown(function(){
         isDrag = true;
     })

     $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    })

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection();
            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;
            if(mouseX < 0)
                mouseX = 0;
            if(mouseX > elBase.width())    
                mouseX = elBase.width();

            $('.pointer-barra').css('left',(mouseX-13)+'px');
            currentValue = (mouseX / elBase.width()) * 100;
            $('.barra-preco-fill').css('width',currentValue+'%');  

            preco_atual = (currentValue/100) * preco_maximo;
            preco_atual = formatarPreco(preco_atual);
            $('.preco_pesquisa').html('R$'+preco_atual);

        }
    })
    function formatarPreco(preco_atual){
        preco_atual = preco_atual.toFixed(2)
        preco_arr = preco_atual.split('.');
        

        var novo_preco = formatarTotal(preco_arr);

        return novo_preco;
    }
        function formatarTotal(preco_arr){
           
            if(preco_arr[0] < 1000){
                    return preco_arr[0]+preco_arr[1]
                }else if(preco_arr[0] < 10000){
                    return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].lenght)+','+preco_arr[1];
                }else{
                    return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].lenght)+','+preco_arr[1];
                }
            }   

        function disableTextSelection(){
            $("body").css("user-select","none");
        }
        function enableTextSelection(){
            $("body").css("user-select","auto");
        }

        /*
         mini img wraper =  style="background-color:rgb(210,210,210);"
         foto destaque => background-image;

        */

        var imgShow = 3;
        var minIndex = imgShow - 1;
        var maxIndex = Math.ceil($('mini-img-wraper').lenght/3) - 1;
        var curIndex = 0;

            initSlider();
            navigateSlider();
            function initSlider(){
            var amt = $('.mini-img-wraper').length * 33.3;
            var elScroll = $('.nav-galeria-wraper');
            var elSingle = $('.mini-img-wraper');
            elScroll.css('width',amt+'%');
            elSingle.css('width',33.3*(100/amt)+'%');
        }

        function navigateSlider(){
            $('.arrow-right-nav').click(function(){
                if(curIndex < maxIndex){
                    curIndex++;
                    var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                    $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
                }else{
                    console.log('chegamos até o final');
                }
            })
        }
})