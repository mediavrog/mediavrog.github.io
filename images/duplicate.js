function removeDuplicates(hasDup){
	
	var nodup = new hasDup.constructor;
	nodup[0] = hasDup[0];
	
	for(i=1;i<hasDup.length;i++){
	
		for(j=0;j<nodup.length;j++)
			if(hasDup[i] == nodup[j])
				break;
		if(j<nodup.length) continue;
		
		nodup = nodup.constructor=="Array"?nodup.push(hasDup[i]):nodup.concat(hasDup[i]);
	}
	return nodup;
}

/* TEST this function
var dArr = new Array("1", "1", "3", "2", "2");
var dString = "@abfbreeiurfj@@@@@@@@@@gewriortw 8t5423p45z4 5452 4572ß tadfljvaDF-laäfa#rg #reatmdd....de";

console.log(removeDuplicates(dString));
console.log(removeDuplicates(dArr));

TEST END */