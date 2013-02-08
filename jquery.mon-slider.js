(function($)
{
	$.fn.mon_slider = function(options)
	{
		var settings = $.extend({},
		{
			slide_interval: 5000,
			slide_duration: 500,
			slide_easing: 'swing',
			active_class: 'active'
		}, options);
		
		return this.each(function()
		{
			var slider = $(this);
			var slider_nav = slider.find('.slider-nav');
			var slider_list = slider.find('.slider-list');
			var slider_list_lis = slider_list.children('li')
			var slider_nav_lis = slider_nav.children('li');
			var slider_prevs = slider.find('.slider-prev');
			var slider_nexts = slider.find('.slider-next');
			var current_index = 0;
			var slider_interval_id;

			function ScrollToSlide(index)
			{
				// Circular slider
				current_index = index % slider_list_lis.length;

				// Compute the width of all the slides until the selected one
				var offset = 0;
				for (var i = 0; i < current_index; i++)
				{
					offset += slider_list_lis[i].offsetWidth;
				}
				
				// Offset the container to create a slide animation
				slider_list.animate({'margin-left': (-offset).toString() + 'px'}, settings.slide_duration, settings.slide_easing);

				// Update the navigation list
				slider_nav_lis.removeClass(settings.active_class);
				slider_nav_lis.eq(current_index).addClass(settings.active_class);
			}

			function ScrollToPrevSlide()
			{
				ScrollToSlide(current_index - 1);
			}

			function ScrollToNextSlide()
			{
				ScrollToSlide(current_index + 1);
			}

			// Setup navigation list
			// Clicking on one item in the list will show the corresponding slide
			slider_nav_lis.each(function()
			{
				var self = $(this);
				self.click(function()
				{
					ScrollToSlide(self.index());

					if (settings.slide_interval > 0)
					{
						clearInterval(slider_interval_id);
						slider_interval_id = setInterval(function(){ ScrollToNextSlide(); }, settings.slide_interval);
					}					
				});
			});

			// Setup previous and next buttons
			slider_prevs.click(ScrollToPrevSlide);
			slider_nexts.click(ScrollToNextSlide);

			// At startup, go to first slide
			ScrollToSlide(current_index);

			// If user wants, slide automatically every x milliseconds
			if (settings.slide_interval > 0)
			{
				slider_interval_id = setInterval(function(){ ScrollToNextSlide(); }, settings.slide_interval);
			}
		});
	};
})(jQuery);
