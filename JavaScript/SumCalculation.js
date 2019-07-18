'use strict'
/* Class with pairs and singles conbination with its result in it */
class Conbination
{
	constructor()
	{
		this.aPair1 = new Array();					/* array with the first pair member */
		this.aPair2 = new Array();					/* array with the second pair member */
		this.aPairs = [this.aPair1, this.aPair2];	/* Matrix with all the pairs */
		this.aSingle = new Array();					/* array with all the singles */
		
		this.iSum = 0;								/* Sum of all the pair multiplications and singles */
	}
	
	
}

/* Conbiantion information used while looking for new pairs conbinations */
class ConbinationInfo
{
	constructor()
	{
		this.iNextIndex = 0;							/* Variable for storing the found pair */
		this.iSavedPairCount = 0;						/* Counter to know which is the actual pair number to be found */
		this.aUsedPos = new Array();					/* declare an array (it will be of boolenad) to have th einfo of which numbers are used */	
		this.cActualConbination = new Conbination();	/* Conbination in search */
		this.bFindPairs = true;							/* Flag to indicate that there are still pairs to be found in the actual conbination */
	}
}

/* Global array to store the numbers introduced by the user */
var gaNumbers = new Array();

/**
 * GelAllPossibleCombinations function.
 *
 * @description Obtaines all the possible pair convinations of the globar numbers Array.
 *				returns an array with a pair in each porsition. Each pair is an array of
 *				two elements with the position of the number in the global numbers array. 
 * @param None
 * @return Array[int]
 *
 */
function GelAllPossibleCombinations()
{
	var aPairs = new Array(); 	/* Array to be retruned with all the possible pairs */
	var iIndexPos = 0; 			/* Index oh the array */
	
	/* Go over all the gloval array */
	for (var i = 0; i < gaNumbers.length; i++) 
	{
		/* With one of the positions of the array, go over the array again to convine it with the rest */
        for (var j = 0; j < gaNumbers.length; j++) 
		{
			/* Check if both are not the same poistion, not to pair it with itself */
			if(i != j)
			{
				/* Check if this two position have already been saved */
				var bAllreadyStored = false; /* Flag to set when the pair is already stored */
				for(var index in aPairs)
				{
					/* Check if the pair is the same */
					if(aPairs[index][0] == j && aPairs[index][1] == i)
					{
						/* Same pair, set the flag */
						bAllreadyStored = true;
					}
					else
					{
						/* Not the same pair */
					}
				}
				
				/* If it was not already stored save in the retrun array */
				if(bAllreadyStored == false)
				{
					/* Not stored */
					aPairs[iIndexPos++] = [i, j];
				}
				else
				{
					/* Already stored */
				}
				
			}
			else
			{
				/* Same position */
			}
        }
    }
	
	return aPairs;
}

/**
 * GetNextPair function.
 *
 * @description  Obtaines from all the possible pairs, the next pair that can be added to the
 *				 Actual convination
 * @param iIndex[int]: Index to start checking the possible pairs array
 * @param aPosComb[int Array]: Array with all the possible postion conbinations
 * @param aUsedPositions[bool Array]: Array with the inforamation of the already used positions
 * @param iPairAmount[int]: The total pairs that we are looking for
 * @param iSavedPairCount[int]: Already obtained pairs ammount
 * @return iIndex[int]: Index of the possible pairs array where the next pair is. 
 *		   if it is -1, there is no further pair to add.
 *
 */
function GetNextPair(iIndex, aPosComb, aUsedPositions, iPairAmount, iSavedPairCount)
{
	var bNextValueFound = false; /* Flag to indicate that a pair has been found */
	
	/* Go over the remaining array until the pair is found */
	while((iIndex + (iPairAmount - iSavedPairCount)) < aPosComb.length && bNextValueFound == false)
	{
		/* Check if the positions has been already used */
		if(false == aUsedPositions[aPosComb[iIndex][0]] && false == aUsedPositions[aPosComb[iIndex][1]])
		{
			/* Not used, next pair found */
			bNextValueFound = true;
		}
		else
		{
			/* Used, check the next position */
			iIndex++;
		}
	}
	
	/* Check if the pair has been found */
	if(false == bNextValueFound)
	{
		/* Not found, return -1 */
		iIndex = -1;
	}
	else
	{
		/* Pair found, index of the pair already set */
	}
	
	return iIndex;
}

/**
 * FillSingleNumbers function.
 *
 * @description  Gets the singles Array for the actual combination with the not used positions
 * @param aUsedPostions[bool Array]: Array with the inforamation of the already used positions
 * @return aSinglesArray[int Array]: Array with all the single numbers
 *
 */
