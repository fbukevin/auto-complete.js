
        var timezone = ["Amsterdam", "Andorra", "Athens", "Belfast", "Belgrade","Berlin","Bratislava",
        "Brussels","Bucharest","Budapest","Chișinău","Copenhagen","Dublin","Gibraltar","Guernsey","Helsinki",
        "Isle_of_Man","Istanbul","Jersey","Kaliningrad","Kiev","Lisbon","Ljubljana","London","Luxembourg",
        "Madrid","Malta","Mariehamn","Minsk","Monaco","Moscow","Nicosia","Oslo","Paris","Podgorica","Prague",
        "Riga","Rome","Samara","San_Marino","Sarajevo","Simferopol","Skopje","Sofia","Stockholm","Tallinn",
        "Tirane","Tiraspol","Uzhgorod","Vaduz","Vatican","Vienna","Vilnius","Volgograd","Warsaw","Zagreb",
        "Zaporozhye","Zurich","Adelaide","Brisbane","Broken_Hill","Currie","Darwin","Eucla","Hobart",
        "Lindeman","Lord_Howe","Melbourne","Perth","Sydney","Abidjan","Accra","Addis_Ababa","Algiers",
        "Asmara","Bamako","Bangui","Banjul","Bissau","Blantyre","Brazzaville","Bujumbura","Cairo","Casablanca",
        "Ceuta","Conakry","Dakar","Dar_es_Salaam","Djibouti","Douala","El_Aaiún","Freetown","Gaborone","Harare",
        "Johannesburg","Juba","Kampala","Khartoum","Kigali","Kinshasa","Lagos","Libreville","Lomè","Luanda",
        "Lubumbashi","Lusaka","Malabo","Maputo","Maseru","Mbabane","Mogadishu","Monrovia","Nairobi","N'djamena",
        "Niamey","Nouakchott","Ouagadougou","Porto-Novo","São_Tomé","Timbuktu","Tripoli","Tunis","Windhoek",
        "Aden","Almaty","Amman","Anadyr","Aqtau","Aqtobe","Ashgabat","Ashkhabad","Baghdad","Bahrain","Baku",
        "Bangkok","Beirut","Bishkek","Brunei","Choibalsan","Chongqing","Colombo","Damascus","Dhaka","Dili",
        "Dubai","Dushanbe","Gaza","Harbin","Hebron","Ho_Chi_Minh","Hong_Kong","Hovd","Irkutsk","Istanbul",
        "Jakarta","Jayapura","Jerusalem","Kabul","Kamchatka","Karachi","Kashgar","Kathmandu","Kolkata",
        "Krasnoyarsk","Kuala_Lumpur","Kuching","Kuwait","Macau","Magadan","Makassar","Manila","Muscat","Nicosia",
        "Novokuznetsk","Novosibirsk","Omsk","Oral","Phnom_Penh","Pontianak","Pyongyang","Qatar","Qyzylorda",
        "Rangoon","Riyadh","Saigon","Sakhalin","Samarkand","Seoul","Shanghai","Singapore","Taipei","Tashkent",
        "Tbilisi","Tehran","Tel_Aviv","Thimphu","Tokyo","Ulan_Bator","Vientiane","Vladivostok","Yakutsk","Yekaterinburg",
        "Yerevan","Casey","Davis","DumontDUrville","Macquarie","Mawson","McMurdo","Palmer","Rothera"];

    	/* global variable for checkout if any tag in timezone list is inserted */
    	var tz_tags = 0;

        /* find out the items conforming in timezone list */
    	function grep(pattern, callback){
    	  var result = [];
    	  for(var i=0; i < timezone.length; i++){
    	 	var city = timezone[i];
    	 	var cond = callback(city, pattern);
    	 	if(cond) {
    	 	  result.push(city);
    	 	}
    	  }
    	  return result;
    	}
    	
        /* remove tag whe click X sign */
    	function removeTag(text){
    	  var r = document.getElementById(text);
    	  r.parentElement.remove();
    	  if(timezone.indexOf(text) >= 0){
    		tz_tags = tz_tags - 1;
        	if(tz_tags == 0){
        	  var btn = document.getElementById('submit');
        	  btn.disabled = "on";
        	}
    	  }
    	}

    	function addTag(text){
		  var tag = document.getElementById('new_tag');
		  // x link is meant for removal (\xd7 is multiplication sign)
          tag.innerHTML = text + " <a class='removal' onclick='removeTag(\"" + text + "\");'>\xd7</a>";

          // change id:new_tag to id:closed_tag
          tag.className = 'closed_tag';
          tag.id = text;
    	  tag.style.display = "inline";
        	  
    	  // create a tag in id:new_tag for next insertion
    	  var new_tag = document.createElement('span');
    	  new_tag.id = 'new_tag';
    	  new_tag.style="display: hidden;";

          // new <li> enclose new_tag
    	  var li = document.createElement('li');
    	  li.appendChild(new_tag);
    	  
          // insert new_tag in list main_list
          var ul = document.getElementById('main_list');
    	  var inputItem = document.getElementById('inputItem');
    	  ul.insertBefore(li, inputItem);

          // clear input textbox and autocomplete list
    	  keyin.value = "";
		  filter.innerHTML = "";
          filter.style.display = "none";
    	}

    	function query(text) {
		  var keyin = document.getElementById('keyin');
		  var filter = document.getElementById('filter');
		  filter.innerHTML = ""; 	// clear for each keyin

    	  if(event.keyCode == 13){	// when key for onkeypress is 'enter' or 'return'
	        if (text.length != 0) {
	          addTag(text);
    		}
		  } else {    // each keyin except 'enter' or 'return'
		  	var set = [];
		  	if(text.length != 0){
		  	  var pattern = new RegExp("^" + text, "i"); 	// "i" stands for "case-insensitive"
			  set = grep(pattern, function(city, pattern){		  	 
		  	    return pattern.test(city);
		  	  });
		  			
		  	  if(set.length != 0){     // if any matched
    		    for(var i=0; i < set.length; i++){
                  var li = document.createElement('li');
                  li.innerHTML = set[i];
                  li.onclick = function selectIt(){ // handler for selecting item in autocomplete list
                    addTag(this.innerHTML);
                    tz_tags = tz_tags + 1;
                    var submit = document.getElementById('submit');
                    submit.removeAttribute('disabled');
                  };
                  filter.appendChild(li);
                }
    		    filter.style.display = "block";
		  	  } else { // no matching
		  	    filter.style.display = "none";
		  	  }
		    } else {	// delete to no character
		      filter.style.display = "none";
            }
          }
        }
