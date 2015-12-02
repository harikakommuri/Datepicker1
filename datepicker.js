  $(document).ready(function() {
  var date = new Date();
  var crntmonth = date.getMonth();
  var year = date.getFullYear();
  var mnth = crntmonth;
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var noofdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var lable = document.createElement("lable");
  lable.id = "datelable";
  lable.innerHTML = "Click to enter date";
  var textbox = document.createElement("input");
  textbox.type = "text";
  textbox.id = "selectdate";
  var calenderdiv = document.getElementById("calenderdiv");
  calenderdiv.setAttribute("draggable","true");
  calenderdiv.appendChild(lable);
  calenderdiv.appendChild(textbox);
  document.getElementById("selectdate").addEventListener("click",datepicker);
  function datepicker() {
    var calender = document.createElement("table");
    calender.id = "calenderheader";
    calenderdiv.appendChild(calender);
    var caption = document.createElement("caption");
    caption.id = "caption";
    caption.innerHTML = "<p class = 'change' id = 'previous'>" + "&#x3c" + "</p>" + "<span>" + months[mnth] + "</span>" + "<span>" + "," + date.getFullYear() + "</span>" + "<p class = 'change' id = 'next'>" + "&#x3e" + "</th>";
    document.getElementById("calenderheader").appendChild(caption);
    var thead = document.createElement("thead");
    thead.id = "daysheader";
    calender.appendChild(thead);
    for(var i = 0; i < weekdays.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = weekdays[i];
      thead.appendChild(th);
    }
    var tbody = document.createElement("tbody");
    tbody.id = "tbody";
    calender.appendChild(tbody);
    document.getElementById("calenderheader").border.collapse = "collapse";
    document.getElementById("previous").addEventListener("click",previousmonth);
    document.getElementById("next").addEventListener("click",nextmonth);
    document.getElementById("selectdate").disabled = "true";
    displaydates();
  }
  function displaydates() {
    var td,tr,cellNo;
    var year = date.getFullYear();
    var month = date.getMonth();
    var k = 0;
    lp = year % 4 === 0?(year % 100 === 0 ? false : true) : false;
    var noofdays = [31, lp === true?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var tbody = document.getElementById("tbody");
    var firstday = new Date(year,month,1);
    var colindex = firstday.getDay();
    tr = document.createElement("tr");
    for (var i = 0; i < noofdays[date.getMonth()] + firstday.getDay(); i++) {
      if (i < firstday.getDay()) {
        td = document.createElement("td");
        td.innerHTML = "";
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
      else if (colindex % 7 !== 0) {
        ++colindex;
        td = document.createElement("td");
        td.className = "dates";
        k = ++k;
        td.innerHTML = k;
        td.id = td.innerHTML;
        tr.appendChild(td);
        tbody.appendChild(tr);
        document.getElementById(k).setAttribute("data-ColValue",k);
        showdate(k);
      }
        else {
          tr = document.createElement("tr");
          colindex++;
          td = document.createElement("td");
          td.className = "dates";
          k = ++k;
          td.innerHTML = k;
          td.id = td.innerHTML;
          tr.appendChild(td);
          tbody.appendChild(tr);
          document.getElementById(k).setAttribute("data-ColValue",k);
          showdate(k); //to display clicked date in textbox
        }
    }
    var tableid = document.getElementById("calenderheader");
    var rowlength = tableid.rows.length;
    k = 1;
    for (var m = 0; m < rowlength; m++) {
      for (var j = 0; j < weekdays.length; j++) {
        if (date.getDate() === parseInt(tableid.rows[m].cells[j].innerHTML)) {
          tableid.rows[m].cells[j].style.background = "#ffb84d";
        }
      }
    }
  }
  function previousmonth() {
    mnth = (mnth + 12) % 12 - 1;
    if(mnth === -1) {
      year--;
      mnth = 11;
    }
    mnth = (mnth < 0) ? mnth * -1 : mnth;
    document.getElementById("calenderheader").remove();
    date.setFullYear(year,mnth,1);
    datepicker();
    document.getElementById("previous").addEventListener("click",previousmonth);
    document.getElementById("next").addEventListener("click",nextmonth);
  }
  function nextmonth() {
    mnth = (mnth + 12) % 12 + 1;
    if(mnth === 12) {
      ++year;
      mnth = 0;
    }
    document.getElementById("calenderheader").remove();
    date.setFullYear(year,mnth,1);
    datepicker();
    document.getElementById("previous").addEventListener("click",previousmonth);
    document.getElementById("next").addEventListener("click",nextmonth);
  }
  function showdate(colno) {
    document.getElementById(colno).onclick = function() {
      var textbox = document.getElementById("selectdate");
      textbox.value = date.getFullYear() + "," + months[date.getMonth()] + "," + colno;
    };
  }
});
