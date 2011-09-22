(function($){
    $.Bootstrappopunder = function(el, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("Bootstrappopunder", base);
        
        base.init = function(){
            base.options = $.extend({},$.Bootstrappopunder.defaultOptions, options);
            base.$popunder = null;

            base.$el.hover(function(event) {
                base.toggle_popunder();
                event.preventDefault();
            	},
            	function(event) {
                base.hide_popunder();
                });
        };
        
        base.toggle_popunder = function(){
            if (base.$popunder != null) {
                base.$popunder.fadeOut(base.options.fade_out_speed, function() {
                    base.$popunder.remove();
                    base.$popunder = null;
                });
                $(document).unbind("resize."+base.$el.attr('href'));
                return;
            }
            
            var $popunder = $(base.options.popunder_html),
                $a = base.$el,
                title = $a.attr('title'),
                content = $($a.attr('href')).html(),
                a_offset = $a.offset(),
                a_o_width = $a.outerWidth(),
                d_width = $(document).width();
            
            $(".inner .title", $popunder).html(title);
            $(".inner .content", $popunder).html(content);
            $('body').append($popunder);
            var p_width = $popunder.width(),
                p_height = $popunder.height();
            $popunder.css({display:'none'});

            $popunder.removeClass('right');
            $popunder.removeClass('left');
			$popunder.addClass('below');
			
            var top = a_offset.top + 17;
            left = a_offset.left - (p_width / 2) + 8;

            $popunder.css({left:left, top:top});
            $popunder.fadeIn(base.options.fade_in_speed);
            
            base.$popunder = $popunder;

            $(window).bind("resize."+$a.attr('href'), {$popunder:$popunder, $a:$a}, function(event){
                var $popunder = event.data.$popunder,
                    $a = event.data.$a,
                    a_offset = $a.offset(),
                    a_o_width = $a.outerWidth(),
                    d_width = $(document).width(),
                    p_width = $popunder.width(),
                    p_height = $popunder.height();

                $popunder.css({left:left, top:top});                
            });
        };
        
        base.hide_popunder = function(){
            if (base.$popunder != null) {
                base.$popunder.fadeOut(base.options.fade_out_speed, function() {
                    base.$popunder.remove();
                    base.$popunder = null;
                });
                $(document).unbind("resize."+base.$el.attr('href'));
                return;
            };
        };
            
        base.init();
    };
    
    $.Bootstrappopunder.defaultOptions = {
        fade_out_speed: "fast",
        fade_in_speed: "fast",
        popunder_html: " \
        <div class=\"popunder left\" style=\"position:absolute;top:-10000;left:-10000;\"> \
          <div class=\"arrow\"></div> \
          <div class=\"inner\"> \
            <h3 class=\"title\"></h3> \
            <div class=\"content\"> \
            </div> \
          </div> \
        </div>"
    };
    
    $.fn.bootstrappopunder = function(options){
        return this.each(function(){
            (new $.Bootstrappopunder(this, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the Bootstrappopunder if it has been attached to the object.
    $.fn.getBootstrappopunder = function(){
        return this.data("Bootstrappopunder").$popunder;
    };
    
})(jQuery);
