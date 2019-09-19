/*****************************************************
 * GITADORA Info Server
 * Developed by Tae Jun Kang a.k.a Prunus Nira
 * (c) Nira 2016
 *
 * 1. This project is protected under GNU AGPL v3.0
 *    Please refer to LICENSE file on root
 * 2. Also, products and libraries used to implement
 *    this server are on USED-LIBRARIES file on root
 *****************************************************/
// CSV 파일에 들어가는 내용
/**
 * 패턴 ID, 클리어 랭크로 이루어진 데이터가 무제한으로 이어짐
 * 첫 째줄 = 유저이름 string, 유저 레벨
 * 그 후 = 패턴아이디, 랭크 번호 (0~6)
 * 0: ss, 1: s_g, 2: s_b, 3: a_on, 4: a_off, 5: breakoff, 6: fail
 **/

// 공통 데이터
var username = "";
var userlv = 0;

var userstat = new Map();

// 랭크 개수
var ranksss = 0;
var rankss = 0;
var ranks = 0;
var ranka = 0;
var rankao = 0;
var rankbcd = 0;
var rankbcdo = 0;
var rankf = 0;
var ranknp = 0;
var all = 0;

// 패턴 개수
var cntov = 0;
var cnthi = 0;
var cntnh = 0;
var cntnr = 0;
var cntne = 0;
var cntlo = 0;
var cntbe = 0;
var cntrn = 0;

// 음악 타입에 따른 표시 설정
var musarcade = true;
var musshort = true;
var musfull = true;
var musremix = true;

var ptidlist = new Array();

$("#loading").hide();
$("#seldiffSingletitle").hide();
$("#seldiffDoubletitle").hide();
$("#seldiffSingle").hide();
$("#seldiffDouble").hide();
$("#userinfo").hide();
$("#targetTable").hide();

function editUser() {
	$("#newuserDialog").empty();
	var ext =
		"<div class='row'>"+
			"<div class='col-12'>"+
				txtPIU.edituserdiv[lang]+
			"</div>"+
			"<div class='col-12'>"+
				"<input class='form-control' type='text' id='newname' placeholder='NAME' onkeyup='nameValidCheck()'/>"+
				"<input class='form-control' type='number' min='1' step='1' id='newlv' onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder='LEVEL'/>"+
				"<a href='#no_div' class='btn btn-primary' onclick='addNewUser()'>"+
				txtPIU.edituserbtn[lang]+
				"</a>"+
			"</div>"+
		"</div>";
	$("#newuserDialog").append(ext);
	$("#newuserDialog").dialog(/*'option', 'titile', txtPIU.editusertitle[lang]*/);
	
	$("#newname").val(username);
	$("#newlv").val(userlv);
}

function handleFileSelect(file) {
	var fr = new FileReader();
	fr.onload = function(e) {
		var result = e.target.result;
		callbackOpen(result);
	};
	fr.readAsText(file);
}

function callbackOpen(result) {
	var str = result.split("\n");
	
	var userinfo = str[0].split(",");
	username = userinfo[0];
	userlv = userinfo[1];
	
	for(var i = 1; i < str.length; i++) {
		var cur = str[i].split(",");
		if(cur[0] != "")
			userstat.set(cur[0], cur[1]);
	}
	
	updateUserNameLv();
	showLevels();
}

function saveUser() {
	var text = "";
	text += username+","+userlv+"\n";
	
	var keys = userstat.keys();
	for(var i = 0; i < userstat.size; i++) {
		var ckey = keys.next();
		if(ckey.value != "")
			text += ckey.value + ","+userstat.get(ckey.value) + "\n";
	}
	
	// 데이터를 새 파일(임시)에 쓰고 다운로드
	var elem = document.createElement("a");
	elem.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(text));
	elem.setAttribute("download", "piudata_"+username+"_"+new Date().getTime()+".csv");
	elem.style.display = 'none';
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}

function updateMap(ptnid, rank) {
	// 새로운 기록을 추가
	userstat.set(ptnid, rank);
}

