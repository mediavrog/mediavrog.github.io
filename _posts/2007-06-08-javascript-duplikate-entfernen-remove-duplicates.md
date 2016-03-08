---
layout: post
title: 'Javascript: Duplikate entfernen / remove duplicates'
published: true
comments: true
date: 2007-06-08 03:06:39
tags:
    - duplikate
categories:
    - javascript
permalink: /blog/2007/06/08/javascript/javascript-duplikate-entfernen-remove-duplicates
image:
    thumb: javascript.jpg
---
> Dieses Script entfernt Duplikate sowohl aus Strings, als auch aus Arrays.

Sie ist einfach und schnell.
  
Getestet unter IE6/7, Firefox 2, Opera 9.02, Netscape 7

```javascript
function removeDuplicates(hasDup){
	
	var noDup = new hasDup.constructor;
	
	if(noDup.push) {
		noDup[0] = hasDup[0];
	
		for(i=1;i&lt;hasDup.length;i++){
			for(j=0;j&lt;noDup.length;j++)
				if(hasDup[i] == noDup[j])
					break;
			if(j&lt;noDup.length) continue;
			
			noDup.push(hasDup[i]);
		}
	} else {
		noDup = hasDup.charAt(0);
			
		for(i=1;i&lt;hasDup.length;i++){
			for(j=0;j&lt;noDup.length;j++)
				if(hasDup.charAt(i) == noDup.charAt(j))
					break;
			if(j&lt;noDup.length) continue;
	
			noDup = noDup.concat(hasDup.charAt(i));
		}
	}
	
	return noDup;
}
```

### Download

<a href="/uploads/duplicate2.js" class="btn btn-success">Download removeDuplicates.js</a>