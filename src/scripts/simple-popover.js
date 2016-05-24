/**
 * Plugin to behave like popover.
 * 
 * @author: prasun-pal <prsn.pal@gmail.com>
 * @date: 25-08-2014
 */
;(function($){
    $.fn.simple$popup = function(options, callback){
        //debugger;
      var _calculatePosition = function(target, subject){
        var position = {};
        position.top = target.offset().top + target.height();
        position.left = (parseInt(target.offset().left,10) + parseInt(subject.width,10))  > $(options.container).width() ? target.offset().left + target.width() - parseInt(subject.width,10) - 2 : target.offset().left;
        return position;
      };
      
        var defaults =  {
                width : "200",
                height : "auto",
                color : "black",
                background : "white",
                opacity : 1,
                onClick : _click,
                onHover : _hover,
                container : document
        };
        var self = $(this);
        options = $.extend(defaults, options);
        var listMarkup = '<div class="popup-section">';
        $.each(options.values, function(index, value){
          listMarkup += '<div class="popup-element"  id="option' + index + '" ind="' + index + '">';
          if(value.markup){
            listMarkup += value.markup;
          } else if ( value.html ) {
            // value.html.path holds the locatio of the html file
            listMarkup += '<div id=popup-html-element></div>';
            $.ajax({
              url: value.html.path,
              success: function(result){
                console.log(result);
                $('#popup-html-element').html(result);
              },
              error: function(err) {
                $('#popup-html-element').html('Could not get ');
              }
            });
          }else {
            listMarkup+= '<div class="popup-element-icon"><i class="' + value.faClass + '" ';
                      if(value.faClassColor)
                        listMarkup += 'style="color:' + value.faClassColor + '"';
            listMarkup +='></i></div>'
                       + '<div class="popup-element-item">' + value.text + '</div>';
          }
          listMarkup += '</div>';
        });
        listMarkup += '</div>';
        var position = _calculatePosition(self, options);
        console.log(listMarkup);
        var css = 'position:absolute; ' 
            + 'top:' + position.top + 'px; ' 
            + 'left:' + position.left + 'px; ' 
            + 'min-width: ' + options.width + ';' 
            + 'z-index:100000;'
            + 'background: transparent;'
            + 'min-height:200px;';
        console.log(css);
        var markup = '<div style="' + css + '">' 
            + '<div class="popup-wrapper" style="width:' + options.width + '">' + listMarkup + '</div>'
            + '</div></div>';
        var $markup = $(markup);
        
        $markup.find('.popup-element').click(function () {
            _click(self, $(this).attr('ind'),$(this).find('.popup-element-item').html());
            _hide();
        });
        
        var _click = function(self, index, value){
            if(options.onClick){
                options.onClick.call(self, index,value);
            }
        };
        var _hover = function(){
            if(options.onHover){
                options.onHover.call(self, index,value);
            }
        };
        var _hide = function(){
            $markup.remove();
        };
        $(document).bind('click', function(){
            _hide();
            if ( callback ) {
                callback.call(self,'CLOSED');
            }
        });
        
        $('body').append($markup);
        
    };
})(jQuery);