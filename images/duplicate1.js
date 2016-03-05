function removeDuplicates(hasDup){
	
	var noDup = new hasDup.constructor;
	noDup[0] = hasDup[0];
	
	for(i=1;i<hasDup.length;i++){
	
		for(j=0;j<noDup.length;j++)
			if(hasDup[i] == noDup[j])
				break;
		if(j<noDup.length) continue;
		
		noDup = noDup.constructor=="Array"?noDup.push(hasDup[i]):noDup.concat(hasDup[i]);
	}
	return noDup;
}

/* TEST this function
var dArr = new Array("1", "1", "3", "2", "2");
var dString = "@abfbreeiurfj@@@@@@@@@@gewriortw 8t5423p45z4 5452 4572ß tadfljvaDF-laäfa#rg #reatmdd....de";

console.log(removeDuplicates(dString));
console.log(removeDuplicates(dArr));

TEST END */