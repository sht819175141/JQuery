$.fn.extend({
  Drag: function() {
    $(this).attr("isDrag", 1);
    $(this).mousedown(function(e) {
      if ($(this).attr("isDrag") == 0) return;
      $(this).attr("drag", 1);
      $(this).css("position", "absolute");
      $(this).css("cursor", "default");
      var currentTarget = $(this);
      var currentDisX = e.pageX - $(this).offset().left;
      var currentDisY = e.pageY - $(this).offset().top;
      $(document).mousemove(function(event) {
        if ($(currentTarget).attr("drag") == 0 || $(currentTarget).attr("mode") == "re") return;
        var currentX = event.clientX;
        var currentY = event.clientY;
        var cursorX = event.pageX - currentDisX; //+$(this).offset().left;
        var cursorY = event.pageY - currentDisY; //-$(this).offset().top;
        $(currentTarget).css("top", cursorY + "px").css("left", cursorX + "px");
      });
      $(document).mouseup(function() {
        $(currentTarget).attr("drag", 0);
      });
    });
  },
  DisDrag: function() {
    $(this).attr("isDrag", 0);
    $(this).attr("drag", 0);
  },
  Resize: function() {
    var currentDisTance = 5;
    var resizeMode = 0;
    var isResize = false;
    var isStartResize = false;
    $(this).mousemove(function(e) {
      var currentDisX = e.pageX - $(this).offset().left;
      var currentDisY = e.pageY - $(this).offset().top;
      if ($(this).width() - currentDisX < currentDisTance && ($(this).height() - currentDisY) < currentDisTance) {
        $(this).css("cursor", "nw-resize");

      } else if ($(this).width() - currentDisX < currentDisTance) {
        $(this).css("cursor", "e-resize");

      } else if ($(this).height() - currentDisY < currentDisTance) {
        $(this).css("cursor", "n-resize");

      } else {
        if (isStartResize == true) return;
        $(this).css("cursor", "default");
      }
    });
    $(this).mousedown(function(e) {
      isResize = true;
      var currentDisX = e.pageX - $(this).offset().left;
      var currentDisY = e.pageY - $(this).offset().top;
      if ($(this).width() - currentDisX < currentDisTance && ($(this).height() - currentDisY) < currentDisTance) {
        $(this).css("cursor", "nw-resize");
        $(this).attr("mode", "re");
        resizeMode = 0;
      } else if ($(this).width() - currentDisX < currentDisTance) {
        $(this).css("cursor", "e-resize");
        $(this).attr("mode", "re");
        resizeMode = 1;
      } else if ($(this).height() - currentDisY < currentDisTance) {
        $(this).css("cursor", "n-resize");
        $(this).attr("mode", "re");
        resizeMode = 2;
      } else {
        if (isStartResize == true) return;
        $(this).css("cursor", "default");
        $(this).attr("mode", "me");
      }
      var currentTarget = $(this);

      var offsetWidth = $(this).width() - $(currentTarget).offset().left;
      var offsetHeight = $(this).height() - $(currentTarget).offset().top;
      //$(this).css("width",currentWidth+currentDisX);
      $(document).mousemove(function(event) {
        if ($(currentTarget).attr("mode") == "me" || isResize == false) return;
        isStartResize = true;
        var currentX = event.clientX;
        var currentY = event.clientY;
        var cursorX = event.pageX - currentDisX; //+$(this).offset().left;
        var cursorY = event.pageY - currentDisY; //-$(this).offset().top;
        if (resizeMode == 0) $(currentTarget).css("height", cursorY + offsetHeight + "px").css("width", cursorX + offsetWidth + "px");
        else if (resizeMode == 1) $(currentTarget).css("width", cursorX + offsetWidth + "px");
        else $(currentTarget).css("height", cursorY + offsetHeight + "px");
      });
    });
    $(document).mouseup(function() {
      isResize = false;
      isStartResize = false;
      $(document).off("mousemove");
      $(document).unbind('mousemove');
    });
  }
});
