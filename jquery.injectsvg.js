/**
 * jQuery.injectSVG
 * A small utility for replacing fallback images with their SVG counterpart's code.
 */
(function($){
	$.fn.injectSVG = function(){
		return $(this).each(function(){
			var img = $(this);

			// By default, replace the extentsion with .svg
			var svgUrl = $(this).attr('src').replace(/\.\w+$/, '.svg');

			// However, if data-svg attribute is present, use that
			if($(this).data('svg')){
				svgUrl = $(this).data('svg');
			}

			$.ajax({
				url: svgUrl + '?callback=?', // Should fix any cross-domain issues
				dataType: 'html',
				success: function(svg){
					// Create the SVG object from the code
					svg = $(svg);

					// Set the width/height to match the image
					svg.width(img.width());
					svg.height(img.height());

					// Place after the image, and remove the original
					img.after(svg);
					img.remove();
				}
			});
		});
	}
})(jQuery);
