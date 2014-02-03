/**
 * Jquery XofoPagination
 * @author Rodolfo Solórzano
 * @version 0.1
 */
(function($) {
	$.extend({
		fnsXofoPagination : {
			params : {
				currentPage : 1
			},
			

			countPages : function() {
				var items = this.params.items.size();
				var itemsPerPage = this.params.itemsPerPage;
				var pages = Math.ceil(items / itemsPerPage);
				return pages;
			},
			makePages : function() {
				var parent = this.params.parent;
				var page = 1;
				parent.empty();
				parent.append($('<div class="paginationPages paginationPage1">'));
				var count = 0;
				for(var i = 1; i <= this.params.items.size(); i++) {
					var index = i - 1;
					if(count == this.params.itemsPerPage) {
						page++;
						parent.append($('<div class="paginationPages paginationPage' + page + '">'));
						parent.find('div.paginationPage'+page).append(this.params.items[index]);
						count = 0;
					} else {
						parent.find('div.paginationPage'+page).append(this.params.items[index]);
					}
					count++;
				}
			},
			makePaginator : function() {
				var contentPaginator = '<div class="paginationPaginator">';
				if(this.countPages() > 5) {
					var pages = 5;
				} else {
					var pages = this.countPages();
				}
				contentPaginator += '<div><a href="paginationPage1" class="paginationGoToFirstPage">' + this.params.firstLabel + '</a><a href="paginationPrev" class="paginationPrev">' + this.params.prevLabel + '</a></div>';
				contentPaginator += '<ul>';
				for(var i = 1; i <= pages; i++) {
					contentPaginator += '<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>';
				}
				contentPaginator += '</ul>';
				contentPaginator += '<div><a href="paginationNext" class="paginationNext">' + this.params.nextLabel + '</a><a href="paginationPage' + this.countPages() + '" class="paginationGoToLastPage">' + this.params.lastLabel + '</a></div>';
				contentPaginator += '</div>';
				return contentPaginator;
			},
			goNext : function() {
				var countPages = this.countPages();
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				parent.find('a.paginationNext').live('click', function(e) {
					e.preventDefault();
					params.currentPage++;
					if(params.currentPage > countPages){
						params.currentPage = 1;
					}
					pages.hide();
					parent.find('div.paginationPage'+params.currentPage).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					var pageId = params.currentPage;
					if(countPages > 5) {
						parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 4) {
							pageId = countPages - 4;
						}
						for(var i = pageId; i <= pageId + 4; i++) {
							parent.find('div.paginationPaginator ul').append('<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>');
						}
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goPrev : function() {
				var countPages = this.countPages();
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				parent.find('a.paginationPrev').live('click', function(e) {
					e.preventDefault();
					params.currentPage--;
					if(params.currentPage < 1){
						params.currentPage = countPages;
					}
					pages.hide();
					parent.find('div.paginationPage'+params.currentPage).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					var pageId = params.currentPage;
					if(countPages > 5) {
						parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 4) {
							pageId = countPages - 4;
						}
						for(var i = pageId; i <= pageId + 4; i++) {
							parent.find('div.paginationPaginator ul').append('<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>');
						}
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var countPages = this.countPages();
				parent.find('div.paginationPaginator li > a').live('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					var changeLi = $(this).parent();

					var pageId = parseInt(page.replace('paginationPage', ''));
					params.currentPage = pageId;
					if(countPages > 5) {
						parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 4) {
							pageId = countPages - 4;
						}

						for(var i = pageId; i <= pageId + 4; i++) {
							parent.find('div.paginationPaginator ul').append('<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>');
						}

					}

					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToFirstPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var numpages = this.countPages();
				parent.find('a.paginationGoToFirstPage').live('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:first').addClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:eq('+numpages+')').addClass('paginationCurrentPaginator');
					params.currentPage = 1;
					if(numpages > 5) {
						parent.find('div.paginationPaginator ul').empty();
						for(var i = 1; i <= 5; i++) {
							parent.find('div.paginationPaginator ul').append('<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>');
						}
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToLastPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var numpages =         this.countPages() - 1;
				parent.find('a.paginationGoToLastPage').live('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:last').addClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:eq('+numpages+')').addClass('paginationCurrentPaginator');
					params.currentPage = numpages + 1;
					if(numpages + 1 > 5) {
						parent.find('div.paginationPaginator ul').empty();
						for(var i = numpages - 3; i <= numpages + 1; i++) {
							parent.find('div.paginationPaginator ul').append('<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '">' + i + '</a></li>');
						}
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			makeFullContent : function() {
				var parent = this.params.parent;
				this.makePages();
				var numpages = this.countPages();
				parent.prepend(this.makePaginator());
				parent.append(this.makePaginator());
				parent.find('div.paginationPage1').css('display', 'block');
				parent.find('div.paginationPaginator ul li:first').addClass('paginationCurrentPaginator');
				parent.find('div.paginationPaginator ul li:eq('+numpages+')').addClass('paginationCurrentPaginator');
			},
			execute : function() {
				this.makeFullContent();
				this.goNext();
				this.goPrev();
				this.goToPage();
				this.goToFirstPage();
				this.goToLastPage();
			}
		}
	});

	$.fn.xofoPagination = function(options) {
		var parentFunction = $.fnsXofoPagination;
		var params = parentFunction.params;
		params.parent = $(this);
		params.items = $(this).children();
		if(options.itemsPerPage) {
			params.itemsPerPage = options.itemsPerPage;
		} else {
			params.itemsPerPage = 5;
		}
		if(options.firstLabel) {
			params.firstLabel = options.firstLabel;
		} else {
			params.firstLabel = 'First';
		}
		if(options.lastLabel) {
			params.lastLabel = options.lastLabel;
		} else {
			params.lastLabel = 'Last';
		}
		if(options.prevLabel) {
			params.prevLabel = options.prevLabel;
		} else {
			params.prevLabel = 'Prev';
		}
		if(options.nextLabel) {
			params.nextLabel = options.nextLabel;
		} else {
			params.nextLabel = 'Next';
		}
		return parentFunction.execute();
	}
})(jQuery);