function FillSingleNumbers(aUsedPostions)
{
	var aSinglesArray = new Array();
	
	for(var iNumIndex in gaNumbers)
	{
		if(false == aUsedPostions[iNumIndex])
		{
			aSinglesArray.push(gaNumbers[iNumIndex]);
		}
	}
	
	return aSinglesArray;
}

/**
 * CalculateSum function.
 *
 * @description  Calculates the Sum of the given conbination. first multiplies the pairs and sums
 *				 all the results. After, sums all the single to the reuslt of the previous opertion.
 * @param cConbination[Conbination]: Array with the inforamation of the already used positions
 * @return cConbination[Conbination]: Array with all the single numbers
 *
 */
function CalculateSum(cConbination)
{
	var iSum = 0;
	var aPairs = cConbination.aPair1;
	var aSingles = cConbination.aSingle;

	/* First Calclculate de pairs */
	for(var iPairsIndex = 0; iPairsIndex < aPairs.length; iPairsIndex++)
	{
		iSum += cConbination.aPair1[iPairsIndex] * cConbination.aPair2[iPairsIndex];
	}
	
	/* Now add the sum of all the singles */
	for(var iSingelsIndex = 0; iSingelsIndex < aSingles.length; iSingelsIndex++)
	{
		iSum += aSingles[iSingelsIndex];
	}
	
	/* Store the result in the conbination */
	cConbination.iSum = iSum;
	
	return cConbination;
}

/**
 * RestarSearch function.
 *
 * @description  Restart the pairs search to the pair index that has to be found. For this
 *				 checks all the pairs, from the last found pair to the first, if they have more possibilities
 *				 in the array which contains all the possibilities.If there are no more possibilities 
 *				 return -1.
 * @param aPairPositions[int Array]: Array containing the obtained pair postions
 * @param aAllPossiblePosComb[int array]: Array with all the pair possibilities
 * @param iSavedPairCount[int]: Counter with the number of the actually found pairs
 * @return iReturnPairPositionIndex[int]: Returns the next pair to be found
 *
 */
function RestarSearch(aPairPositions, aAllPossiblePosComb, iSavedPairCount)
{
	var iReturnPairPositionIndex = -1; 
	var iIterationCount = 0;
	/* Go over all pairs, from the last found to the first (from the bigges position to the lowest) */
	for(var iPosIndex = iSavedPairCount; iPosIndex >= 0; iPosIndex--)
	{
		/* Check if there is room for more pairs in the all possibilities array, if the next pair index has not been found */
		if((aPairPositions[iPosIndex] < ((aAllPossiblePosComb.length - 1) + iIterationCount)) && (iReturnPairPositionIndex == -1))
		{
			/* There is room, return the actual index to continue checking from this index on  */
			iReturnPairPositionIndex = iPosIndex;
		}
		else
		{
			/* No room */
		}
		/* Increment the iteration, to be able to check how many room in the array is needed for the pairs */
		iIterationCount++;
	}
	/* Return the index for the next pair to be found */
	return iReturnPairPositionIndex;
}

/**
 * CheckPossibilities function.
 *
 * @description  
 * @param 
 * @return 
 *
 */
function CheckPossibilities(aPositions, aAllPossiblePosComb, iSavedPairCount, aUsedPos)
{
	var cRetConbinfo = new ConbinationInfo();
	cRetConbinfo.aUsedPos = new Array(aUsedPos.length);
	cRetConbinfo.cActualConbination = new Conbination();
	
	
	/* Try to reset the search from the biggest pair position thet still can have more possibilities */
	var iPairIndex = RestarSearch(aPositions, aAllPossiblePosComb, iSavedPairCount);
	/* Check if more possibilities were found */
	if(-1 == iPairIndex)
	{
		/* No more possibilities, stop finding */
		cRetConbinfo.bFindPairs = false;
	}
	else
	{
		/* There are still more possibilities */
		cRetConbinfo.iNextIndex = aPositions[iPairIndex] + 1; 	/* Increment the pair position with possibilities to start the search from the next pair */
		cRetConbinfo.iSavedPairCount = iPairIndex;				/* Set the found pairs to the found pair index */
		cRetConbinfo.aUsedPos.fill(false);						/* Reset the used position to false */
		
		/* Reset the conbination to keep the information of the previous pairs */
		for(var iPairsIndex = 0; iPairsIndex < iSavedPairCount; iPairsIndex++)
		{
			cRetConbinfo = FillInformation(iPairsIndex, cRetConbinfo, aAllPossiblePosComb[aPositions[iPairsIndex]][0], aAllPossiblePosComb[aPositions[iPairsIndex]][1]);
		}
	}
	
	return cRetConbinfo;
}

