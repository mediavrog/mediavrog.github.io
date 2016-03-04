---
published: true
title: Read-only for bootstrap datepicker calendar popup
layout: post
tags: [javascript, bootstrap]
categories: [javascript]
---
So if you ever came across the need to just show selected dates/date ranges in the bootstrap datepicker, use the following code to prevent date selection by the user.

The following code uses a date range to show some period in the calendar.

{% highlight javascript %}
var el = $('.input-daterange');
el.datepicker(myOptions);
if el.data('readonly') // use a data attribute
  el.children('input').datepicker().on('show',function(e){
    $('.datepicker').addClass('readonly')
    $('.datepicker .datepicker-days tbody').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
     });
  });
{% endhighlight %}