function updatePatternMultiple() {
	// 기록 갱신용 Dialog 만듦
	$("#updateDialog").empty();
	var html =
		"<div class='row'>"+
			"<div class='col-12'>"+
				txtPIU.updatealldiv[lang]+
				"<div class='form-group'>"+
					"<label for='grade'>Select rank:</label>"+
					"<select class='form-control' id='grade'>"+
					    "<option value='0'>SSS</option>"+
					    "<option value='1'>SS</option>"+
					    "<option value='2'>S</option>"+
					    "<option value='3'>A (Break On)</option>"+
					    "<option value='4'>A (Break Off)</option>"+
					    "<option value='8'>BCD (Break On)</option>"+
					    "<option value='5'>BCD (Break Off)</option>"+
					    "<option value='6'>F or GameOver</option>"+
					    "<option value='7'>No Play</option>"+
					"</select>"+
				"</div>"+
			"</div>"+
			"<div class='col-12'>"+  
				"<a href='#no_div' class='btn btn-primary' onclick='updateMultipleData()'>"+
				txtPIU.update[lang]+
				"</a>"+
				"<a href='#no_div' class='btn btn-primary' onclick='closeUP()'>"+
				txtPIU.cancel[lang]+
				"</a>"+
			"</div>"+
		"</div>";
	$("#updateDialog").append(html);
	$("#updateDialog").dialog(/*'option', 'title', txtPIU.updatedivtitle[lang]*/);
}

function updateData(ptid) {
	var rank = $("#grade").val();
	userstat.set(ptid.toString(), $("#grade").val());
	updateRecord(ptid);
	closeUP();
	rankreset();
	updateRankData();
	updateRanks();
}

function updateMultipleData() {
	var rank = $("#grade").val();
	$("input[id=ptnsel]:checked").each(function() {
		var ptid = $(this).val();
		userstat.set(ptid.toString(), $("#grade").val());
		updateRecord(ptid);
		$(this).attr("checked", false);
	});
	closeUP();
	rankreset();
	updateRankData();
	updateRanks();
}

function closeUP() {
	$("#updateDialog").dialog("close");
}

function hideCheckbox() {
	if($("[id='ptnsel']").is(":visible")) $("[id='ptnsel']").hide();
	else $("[id='ptnsel']").show();
}

function hideRank() {
	if($(".rank").is(":visible")) $(".rank").hide();
	else $(".rank").show();
}

function updateRanks() {
	$("#ranks").html(
		"SSS: "+ranksss+" | "+
		"SS: "+rankss+" | "+
		"S: "+ranks+" | "+
		"A: "+ranka+" | "+
		"BCD: "+rankbcd+"<br/>"+
		"A: "+rankao+" (Break Off) | "+
		"BCD: "+rankbcdo+" (Break Off) | "+
		"F: "+rankf+" | "+
		"No Play: "+(all-ranksss-rankss-ranks-ranka-rankao-rankbcd-rankbcdo-rankf)
	);
}

function handleMusicType(box, type) {
	switch(type) {
	case 0:
		var arcade = $.find("[data-songtype='0']");
		if(box.checked) {
			$.each(arcade, function(i, elem) {
				$(elem.parentElement).show();
			});
		}
		else {
			$.each(arcade, function(i, elem) {
				$(elem.parentElement).hide();
			});
		}
		break;
	case 1:
		var short = $.find("[data-songtype='1']");
		if(box.checked) {
			$.each(short, function(i, elem) {
				$(elem.parentElement).show();
			});
		}
		else {
			$.each(short, function(i, elem) {
				$(elem.parentElement).hide();
			});
		}
		break;
	case 2:
		var full = $.find("[data-songtype='2']");
		if(box.checked) {
			$.each(full, function(i, elem) {
				$(elem.parentElement).show();
			});
		}
		else {
			$.each(full, function(i, elem) {
				$(elem.parentElement).hide();
			});
		}
		break;
	case 3:
		var remix = $.find("[data-songtype='3']");
		if(box.checked) {
			$.each(remix, function(i, elem) {
				$(elem.parentElement).show();
			});
		}
		else {
			$.each(remix, function(i, elem) {
				$(elem.parentElement).hide();
			});
		}
		break;
	}
}