/**
 * FillInformation function.
 *
 * @description  Funtion to fill several conbination information
 * @param iPairCount[integer]: Pairs obtained until the moment
 * @param cConbinfo[ConbinationInfo]: Actual conbination information
 * @param iPairPos1[integer]: Position of the first number in the numbers array
 * @param iPairPos2[integer]: Position of the second number in the numbers array
 * @return cReturnConbination[Conbination]: Returns the conbination with the biggest Sum
 *
 */
function FillInformation(iPairCount, cConbinfo, iPairPos1, iPairPos2)
{
	cConbinfo.cActualConbination.aPair1[iPairCount] = gaNumbers[iPairPos1];
	cConbinfo.cActualConbination.aPair2[iPairCount] = gaNumbers[iPairPos2];
	cConbinfo.aUsedPos[iPairPos1] = true;
	cConbinfo.aUsedPos[iPairPos2] = true;
	
	return cConbinfo;
}

/**
 * CalculateMaxSum function.
 *
 * @description  Restart the pairs search to the pair index that has to be found. For this
 *				 checks all the pairs, from the last to the first, if they have more possibilities
 *				 in the array which contains all the possibilities.
 * @param None
 * @return cReturnConbination[Conbination]: Returns the conbination with the biggest Sum
 *
 */
function CalculateMaxSum()
{
	var cReturnConbination = new Conbination();						/* Conbination with the max sum to return */
	var cConbinfo = new ConbinationInfo();							/* Declare de needed information while finding a conbination */
	
	var iNumberAmount = gaNumbers.length; 							/* Get the introduced ammount of numbers */
	var iPossiblePairsAmount = Math.floor(iNumberAmount / 2);		/* The max possible pairs ammount of the given numbers */
	
	var aAllPossiblePosComb = GelAllPossibleCombinations();			/* Obtain all possible number convination, storing their position in global array */
	
	cConbinfo.aUsedPos = new Array(iNumberAmount);
	cConbinfo.cActualConbination = new Conbination();
	
	/* Start obatining all possible combinatio, starting whith no pirs and finishing with the maximum amount of pairs */
	for(var iPairAmountIndex = 0; iPairAmountIndex <= iPossiblePairsAmount; iPairAmountIndex++)
	{
		cConbinfo.aUsedPos.fill(false); /* Initialize the used number array with all false */
		
		/* Check if there are pairs to be found */
		if(0 != iPairAmountIndex)
		{						
			var aPositions = new Array(iPairAmountIndex);	/* Array to store the position of each found pair from the all possible pairs array */	
			
			cConbinfo.bFindPairs = true;   
			cConbinfo.iNextIndex = 0;						/* Reset the found pair index */
			cConbinfo.iSavedPairCount = 0;					/* Reset the actual piar index */
			
			/* loop to be executed while there are more pairs to be found */
			while(cConbinfo.bFindPairs == true)
			{ 
				/* find the next pair to be added in the conbination */
				cConbinfo.iNextIndex = GetNextPair(cConbinfo.iNextIndex, aAllPossiblePosComb, cConbinfo.aUsedPos, (iPairAmountIndex - 1), cConbinfo.iSavedPairCount);
				/* Check if a pair was found */
				if(cConbinfo.iNextIndex != -1)
				{
					aPositions[cConbinfo.iSavedPairCount] = cConbinfo.iNextIndex; 			/* Save the founde pair index in the pair array */
					
					/* Save the convination and set the numbers as used */
					cConbinfo = FillInformation(cConbinfo.iSavedPairCount, cConbinfo, aAllPossiblePosComb[cConbinfo.iNextIndex][0], aAllPossiblePosComb[cConbinfo.iNextIndex][1]);
					cConbinfo.iSavedPairCount++;
					
					/* Check if all the pairs have been found */
					if(cConbinfo.iSavedPairCount >= iPairAmountIndex)
					{
						/* All pairs obtained, fill the singles array with the rest of the numbers */
						cConbinfo.cActualConbination.aSingle = FillSingleNumbers(cConbinfo.aUsedPos);
						/* Calculate the sum with all the info */
						cConbinfo.cActualConbination= CalculateSum(cConbinfo.cActualConbination);
						/* Check if the actual sum is higher than the rpevious one */
						if(cConbinfo.cActualConbination.iSum > cReturnConbination.iSum)
						{
							/* It is highr, set the actual sa the previous one */
							cReturnConbination = cConbinfo.cActualConbination;
						}
						else
						{
							/* Not higher, keep the previous */
						}
						/* Check if there are more possibilities with the actual pairs number */
						cConbinfo = CheckPossibilities(aPositions, aAllPossiblePosComb, cConbinfo.iSavedPairCount, cConbinfo.aUsedPos);
					}
					else
					{
						/* Still more pairs to be found */
					}
				}
				else
				{
					/* No pair found */
					cConbinfo.iSavedPairCount--; 	/* Decrement the saved pair count as the last pair was not found */
					/* Check if there are more possibilities with the actual pairs number */
					cConbinfo = CheckPossibilities(aPositions, aAllPossiblePosComb, cConbinfo.iSavedPairCount, cConbinfo.aUsedPos);
				}
			}
		}
		else
		{
			/* No pairs needed, fill the singles and calculate the sum */
			cReturnConbination.aSingle = FillSingleNumbers(cConbinfo.aUsedPos);
			cReturnConbination = CalculateSum(cReturnConbination);
		}
	}
	
	return cReturnConbination;
}

