/*/ --- PESQUISA --- /*/

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
	document.location.href = "https://www.duckduckgo.com/?q=" + encodeURIComponent(box.value);
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
	if (/^commands$/i.test(com)) {
		//document.location.href = "commands.txt";
		window.commandsshown = false;
	}

    // REDDIT
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


    // TWITTER
	else if (com.startsWith("t")==true) {
		// if matches the "t" command
		if (/^t$/i.test(com)) {
			nav("https://www.twitter.com/");
		}
		// if the t [@]user_name command
		else if (/^t- @?[A-Za-z0-9_]{1,15}$/i.test(com)) {
			var targs = com.split(" ");
			nav("https://www.twitter.com/" + targs.pop());
		}
		// search twitter for text
		else if (/^t .{1,140}$/i.test(com)) {
			var query = com.replace(/^t /i, "");
			nav("https://www.twitter.com/search?q=" + encodeURIComponent(query));
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

	// INSTAGRAM
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


    // YOUTUBE
	else if (com.startsWith("yt")==true) {
		// if the youtube command is matched
        if (/^yt .{1,140}$/i.test(com)) {
			var query = com.replace(/^yt /i, "");
			nav("https://www.youtube.com/search?q=" + encodeURIComponent(query));
		}

		// if the plain old reddit command is matched
		else if (/^yt$/i.test(com)) {
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

    // GOOGLE
	else if (com.startsWith("g")==true) {
		// if the youtube command is matched
        if (/^g .{1,140}$/i.test(com)) {
			var query = com.replace(/^g /i, "");
			nav("https://www.google.com/search?q=" + encodeURIComponent(query));
		}

		// if the plain old reddit command is matched
		else if (/^g$/i.test(com)) {
			nav("https://www.google.com/");
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

    //GMAIL
	else if (/^mail$/i.test(com)) {
		nav("http://inbox.google.com");
	}
    //DRIVE
	else if (/^drive$/i.test(com) || /^d$/i.test(com)) {
		nav("http://drive.google.com");
	}
    //DOCS
     else if (/^docs?$/i.test(com) || /^doc$/i.test(com)) {
		nav("https://docs.google.com/");
	}
    //MAPS
    else if (/^maps?$/i.test(com) || /^map$/i.test(com)) {
		nav("https://maps.google.com/");
	}
    //SPEEDTEST
	else if (/^speedtest$/i.test(com) || /^spd$/i.test(com)) {
		nav("http://www.speedtest.net");
	}
    //É PÃES OU PÕES
	else if (/^paes$/i.test(com) || /^poes$/i.test(com)) {
		nav("https://youtu.be/_Qwm3nvN85Q");
	}
    //SPOTIFY
	else if (/^spotify$/i.test(com) || /^s$/i.test(com)) {
		nav("https://play.spotify.com");
	}
    //GITHUB
    else if (/^hub?$/i.test(com)) {
		nav("https://github.com");
	}
    //EPTC
    else if (/^eptc?$/i.test(com)) {
		nav("http://www.eptc.com.br/EPTC_Itinerarios/linha.asp");
	}
    //PROTONMAIL
    else if (/^pm?$/i.test(com) || /^proton$/i.test(com)) {
		nav("https://pm.me/");
	}
    //UFRGS
    else if (/^ufrgs?$/i.test(com) || /^urguis$/i.test(com)) {
		nav("http://www.ufrgs.br/ufrgs/aluno");
	}
    //MOODLE
    else if (/^m?$/i.test(com) || /^moodle$/i.test(com)) {
		nav("https://moodle.ufrgs.br/");
	}
    //DEVIANTART
    else if (/^dev?$/i.test(com) || /^deviant$/i.test(com)) {
		nav("https://www.deviantart.com/");
	}
    //FITGIRL
    else if (/^fit?$/i.test(com) || /^fitgirl$/i.test(com)) {
		nav("http://fitgirl-repacks.site/");
	}
    //LETTERBOXD
    else if (/^letterboxd?$/i.test(com) || /^lb$/i.test(com)) {
		nav("https://letterboxd.com/");
	}
    //ARCHIVE OF OUR OWN
    else if (/^fic?$/i.test(com) || /^a$/i.test(com)) {
		nav("https://archiveofourown.org/");
	}
    //1337.TO
    else if (/^13?$/i.test(com) || /^1337$/i.test(com)) {
		nav("https://1337x.to/");
	}
    //COLORHEXA
    else if (/^color?$/i.test(com) || /^colorhexa$/i.test(com)) {
		nav("https://www.colorhexa.com/");
	}
    //WHATSAPP
    else if (/^zap?$/i.test(com) || /^web$/i.test(com)) {
		nav("https://web.whatsapp.com/");
	}
    //LAST.FM
    else if (/^last?$/i.test(com) || /^l$/i.test(com)) {
		nav("https://www.last.fm/user/Parceira");
	}
    //GLOBOESPORTE
    else if (/^ge?$/i.test(com) || /^globoesporte$/i.test(com)) {
		nav("https://globoesporte.globo.com");
	}
    //HOTMAIL
    else if (/^hotmail?$/i.test(com) || /^out$/i.test(com)) {
		nav("https://outlook.live.com/");
	}
    //UNSPLASH
    else if (/^uns?$/i.test(com) || /^u$/i.test(com)) {
		nav("https://unsplash.com/");
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