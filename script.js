window.onload = setup;

var token = "";
var userToken = "";
var timeOut = .5;
var autoDefocus = false;

var good = [
new Audio("sound/good0.mp3"),
new Audio("sound/good0.mp3"),
new Audio("sound/good1.mp3"),
new Audio("sound/good2.mp3"),
new Audio("sound/good3.mp3"),
new Audio("sound/good4.mp3"),
new Audio("sound/good5.mp3"),
new Audio("sound/good6.mp3"),
new Audio("sound/good7.mp3")
];
var no = [
new Audio("sound/no0.mp3"),
new Audio("sound/no0.mp3"),
new Audio("sound/no1.mp3"),
new Audio("sound/no2.mp3"),
new Audio("sound/no3.mp3"),
new Audio("sound/no4.mp3"),
new Audio("sound/no5.mp3")
];

function setup() 
{
	token += (Math.floor(Math.random() * 8)+1).toString();

	do{
		temp = (Math.floor(Math.random() * 8)+1).toString();
	}while(token.charAt(token.length-1) == temp);
	token += temp;

	for(i=1; i<9; i++)
	{
		document.getElementById('game').innerHTML+='<div id="tile'+i+'" class="tile"></div>'
		if(i==4)
		{
			document.getElementById('game').innerHTML+='<div id="mainTile" class="tile">START</div>'
			document.getElementById('mainTile').setAttribute('onclick', 'start()');
			document.getElementById('mainTile').style.cursor = "pointer";
		}
	}
}

function disable(value = true)//disable? 
{
	if(value) 	
		for(i=1; i<9; i++)
		{
			document.getElementById('tile'+i).setAttribute('onclick', ';');
			document.getElementById('tile'+i).style.cursor = "default";
		}
	else
		for(i=1; i<9; i++)
		{
			document.getElementById('tile'+i).setAttribute('onclick', 'guess('+i+')');
			document.getElementById('tile'+i).style.cursor = "pointer";
		}
}

function show(token, index = 0) 
{
	if(token.length != index)
	{
		document.getElementById('tile'+token.charAt(index)).style.margin = 0;
		document.getElementById('tile'+token.charAt(index)).style.border = "3px dotted yellow";
		document.getElementById('tile'+token.charAt(index)).style.backgroundColor = "DarkOliveGreen";
		setTimeout(function()
		{
			document.getElementById('tile'+token.charAt(index)).style.margin = "3px";
			document.getElementById('tile'+token.charAt(index)).style.border = "";
			document.getElementById('tile'+token.charAt(index)).style.backgroundColor = "SeaGreen"; 
			setTimeout(show, timeOut*1000/2, token, index+1);
		}, timeOut * 1000)
	}
}

function start(last = false) 
{
	disable();
	userToken = "";
	var temp = "";

	do{
		temp = (Math.floor(Math.random() * 8)+1).toString();
	}while(token.charAt(token.length-1) == temp);

	token += temp; 
	if(!last)
	{
		document.getElementById('mainTile').setAttribute('onclick', ';');
		document.getElementById('mainTile').style.cursor = "default";
		document.getElementById('mainTile').innerHTML = token.length;
		window.document.title = token.length + ' score! | Memory game!';
	}

	show(token);
	if(!last)
		setTimeout(disable, token.length * timeOut * 1000, false);
}

function winorlose() 
{
	if(userToken == token)
	{
		setTimeout("start()", timeOut*1000);
		good[Math.floor(Math.random() * 8)].play();
	}
	else
	{
		var text = "gameover".toUpperCase();
		for(i=0; i<text.length; i++)
			document.getElementById('tile'+(i+1)).innerHTML = text.charAt(i);
		disable();
		window.document.title = 'GAME OVER (' + token.length + ') Memory game!';
		document.getElementById('mainTile').innerHTML = 'TRY <br />'+token.length+' <br />AGAIN';
		document.getElementById('mainTile').style = "padding-top: 10px;	height: 140px;";
		document.getElementById('mainTile').style.cursor = "pointer";	
		document.getElementById('mainTile').style.fontSize = "30px";	
		document.getElementById('mainTile').setAttribute('onclick', 'location.reload()');
		token = token.substr(0, token.length-1);

		no[Math.floor(Math.random() * 6)].play();
		setTimeout("start(true)", timeOut*1000);
	}
}

function guess(id) 
{
	if(autoDefocus)
		for(i=1; i<9; i++)
			if(id != i)
			{
				document.getElementById('tile'+i).style.margin = "3px";
				document.getElementById('tile'+i).style.border = "";
				document.getElementById('tile'+i).style.backgroundColor = "SeaGreen"; 
			}

	document.getElementById('tile'+id).style.margin = 0;
	document.getElementById('tile'+id).style.border = "3px dotted yellow";
	document.getElementById('tile'+id).style.backgroundColor = "DarkSlateBlue";

	setTimeout(function()
	{
		document.getElementById('tile'+id).style.margin = "3px";
		document.getElementById('tile'+id).style.border = "";
		document.getElementById('tile'+id).style.backgroundColor = "SeaGreen"; 
	}, timeOut * 1000)

	userToken += id;
	if(userToken.length == token.length || 
		userToken.charAt(userToken.length - 1) != token.charAt(userToken.length - 1))
	{
		disable();
		setTimeout(winorlose, timeOut*1000/3,);
	}
}