/**
 * @description  Load event to make sure that the html is loaded before using its elements
 *
 */
window.addEventListener('load',function()
{
	/* Get the number box html element and hide it */
	var number_list_box = document.querySelector(".number_list_box");
	number_list_box.style.display = "none";
	/* Get the result box html element and hide it */
	var result_box = document.querySelector(".result_box");
	result_box.style.display = "none";
	/* Select all the buttons, to be able to add logic to them */
	var buttonAddnumber = document.querySelector("#addNumber");
	var buttonCalculate = document.querySelector("#calculate");
	var buttonReset = document.querySelector("#reset");
	
	/**
	 * RemoveListHTML function.
	 *
	 * @description  Function to empty an HTML list
	 * @param ElementID[String]
	 * @return None
	 *
	 */
	function RemoveListHTML(ElementID)
	{
		/* Get the HTML list */
		var listElemt = document.getElementById(ElementID);
		/* Loop to remove each Child element */
		while (listElemt.hasChildNodes()) 
		{
			listElemt.removeChild(listElemt.firstChild);
		}
	}
	
	
	/* Event click of the Add Number button */
	buttonAddnumber.addEventListener('click', function()
	{	
		/* Get the number from the number input text box */
		var iNumber = parseInt(document.querySelector("#number").value.trim());
		/* Check if the obtained value is a correct number */
		if((null == iNumber) || (0 <= iNumber.length) || isNaN(iNumber) || (0 != (iNumber % 1)))
		{
			/* Not a valid value, show a message to the user */
			alert("Please introduce a correct entire number.");
		}
		else
		{
			number_list_box.style.display = "block";
			/* Valid value, add it to the global array */
			gaNumbers.push(iNumber);
			/* Add to the also to the HTML list */
			var listNumber = document.createElement("LI");
			var textNumberNode = document.createTextNode(iNumber);
			listNumber.appendChild(textNumberNode);    
			document.getElementById("number_list").appendChild(listNumber); 			
		}	
		/* Empty the number input text box */
		document.getElementById("number").value = "";
	});
	
	/* Event click of the Calculate button */
	buttonCalculate.addEventListener('click', function()
	{
		/* empty the pairs list and the singles list in case they are shown */
		RemoveListHTML("pairs_list");
		RemoveListHTML("single_list");
		/* Obtain the highest sum convination */
		var cConvinations = CalculateMaxSum();
		/* Show the result box */
		result_box.style.display = "block";

		/* Fil the pairs list */
		for(var iPairsIndex in cConvinations.aPair1)
		{
			var listPairs = document.createElement("LI");
			var pair = "[" + cConvinations.aPairs[0][iPairsIndex] + "," +  cConvinations.aPairs[1][iPairsIndex] + "]";
			var textPairNode = document.createTextNode(pair);
			listPairs.appendChild(textPairNode);       
			document.getElementById("pairs_list").appendChild(listPairs); 	
		}
		/* Fill the singles list */
		for(var iSingleIndex in cConvinations.aSingle)
		{
			var listSingles = document.createElement("LI");
			var single = cConvinations.aSingle[iSingleIndex];
			var textSingleNode = document.createTextNode(single);
			listSingles.appendChild(textSingleNode);       
			document.getElementById("single_list").appendChild(listSingles); 	
		}
		/* show the sum */
		document.querySelector("#sum").innerHTML = cConvinations.iSum;
	});
	
	/* Event click of the Reset button */
	buttonReset.addEventListener('click', function()
	{
		/* Reset the numbers global array */
		gaNumbers = new Array();
		/* Clear all HTML lists */
		RemoveListHTML("number_list");
		RemoveListHTML("pairs_list");
		RemoveListHTML("single_list");
		/* Hide the number box and the result box */
		number_list_box.style.display = "none";
		result_box.style.display = "none";
	});
});