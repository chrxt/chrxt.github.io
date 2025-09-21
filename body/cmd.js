var box = document.getElementById("input");

// this should catch most URLs, or at least the ones I would type.
var urlPattern = /^((https?|file):\/\/\/?)?\S+(:\d+|\.\S+(\.\S+)*)(\/\S+)?$/i;

// add on here with more handy things
var handy = /^(google|gmail|dropbox)$/i;

var instaregex = /^i(nsta(gram)?|g)/i;

// search for text in text box
function search() {
	console.log("Googling \"" + box.value + "\"");
	console.log("Encoded query: \n" + encodeURIComponent(box.value));
	document.location.href = "https://www.google.com/search?q=" + encodeURIComponent(box.value);
}

// if not search, nav to somewhere
function nav(address) {
	// if the address starts with "https?|ftp ://"
	if (/^(?:(?:https?|ftp):\/\/).*/i.test(address)) {
		document.location.href = address;
	} else {
		document.location.href = "http://" + address;
	}
}

// Handle enter key press in text box
// also handle the command parsing in the event that the text in the box is a command
function searchKeyPress(e) {
	if (window.commandsshown) return false;

	e = e || window.event;
	if (e.keyCode == 13) {
		parseCom(box.value);
	}
}

// parse the user's command
function parseCom(com) {
	// handle help command
	if (/^$/i.test(com)) {
		//document.location.href = "commands.txt";
		nav("https://www.google.com/");
	}
   
    // GENIUS = ly
	else if (com.startsWith("ly")==true) {
		// if the genius command is matched
        if (/^ly .{1,140}$/i.test(com)) {
			var query = com.replace(/^ly /i, "");
			nav("https://genius.com/search?q=" + encodeURIComponent(query));
		}

		// if the plain old genius command is matched
		else if (/^ly$/i.test(com)) {
			nav("https://genius.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
    
    // REDDIT = r
	else if (com.startsWith("r")==true) {
		// if the subreddit command is matched
		if (/^r [A-Za-z0-9][A-Za-z0-9_]{2,20}$/i.test(com)) {
			var sargs = com.split(" ");
			nav("https://www.reddit.com/r/" + sargs.pop());
		}
		// if the plain old reddit command is matched
		else if (/^r$/i.test(com)) {
			nav("https://www.reddit.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}


    // TWITTER = t
	else if (com.startsWith("t")==true) {
		// if matches the "t" command
		if (/^t$/i.test(com)) {
			nav("https://twitter.com/");
		}
		// if the t [@]user_name command
		else if (/^t @?[A-Za-z0-9_]{1,15}$/i.test(com)) {
			var targs = com.split(" ");
			nav("https://twitter.com/" + targs.pop());
		}
		// search twitter for text
		else if (/^t .{1,140}$/i.test(com)) {
			var query = com.replace(/^t /i, "");
			nav("https://twitter.com/search?q=" + encodeURIComponent(query));
		}

 // if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}


	// INSTAGRAM = ig
	else if (instaregex.test(com)) {
		// just plain old ig
		if (/^i(nsta(gram)?|g)$/i.test(com)) {
			nav("https://www.instagram.com/");
		}
		// ig [@]username command
		else if (/^i(nsta(gram)?|g) @?[A-Za-z0-9_.]{1,30}/i.test(com)) {
			var iargs = com.split(" ");
			nav("https://www.instagram.com/" + iargs.pop());
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}


    // YOUTUBE = y
	else if (com.startsWith("y")==true) {
		// if the youtube command is matched
        if (/^y .{1,140}$/i.test(com)) {
			var query = com.replace(/^y /i, "");
			nav("https://www.youtube.com/search?q=" + encodeURIComponent(query));
		}

		// if the plain old reddit command is matched
		else if (/^y$/i.test(com)) {
			nav("https://www.youtube.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}

// misc commands

    //GMAIL = gm or mail
	else if (/^gm$/i.test(com) || /^mail$/i.test(com)) {
		nav("https://mail.google.com/");
	}
    
    else if (/^gm1$/i.test(com) || /^mail1$/i.test(com)) {
		nav("https://mail.google.com/mail/u/1/");
	}

    //DRIVE = drive or d
	else if (/^drive$/i.test(com) || /^d$/i.test(com)) {
		nav("http://drive.google.com");
	}
    
    else if (/^drive1$/i.test(com) || /^d1$/i.test(com)) {
		nav("http://drive.google.com/u/1/");
	}
    //DOCS = docs or doc
     else if (/^docs?$/i.test(com) || /^doc$/i.test(com)) {
		nav("https://docs.google.com/");
	}
    
    else if (/^docs1?$/i.test(com) || /^doc1$/i.test(com)) {
		nav("https://docs.google.com/u/1/");
	}
	//UFRGS
    else if (/^u?$/i.test(com) || /^urguis$/i.test(com)) {
		nav("http://www.ufrgs.br/ufrgs/aluno");
	}
    //MAPS = maps or map
    else if (/^maps?$/i.test(com) || /^map$/i.test(com)) {
		nav("https://maps.google.com/");
	}
    //GITHUB
    else if (/^git?$/i.test(com)) {
		nav("https://github.com/chrxt?tab=repositories");
	}
    //PROTONMAIL
    else if (/^pm?$/i.test(com) || /^proton$/i.test(com)) {
		nav("https://pm.me/");
	}
    //FITGIRL
    else if (/^fit?$/i.test(com) || /^fitgirl$/i.test(com)) {
		nav("http://fitgirl-repacks.site/");
	}
    //LETTERBOXD
    else if (/^letter?$/i.test(com) || /^le$/i.test(com)) {
		nav("https://letterboxd.com/");
	}
    //ARCHIVE OF OUR OWN
    else if (/^fic?$/i.test(com) || /^a$/i.test(com)) {
		nav("https://archiveofourown.org/");
	}
    //COLORHEXA
    else if (/^color?$/i.test(com) || /^colorhexa$/i.test(com)) {
		nav("https://www.colorhexa.com/");
	}
    //WHATSAPP
    else if (/^w?$/i.test(com) || /^web$/i.test(com)) {
		nav("https://web.whatsapp.com/");
	}
    //LAST.FM
    else if (/^last?$/i.test(com) || /^l$/i.test(com)) {
		nav("https://www.last.fm/user/Parceira");
	}
    //Z-LIB
    else if (/^z?$/i.test(com)) {
		nav("https://z-lib.fm/");
	}
	//ALIEXPRESS
	else if (/^al$/i.test(com) || /^ali$/i.test(com)) {
		nav("https://best.aliexpress.com/?lan=en");
	}
	//SHOPEE
	else if (/^sh$/i.test(com) || /^shopee$/i.test(com)) {
		nav("https://shopee.com.br/a");
	}
	//AMAZON
	else if (/^am$/i.test(com) || /^amazon$/i.test(com)) {
		nav("https://www.amazon.com.br/");
	}
	//É PÃES OU PÕES
	else if (/^paes$/i.test(com) || /^poes$/i.test(com)) {
		nav("https://youtu.be/_Qwm3nvN85Q");
	}

    
// if it doesn't match any of the commands...
	// ... but is a valid URL
	else if (urlPattern.test(com)) {
		nav(com);
	}
	// ... or should be searched
	else {
		search();
	}
}
